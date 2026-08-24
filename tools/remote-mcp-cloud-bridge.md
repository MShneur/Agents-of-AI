# Remote MCP + Cloud Bridge Setup Roadmap

**Status:** validated public guide extracted from live end-to-end setup and failure recovery  
**Last updated:** 2026-08-24

This guide documents a reusable pattern for giving an AI assistant controlled access to a self-hosted machine through MCP, then adding a separate authenticated upload bridge for large artifacts. It intentionally removes all personal infrastructure details.

The design goal is simple:

```text
AI control path:   AI client -> secure MCP transport -> restricted host tools
File ingest path:  browser/client -> edge Worker -> private HTTPS tunnel -> loopback bridge -> repository
```

The two paths are deliberately separate. The MCP service should not become an unrestricted root shell, and the file-ingest path should not expose the host's upload port directly to the Internet.

---

## First question: do you already control a domain in this Cloudflare account?

Ask this **before** creating the upload tunnel.

### YES — use Route A: named tunnel + your domain

Choose this when the Cloudflare account that will own the tunnel also contains the DNS zone you want to publish.

```text
client
  -> stable Worker or application hostname
  -> https://bridge.example.com
  -> named Cloudflare Tunnel
  -> http://127.0.0.1:<bridge-port>
  -> authenticated local bridge
  -> repository
```

This is the preferred long-term route because the backend hostname is stable.

### NO — use Route B: domain-free Quick Tunnel

Choose this when you do not own a domain, the domain lives in another Cloudflare account, or you only need a free validation/development path.

```text
client
  -> stable *.workers.dev Worker hostname
  -> https://random-words.trycloudflare.com
  -> Quick Tunnel
  -> http://127.0.0.1:<bridge-port>
  -> authenticated local bridge
  -> repository
```

A Quick Tunnel does **not** require a custom domain or DNS zone. Its random hostname can change when the tunnel process is recreated, so keep the stable client-facing URL at the Worker layer and treat the Quick Tunnel URL as a replaceable backend variable.

### Important account rule

A named Cloudflare Tunnel and the DNS hostname routed to it must be managed in the appropriate Cloudflare account/zone. If the domain is in a different account from the tunnel, do not keep fighting the greyed-out domain selector. Either:

1. create/manage the named tunnel in the account that owns the zone, **or**
2. use the domain-free Quick Tunnel route.

Do not assume a tunnel in one account gives you a generic public IP that can be attached to another account's zone.

---

## Prerequisites

Before either route:

- a Linux host or VM that can reach the Internet outbound;
- a repository credential stored only on the host/provider secret store;
- a local upload bridge bound to loopback, for example `127.0.0.1:8787`;
- a separate bearer token for the local bridge;
- a separate ingress token for the public Worker;
- allowlists for repositories, branches, and destination folder prefixes;
- the host's real CPU architecture (`uname -m` or package-manager equivalent);
- no dependency on GitHub-hosted Actions if the bridge itself already performs commits.

### Architecture check matters

Do not translate "64-bit" automatically to `amd64`. An ARM VM commonly reports `aarch64`/`arm64`; select/download the ARM64 tunnel client for that host.

---

# Stage 1 — local bridge

Run the bridge as a service and bind it to loopback.

Recommended properties:

- `127.0.0.1` bind by default;
- bearer-token authentication;
- repository/folder/branch allowlists;
- idempotency key per upload;
- SHA-256 verification while streaming;
- durable on-disk queue before returning acceptance;
- safe ZIP extraction (no absolute paths, `..`, symlinks unless explicitly supported, or archive bombs);
- bounded worker pool and queue size;
- non-force Git push/commit behavior;
- no secrets in logs or result payloads.

**Pass condition:** an authenticated synthetic ZIP sent directly to the loopback bridge reaches `completed` and creates a real repository commit. A `202 Accepted` response alone is not proof.

---

# Stage 2A — Route A: named tunnel with a domain

Use this route when the Cloudflare account contains the domain/zone.

## 2A.1 Create the tunnel

In Cloudflare:

1. Open **Tunnels**.
2. Create a named tunnel, for example `upload-bridge`.
3. Select the host operating system and the host's actual architecture.
4. Copy the provider-generated **Install as service** command/token.

For a remote/mobile workflow, it is useful to make the host installer accept the entire provider command and extract the token itself, so the human only pastes once.

If the installer deliberately uses hidden input (`read -s` or equivalent), a blank/pulsating prompt is expected: the pasted token is not echoed. Paste once, press Enter, and wait for service output.

