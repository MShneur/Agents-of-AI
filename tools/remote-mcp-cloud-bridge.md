# Remote MCP + Cloud Bridge Setup Roadmap

**Status:** validated public guide extracted from a live end-to-end setup  
**Last updated:** 2026-08-24

This guide documents a reusable pattern for giving an AI assistant controlled access to a self-hosted machine through MCP, then adding a separate authenticated upload bridge for large artifacts. It intentionally removes all personal infrastructure details.

## What this pattern solves

A common setup problem is having all of these at once:

- a private VM or home/server host that should not expose SSH or an admin port publicly;
- an MCP server that an AI client can call safely;
- a need to move ZIPs or other binary artifacts to the host and then into a repository;
- mobile-first administration where repeated terminal copy/paste is painful;
- secrets that must stay on the server/provider, not in chat or Git history.

The pattern separates **AI control** from **file ingress** rather than forcing one tunnel or token to do everything.

## Architecture

```text
AI client
  -> secure MCP connection
  -> restricted MCP service on processor host

Browser / uploader
  -> authenticated edge ingress
  -> authenticated private tunnel
  -> local upload bridge on processor host
  -> validated unpack / bounded repository commit
```

Key rule: the upload bridge remains bound to loopback/private access. The public edge never forwards directly to an unauthenticated admin port.

## Domain-free fallback architecture

A custom domain is convenient but not mandatory for initial validation.

When the edge provider supports temporary/quick tunnels, a useful no-domain test path is:

```text
trusted client
  -> stable edge Worker / serverless ingress hostname
  -> temporary HTTPS quick-tunnel hostname
  -> local bridge on 127.0.0.1
  -> repository
```

Important limits:

- quick-tunnel hostnames are temporary and can change when the tunnel process is recreated;
- treat them as a validation/development transport, not a permanent production hostname;
- keep the stable public client-facing hostname at the edge layer, not on the temporary tunnel itself;
- automate propagation of the new backend URL if you choose to keep this pattern beyond a short-lived test.

## Validation roadmap

Do not skip ahead. A green status page is not enough; each segment must be proven independently.

### Stage 1 — Host is reachable and stable

- Confirm the intended machine is running.
- Confirm architecture (`amd64` vs `arm64`) before selecting downloads.
- Install only the minimum runtime/tooling required.
- Keep the host on a known free/hard-capped plan if that is a project requirement; provider billing rules change, so verify current official docs.

**Pass condition:** normal SSH/admin access works and the intended services survive restart.

### Stage 2 — Local MCP service

- Run the MCP server as an unprivileged service account.
- Bind it to loopback unless the secure MCP transport explicitly requires otherwise.
- Expose purpose-built tools rather than unrestricted root shell access.
- Use bounded timeouts, output limits, allowed roots, and blocked destructive operations.

**Pass condition:** local MCP health/tools respond under the restricted account.

### Stage 3 — Secure MCP transport + AI app

- Create the provider-supported secure MCP tunnel/transport.
- Store tunnel/runtime credentials only in the host/provider secret store.
- Connect the custom AI app to the tunnel.
- Test a harmless read-only tool first, such as host status.

**Pass condition:** the AI can invoke a real tool on the host and receive current output without a human copying terminal commands.

### Stage 4 — Local upload bridge

- Run the upload bridge as its own service.
- Bind to `127.0.0.1` or equivalent loopback/private interface.
- Require a bearer token or equivalent application-layer authentication.
- Validate destination repository/folder against an allowlist.
- Require an idempotency key and content checksum.
- Safely unpack archives: reject path traversal, symlinks when not required, oversized extraction, and unsupported types.

**Pass condition:** an authenticated tiny synthetic ZIP is accepted, unpacked, and produces a real repository commit. Record the resulting commit SHA; a `202 Accepted` response alone is not completion proof.

### Stage 5 — Private HTTPS tunnel for the upload bridge

- Create a tunnel from the processor host to the edge provider.
- Select the host's real CPU architecture when downloading the tunnel client.
- Install the tunnel client as a service.
- Route only the required hostname/path to the loopback upload bridge.
- Keep the bridge's own bearer token enabled even behind the tunnel.

**Pass condition:** the tunnel is connected and the private bridge health endpoint is reachable only through the intended authenticated path.

### Stage 6 — Edge ingress

- Put the public uploader behind a separate ingress token.
- Keep non-secret routing values as ordinary variables and secret values in provider secret storage.
- Use narrow repository/folder allowlists for the first test.
- Enforce request-size limits before forwarding.
- If the Worker/serverless app is Git-connected, make sure deployments preserve dashboard-managed variables/secrets that are not represented in the checked-in config.

**Pass condition:** an external tiny synthetic ZIP reaches the local bridge and produces a verified repository commit.

### Stage 7 — Large artifact handling

Do not design around the largest file you have today. Provider request limits change.

Preferred pattern:

1. set a conservative per-upload target below the provider's documented limit;
2. split large archives into numbered batches or stage them in object storage;
3. include a manifest with checksums and expected paths;
4. retry only failed chunks;
5. make the downstream commit idempotent;
6. verify the final manifest after reassembly/unpack.

This is safer than raising every limit until a single giant upload happens to fit.

## Failure lessons worth preserving

### 1. Wrong terminal / wrong machine

