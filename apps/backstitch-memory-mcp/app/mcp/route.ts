import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const jsonValue = z.any();

function cfg() {
  return {
    cogneeBase: process.env.COGNEE_BASE_URL?.replace(/\/$/, ""),
    cogneeKey: process.env.COGNEE_API_KEY,
    typesafeKey: process.env.TYPESAFE_API_KEY,
    typesafeBase: (process.env.TYPESAFE_BASE_URL || "https://api.typesafe.ai").replace(/\/$/, ""),
    pageIndexKey: process.env.PAGEINDEX_API_KEY,
    serenaUrl: process.env.SERENA_MCP_URL,
  };
}

async function cognee(path: string, init: RequestInit = {}) {
  const { cogneeBase, cogneeKey } = cfg();
  if (!cogneeBase || !cogneeKey) throw new Error("Cognee is not configured on this connector.");
  const res = await fetch(cogneeBase + path, {
    ...init,
    headers: {
      "X-Api-Key": cogneeKey,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Cognee ${res.status}: ${text.slice(0, 500)}`);
  try { return JSON.parse(text); } catch { return text; }
}

async function typesafe(body: unknown) {
  const { typesafeKey, typesafeBase } = cfg();
  if (!typesafeKey) throw new Error("Jev is not connected. Add TYPESAFE_API_KEY to enable the Jev judgment layer.");
  const res = await fetch(typesafeBase + "/v1/systemone", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${typesafeKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`TypeSafe ${res.status}: ${text.slice(0, 500)}`);
  return JSON.parse(text);
}

const handler = createMcpHandler((server) => {
  server.registerTool(
    "backstitch_status",
    {
      title: "Backstitch adapter status",
      description: "Read-only status for the Backstitch memory stack. Shows which optional adapters are configured without exposing credentials.",
      inputSchema: z.object({}),
    },
    async () => {
      const c = cfg();
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            backstitch: true,
            cognee: Boolean(c.cogneeBase && c.cogneeKey),
            jev: Boolean(c.typesafeKey),
            pageindex: Boolean(c.pageIndexKey),
            serena: Boolean(c.serenaUrl),
            authority: "Git/project runtime and canonical ledgers remain authoritative; memory is recall, not truth."
          })
        }]
      };
    }
  );

  server.registerTool(
    "cognee_recall",
    {
      title: "Recall Cognee memory",
      description: "Recall persistent project memory from Cognee. Use only for Backstitch S2/S3 or explicit memory requests, not simple S0 questions.",
      inputSchema: z.object({
        query: z.string().min(1),
        session_id: z.string().optional(),
        search_type: z.enum(["HYBRID_COMPLETION", "GRAPH_COMPLETION", "CHUNKS", "GRAPH_SUMMARY_COMPLETION"]).optional(),
      }),
    },
    async ({ query, session_id, search_type }) => {
      const body: Record<string, unknown> = { query };
      if (session_id) body.session_id = session_id;
      if (search_type) body.search_type = search_type;
      const data = await cognee("/api/v1/recall", { method: "POST", body: JSON.stringify(body) });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    }
  );

  server.registerTool(
    "cognee_remember",
    {
      title: "Remember in Cognee",
      description: "Store a concise pointer-rich durable memory record. Use for material decisions, corrections, outcomes, and known/tried/failed/not-tried state. Never store passwords, API keys, or other secrets.",
      inputSchema: z.object({
        topic: z.string().min(1),
        memory: z.string().min(1),
        session_id: z.string().optional(),
        dataset_name: z.string().default("default_dataset"),
      }),
    },
    async ({ topic, memory, session_id, dataset_name }) => {
      const body: Record<string, unknown> = {
        entry: { type: "qa", question: topic, answer: memory },
        dataset_name,
      };
      if (session_id) body.session_id = session_id;
      const data = await cognee("/api/v1/remember/entry", { method: "POST", body: JSON.stringify(body) });
      return { content: [{ type: "text", text: JSON.stringify({ ok: true, result: data }) }] };
    }
  );

  server.registerTool(
    "jev_systemone",
    {
      title: "Jev typed judgment",
      description: "Optional TypeSafe Jev System One judgment layer. Use after retrieval for routing, reranking, filtering, confidence gates, or verification. It is not a memory store.",
      inputSchema: z.object({
        state: jsonValue,
        questions: z.record(z.string(), z.object({
          type: z.enum(["noul", "choice", "score"]),
          instructions: jsonValue.optional(),
          criteria: jsonValue.optional(),
        }).passthrough()),
        model: z.string().default("jev-latest"),
      }),
    },
    async ({ state, questions, model }) => {
      const data = await typesafe({ state, questions, model });
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    }
  );
});

async function protectedHandler(req: Request) {
  const token = process.env.BACKSTITCH_ACCESS_TOKEN;
  const supplied = new URL(req.url).searchParams.get("access");
  if (!token || supplied !== token) return new Response("Unauthorized", { status: 401 });
  return handler(req);
}

export { protectedHandler as GET, protectedHandler as POST };