## 2A.2 Publish only the loopback bridge

In the tunnel's route configuration:

- **Subdomain:** choose a dedicated name such as `bridge`;
- **Domain:** select the zone already in this account;
- **Path:** normally blank;
- **Service URL:** `http://localhost:<bridge-port>`.

The result is a stable HTTPS backend such as:

```text
https://bridge.example.com
```

Keep the bridge's own bearer-token authentication enabled even though Cloudflare is in front of it.

## 2A.3 Configure the Worker

Set the Worker/backend variables:

```text
ORIGIN_BRIDGE_URL=https://bridge.example.com     # non-secret
ORIGIN_BRIDGE_TOKEN=<secret>                     # secret
INGRESS_TOKEN=<different secret>                 # secret
ALLOWED_REPOS=<allowlist>                        # non-secret
ALLOWED_FOLDER_PREFIXES=<allowlist>               # non-secret
```

The Worker accepts the public `INGRESS_TOKEN`, then supplies `ORIGIN_BRIDGE_TOKEN` privately when forwarding to the host.

**Pass condition:** Worker `/health` with the ingress token returns the local bridge's authenticated health result.

---

# Stage 2B — Route B: no domain / Quick Tunnel

Use this route when no usable domain is available in the tunnel's Cloudflare account.

## 2B.1 Start a Quick Tunnel on the host

After installing `cloudflared`, run the equivalent of:

```bash
cloudflared tunnel --no-autoupdate --url http://127.0.0.1:<bridge-port>
```

For persistence, put it behind a service manager and restart it automatically. A typical systemd unit should:

- start after the local bridge;
- run as an unprivileged host user;
- use `Restart=always`;
- expose only the loopback bridge;
- avoid opening inbound firewall ports.

Cloudflare prints a random URL similar to:

```text
https://random-words.trycloudflare.com
```

## 2B.2 Keep the Worker as the stable front door

Do **not** give clients the random Quick Tunnel URL as the primary endpoint. Keep a stable Worker hostname, for example:

```text
https://your-worker.your-subdomain.workers.dev
```

Then configure:

```text
ORIGIN_BRIDGE_URL=https://random-words.trycloudflare.com
ORIGIN_BRIDGE_TOKEN=<secret>
INGRESS_TOKEN=<different secret>
```

If the Quick Tunnel restarts and gets a new hostname, only `ORIGIN_BRIDGE_URL` needs to change.

## 2B.3 Preserve runtime secrets across Git-connected deploys

A Git-triggered Worker deployment can overwrite runtime configuration if checked-in config is treated as authoritative.

For Cloudflare Wrangler, use the runtime-variable preservation behavior (`keep_vars: true`) when dashboard-managed secrets/variables must survive repository deployments. Stable non-secret values may also be represented in checked-in config.

After **every deployment-path change**, re-test Worker `/health` before attempting a large upload.

**Pass condition:** Worker `/health` authenticates and returns the bridge's health response through the Quick Tunnel.

---

# Stage 3 — end-to-end small ZIP smoke test

Always prove the small path before large-file work.

The smoke client should:

1. generate a tiny ZIP in memory;
2. compute its SHA-256;
3. create a unique idempotency key;
4. `POST /upload` to the stable Worker URL;
5. send the ingress token plus target headers;
6. receive a job ID;
7. poll `/status/<job-id>`;
8. require `status=completed`;
9. verify the returned repository commit SHA exists.

Suggested request headers:

```text
Authorization: Bearer <INGRESS_TOKEN>
Content-Type: application/zip
Content-Length: <exact bytes>
X-Target-Repo: <allowlisted repo>          # use your implementation's actual header name
X-Target-Folder: <allowlisted folder>
X-Target-Branch: <branch>
X-Idempotency-Key: <unique safe value>
X-Content-SHA256: <64 hex characters>
```

**Never** call the bridge proven because health is green or because upload returned `202`. The commit is the proof.

---

# Stage 4 — large ZIPs: chunk instead of raising every limit

A file that barely exceeds an edge request limit should not force a new architecture.

A robust browser/client flow is:

```text
large ZIP
  -> split locally into conservative chunks
  -> POST /chunk for each part
  -> verify per-chunk SHA-256
  -> POST /chunk-complete
  -> host reassembles ZIP
  -> validate archive
  -> optionally strip known archive prefix
  -> normalize ZIP
  -> enqueue through the same durable bridge
  -> poll normal job status
  -> verify repository commit
```