**Symptom:** a valid path or repository suddenly "does not exist."  
**Cause:** the user is in a provider Cloud Shell rather than the actual VM.  
**Fix:** make instructions say explicitly whether the next action happens in the dashboard, provider Cloud Shell, or target VM.

### 2. Wrong CPU architecture

**Symptom:** installer package will not run or the wrong binary is selected.  
**Cause:** choosing generic `64-bit`/`amd64` for an ARM host.  
**Fix:** verify with `uname -m` first, then choose `arm64`/`aarch64` when appropriate.

### 3. "Service is active" mistaken for end-to-end success

**Symptom:** health checks are green but uploads never create a repository commit.  
**Cause:** only the local process was tested.  
**Fix:** require a tiny synthetic archive to traverse the complete path and verify the resulting commit SHA.

### 4. Restricted MCP account cannot read operational secrets

**Symptom:** the AI can inspect services but cannot run a protected smoke test.  
**Cause:** correct least-privilege separation: MCP user cannot read another account's secret file.  
**Fix:** add a narrow server-side helper/tool that can run the approved test using protected credentials and returns only sanitized PASS/FAIL, job ID, and commit evidence. Do not weaken file permissions just to make the AI convenient.

### 5. Secrets copied through chat

**Symptom:** tunnel/API tokens appear in screenshots, messages, shell history, or docs.  
**Fix:** secret values are pasted directly into provider/server prompts. Public docs show placeholders only. Avoid command-line arguments when a prompt or secret store is available.

### 6. Dashboard guidance jumps contexts without saying so

**Symptom:** the user does not know whether to stay on the current provider screen or return to a terminal.  
**Fix:** every step begins with a location label: `Stay on this page`, `Open Cloud Shell`, `On the target VM`, or `Return to the AI app`.

### 7. Large ZIP treated as a special-case emergency

**Symptom:** a file barely exceeds an ingress limit and the architecture becomes a sequence of limit increases.  
**Fix:** make chunked/staged uploads a first-class feature from the beginning.

### 8. Git-connected deploy silently removes runtime configuration

**Symptom:** dashboard variables look correct, but the deployed Worker suddenly reports that backend configuration is missing after an unrelated repository commit.  
**Cause:** an automatic Git deployment used checked-in configuration that did not preserve provider-managed runtime variables/secrets.  
**Fix:** use the provider's preserve/keep-runtime-vars option (for Cloudflare Wrangler this is `keep_vars`) and keep stable non-secret routing values in checked-in configuration when appropriate. Then re-run the health check after every deployment path change.

### 9. Programmatic smoke test gets a provider security 403 before Worker code runs

**Symptom:** GET health succeeds, but a Python/CLI POST is rejected with a provider-generated browser-signature/security error.  
**Cause:** browser-integrity protection classified the default HTTP client signature as suspicious before the request reached application code.  
**Fix:** first confirm the error is provider-generated rather than from your Worker. For a controlled smoke client, send a conventional `User-Agent` and `Accept` header, or explicitly tune the provider security rule for the dedicated API endpoint. Do not weaken the bridge's bearer-token authentication.

### 10. Temporary quick-tunnel URL changes

**Symptom:** the stable edge endpoint starts returning backend-unreachable even though the local bridge is healthy.  
**Cause:** the quick tunnel restarted and received a new temporary hostname.  
**Fix:** either move to a named/custom-domain tunnel for long-term use or automate detection and propagation of the current temporary backend URL. Never hard-code a temporary hostname and assume it is permanent.

## Public-safe secret/config template

Use placeholders only:

```text
PROCESSOR_HOST=<your host>
MCP_TUNNEL_ID=<provider tunnel id>
MCP_RUNTIME_TOKEN=<secret>
UPLOAD_INGRESS_TOKEN=<secret>
UPLOAD_BRIDGE_TOKEN=<secret>
UPLOAD_BRIDGE_URL=https://<your authenticated private tunnel hostname>
ALLOWED_REPOSITORIES=<your allowlist>
ALLOWED_FOLDER_PREFIXES=<your allowlist>
```

Never publish real values, account IDs, hostnames, IPs, repository names, branch names from private deployments, tunnel UUIDs, bucket names, or copied provider install tokens.

## Completion checklist

The setup is complete only when all of these are true:

- [ ] AI can call a harmless MCP status tool remotely.
- [ ] MCP service runs unprivileged and cannot read unrelated secrets.
- [ ] Local upload bridge requires authentication and stays non-public.
- [ ] Direct bridge synthetic ZIP creates a verified repository commit.
- [ ] Private HTTPS tunnel to the bridge is connected.
- [ ] Edge ingress has its own authentication and narrow allowlists.
- [ ] External synthetic ZIP creates a verified repository commit.
- [ ] Git-triggered redeploys preserve required runtime variables/secrets.
- [ ] Programmatic smoke client is not blocked before application code runs.
- [ ] Large-file strategy is chunked/staged rather than dependent on a single provider request limit.
- [ ] Temporary tunnel URL rotation has a migration or automation plan.
- [ ] No secret appears in public docs, public walkthrough JSON, public issues, or public examples.
- [ ] Reboot/restart persistence has been tested.

## Future-proofing rule

Provider UI labels, plan limits, product availability, and security defaults change. Keep the architecture and pass/fail conditions stable, and treat provider-specific button names, quotas, exact dashboard paths, and temporary tunnel products as replaceable adapters. When a provider changes its UI or deployment behavior, update only the adapter/walkthrough rather than rewriting the security model.
