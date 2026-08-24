# Domain-Free Cloud Bridge via Quick Tunnel

**Status:** validated troubleshooting path; use for testing/development unless the provider documents stronger guarantees.

This note captures a reusable no-domain route for exposing a loopback-only upload bridge to an edge Worker without buying, moving, or attaching a DNS zone.

## Architecture

```text
trusted client
  -> authenticated edge Worker on provider-hosted workers.dev hostname
  -> HTTPS Quick Tunnel URL
  -> local bridge bound to 127.0.0.1:<bridge-port>
  -> validated unpack / queue / repository commit
```

## When to use it

Use this path when:

- the edge account has no custom domain attached;
- the desired domain is controlled by a different account or organization;
- tunnel creation in the domain-owning account is blocked by permissions;
- the immediate goal is to prove the full upload path before deciding on a permanent hostname.

Do not assume that a tunnel created in one account can publish a hostname from a DNS zone owned by another account. A Quick Tunnel avoids that dependency by issuing a temporary provider hostname.

## Setup sequence

1. Keep the local upload bridge bound to loopback and protected by its own bearer token.
2. Install the tunnel client for the host's real CPU architecture.
3. Start a Quick Tunnel pointing at the local bridge, for example:

   ```text
   cloudflared tunnel --url http://127.0.0.1:<bridge-port>
   ```

4. Capture the generated `https://<random>.trycloudflare.com` URL.
5. In the edge Worker settings, add a non-secret backend URL variable such as:

   ```text
   ORACLE_BRIDGE_URL=https://<random>.trycloudflare.com
   ```

6. Keep the backend bridge token as a provider secret, for example:

   ```text
   ORACLE_BRIDGE_TOKEN=<secret>
   ```

7. Also configure a separate ingress secret for clients calling the public Worker:

   ```text
   INGRESS_TOKEN=<secret>
   ```

   If this ingress secret is missing, a correctly written Worker should fail closed with an explicit configuration error rather than forwarding unauthenticated traffic.

8. Verify in this order:
   - Quick Tunnel URL reaches the bridge and returns the bridge's expected authentication failure without credentials.
   - Public Worker without an ingress token returns the expected unauthorized/configuration response.
   - Authenticated Worker health call reaches the bridge.
   - A tiny synthetic ZIP traverses Worker -> tunnel -> bridge -> repository and produces a verifiable commit.

## Important operational caveat

Quick Tunnel hostnames are temporary/random and can change when the tunnel process is recreated. Do not hard-code the generated hostname as though it were permanent infrastructure.

For a durable production design, either:

- use a named tunnel attached to a DNS zone controlled in the correct provider account; or
- automate discovery of the current Quick Tunnel URL and update the Worker backend configuration whenever it changes.

## Failure lessons

### Domain dropdown is empty

**Symptom:** the tunnel UI will not allow a published hostname because no DNS zone exists in the current account.

**Fix:** either use an account that owns the desired DNS zone or switch to the domain-free Quick Tunnel validation path.

### Tunnel exists but Worker returns `ingress_not_configured`

**Cause:** the public Worker requires a separate client-facing ingress token and that secret has not been configured.

**Fix:** add the ingress secret in the Worker environment, then rerun health before attempting a ZIP upload.

### Wrong architecture selected

**Symptom:** the tunnel client fails to install or execute.

**Fix:** verify `uname -m` first. ARM hosts need the ARM64/aarch64 build, not generic amd64/"64-bit".

### Terminal appears frozen at a secret prompt

**Cause:** hidden input intentionally echoes nothing.

**Fix:** instructions should explicitly say that pasted text will not appear and Enter must still be pressed. Better yet, provide a single non-interactive installer when the operator has already accepted secret-in-command handling for that environment.

## Completion criteria

The no-domain path is proven only when all of the following are true:

- [ ] local bridge is loopback-only and authenticated;
- [ ] Quick Tunnel reaches that bridge;
- [ ] public Worker has its own ingress authentication;
- [ ] Worker health reaches the bridge through the tunnel;
- [ ] a synthetic ZIP reaches the repository and the commit is verified;
- [ ] restart behavior and URL-change behavior are documented before calling the path permanent.