A practical example is **48 MiB browser chunks** when the edge's single-request cap is materially higher than that. The server can allow a somewhat larger per-chunk ceiling while keeping the client below the edge limit. Treat every numeric limit as configurable and re-check provider limits rather than baking them into the architecture.

Recommended chunk metadata:

```text
X-Upload-Id
X-Chunk-Index
X-Chunk-Count
X-Chunk-Length
X-Chunk-SHA256
X-Strip-Prefix            # optional, normalized relative archive prefix
```

Server rules:

- persist chunks under an isolated upload-session directory;
- reject duplicate chunk metadata conflicts;
- accept idempotent re-sends only when the stored hash matches;
- reject missing chunks at completion;
- bound chunk count and total assembled size;
- verify the reassembled payload is a real ZIP;
- reject ZIP-slip paths and symlinks;
- strip an archive prefix only when explicitly requested and normalized;
- reject a completion that leaves zero valid files;
- hand the normalized result to the same durable queue used by normal uploads;
- delete the temporary chunk session after successful enqueue.

## Mobile-friendly browser uploader

For users working only from a phone, a small protected upload page can do the chunking in the browser:

1. enter the ingress token;
2. choose the ZIP file;
3. enter/select repository, branch, target folder, and optional strip prefix;
4. hash and upload each chunk sequentially;
5. request completion/reassembly;
6. poll status;
7. display commit SHA and file count.

The token should remain in page memory only unless the user intentionally stores it elsewhere. The page must not embed a real secret in source code.

**Large-file pass condition:** a file larger than one chunk crosses the Worker/tunnel, is reassembled and validated, and ends with a verified repository commit.

---

# Stage 5 — MCP control lane

The upload bridge solves binary transport; MCP solves safe remote administration.

Recommended MCP controls:

- run the MCP server as an unprivileged service account;
- bind locally/private unless the supported secure transport requires otherwise;
- expose purpose-built tools such as status, file reads in approved roots, service status, and bounded shell operations;
- no general `sudo` from the AI tool;
- block destructive command fragments;
- enforce timeouts and output caps;
- keep server-owned secrets unreadable to the MCP account;
- when a protected smoke test needs secrets, create a narrow server-side helper that returns only sanitized PASS/FAIL/job/commit evidence.

**Pass condition:** the AI can execute a harmless live status tool remotely without the user copying terminal output back and forth.

---

# Mobile administration shortcuts

These conventions eliminated much of the setup friction during live validation.

## Always label the location

Every human instruction should begin with one of:

- **STAY ON THIS PAGE**
- **GO TO CLOUDFLARE**
- **GO TO PROVIDER CLOUD SHELL**
- **ON THE TARGET VM**
- **RETURN TO THE AI APP**

Do not assume the user knows which shell or dashboard is active.

## Prefer one "super-command"

When a user has a provider Cloud Shell and an SSH key, prefer one remote command such as:

```bash
ssh -t -i ~/YOUR_KEY -o StrictHostKeyChecking=accept-new USER@HOST \
  'cd ~/YOUR_REPO && git pull --ff-only && sudo bash path/to/installer.sh'
```

This is better than asking a phone user to SSH, `cd`, pull, then run several separate commands.

## Hidden input is not a hang

If a script says a secret will not be echoed and shows `>` with a blinking/pulsating cursor, paste the value and press Enter. Nothing visible appearing is expected.

## Wrong-shell protection

Provider Cloud Shell and the target VM are different machines. A path that exists on the VM may not exist in Cloud Shell. Use the SSH super-command rather than making the user manually reason about both environments.

## Phone recovery

Do not rely on `Ctrl+C`, function keys, or precise terminal selection. If a mobile terminal session is genuinely wedged, opening a fresh Cloud Shell session is often safer than key-chord troubleshooting.

---

# Failure catalog from live validation

| Symptom | Root cause | Fix |
|---|---|---|
| Repo/path suddenly "does not exist" | command ran in provider Cloud Shell instead of target VM | label the location; use one SSH super-command |
| Tunnel installer package will not run | `amd64`/generic 64-bit selected for ARM host | verify architecture first; choose ARM64/aarch64 when appropriate |
| Blank prompt appears frozen | installer intentionally disabled echo for a secret | paste once and press Enter; do not restart merely because text is invisible |
| Domain dropdown is grey/empty | tunnel account has no DNS zone | switch to account that owns the zone or use Quick Tunnel |
| Tunnel creation fails in domain account | current login lacks required tunnel/account permissions | use an owner/admin role or use a different permitted route |
| Named tunnel exists but cannot publish the other account's domain | tunnel and DNS zone are split across Cloudflare accounts | colocate tunnel with zone or use domain-free route |
| Worker says backend not configured after Git deploy | checked-in deployment dropped dashboard variables/secrets | preserve runtime vars (`keep_vars`) and re-check health after deploy |
| Worker health succeeds but upload POST gets provider error 1010/403 | browser-integrity/security layer rejected default programmatic client before Worker code | use a conventional `User-Agent` + `Accept` for controlled smoke tests, or narrowly tune the provider rule; keep bearer auth |
| Worker returns unauthorized after adding secrets | public ingress token and origin bridge token were mixed up | use two distinct roles; Worker validates ingress token and forwards origin token |
| Direct host smoke works but public smoke fails | failure is Worker/tunnel config, not bridge/GitHub | isolate each segment: local -> tunnel -> Worker -> commit |
| Service is active but no repository change | only process health was tested | require status `completed` + real commit SHA |
| Large ZIP is slightly over edge limit | single-request design is too brittle | use chunked upload, not repeated limit increases |
| Quick Tunnel suddenly becomes unreachable | random hostname changed after service recreation | update backend URL or automate propagation; named tunnel is long-term option |
| MCP cannot read bridge secret file | intentional least-privilege boundary | use secret-preserving server helper; do not loosen permissions |

---

# Configuration template

Use placeholders only in public docs:

```text
PROCESSOR_HOST=<your host>
BRIDGE_BIND=127.0.0.1
BRIDGE_PORT=<local port>
MCP_TUNNEL_ID=<provider tunnel id>
MCP_RUNTIME_TOKEN=<secret>
INGRESS_TOKEN=<secret>
ORIGIN_BRIDGE_TOKEN=<secret>
ORIGIN_BRIDGE_URL=https://<named-or-quick-tunnel-hostname>
ALLOWED_REPOSITORIES=<allowlist>
ALLOWED_FOLDER_PREFIXES=<allowlist>
ALLOWED_BRANCHES=<allowlist>
MAX_DIRECT_UPLOAD_BYTES=<implementation limit>
MAX_CHUNK_BYTES=<implementation limit>
MAX_ASSEMBLED_BYTES=<implementation limit>
```

Never publish real tokens, account IDs, IPs, personal names, private repository/folder names, tunnel UUIDs, private hostnames, bucket names, or copied provider install tokens.

---

# Completion checklist

The setup is complete only when all relevant boxes are true:

- [ ] Host/VM is reachable and correct CPU architecture is known.
- [ ] MCP server runs unprivileged and the AI can call a harmless live status tool.
- [ ] Local upload bridge stays on loopback and requires authentication.
- [ ] Direct local synthetic ZIP reaches `completed` and produces a verified commit.
- [ ] **Route A users:** named tunnel is connected and domain route resolves to the bridge.
- [ ] **Route B users:** Quick Tunnel is active and its current URL is stored as the Worker backend.
- [ ] Worker has separate ingress and origin tokens.
- [ ] Worker deployment preserves dashboard-managed runtime secrets/variables.
- [ ] Authenticated Worker `/health` reaches the local bridge.
- [ ] External small ZIP reaches `completed` and produces a verified commit.
- [ ] Programmatic smoke client is not blocked before Worker code runs.
- [ ] Large-file path uses chunking/staging rather than depending on one giant edge request.
- [ ] A multi-chunk ZIP has been reassembled, validated, and committed successfully.
- [ ] Temporary Quick Tunnel URL rotation has a manual or automated refresh plan.
- [ ] Reboot/restart persistence has been tested.
- [ ] Public documentation contains placeholders only, never live credentials or private infrastructure fingerprints.

---

# Future-proofing rule

Provider UI labels, limits, security defaults, free tiers, and tunnel products will change. Keep these parts stable:

1. **decision first:** domain available in the same account? named route; otherwise domain-free route;
2. **security:** edge token != origin token; bridge stays authenticated and loopback-bound;
3. **proof:** health is not completion; require a real downstream commit;
4. **large files:** chunk before you hit the edge limit;
5. **mobile UX:** one location, one action, one super-command where possible;
6. **adapters:** treat dashboard button names, quotas, exact URLs, and provider-specific tunnel commands as replaceable implementation details.

When a provider changes its UI or deployment behavior, update the adapter/walkthrough rather than rewriting the architecture.