# Browser Secret Envelope (v1)

**Status: staged for public review; not a password manager or hosted service.**

A self-contained, dependency-free HTML page that encrypts short passwords/API keys **in the browser** using a **recipient-supplied, independently verified one-time RSA-3072 public key**. The page produces a Base64-encoded RSA-OAEP-SHA256 ciphertext suitable for recipient-managed ciphertext-only transport. The receiving system, **not this page**, authenticates the transfer ID, intended account/provider, expiry and authorized destination, decrypts with its protected private key, and verifies installation metadata.

## Use

1. Request a *fresh* one-time RSA-3072 public key from your intended authenticated recipient. Verify its fingerprint independently. Do not take public keys from messages/sites of unknown provenance.
2. Open `index.html` through a trusted HTTPS origin or locally where Web Crypto is available. Verify code/content identity before entering credentials. Paste the one-time **public** key.
3. Enter a short secret (1–318 UTF-8 bytes), click **Encrypt locally**, compare the displayed SHA-256 fingerprint to the recipient's independently supplied value, and copy only the Base64 ciphertext. The page never transmits any data; the host is untrusted if its code changes.
4. Send the ciphertext through your recipient's authorized channel. The recipient should decrypt and immediately discard any staging material; do not log or persist plaintext and never share private keys.

## Security and limits

- RSA-OAEP with SHA-256 and MGF1(SHA-256). The 3072-bit key produces 384 ciphertext bytes and supports at most 318 plaintext bytes. Long PEM credentials require a separately reviewed authenticated *hybrid* envelope and are intentionally rejected here.
- `crypto.subtle` never exports the recipient private key. The public key is pasted at runtime; **no private keys, customer details, account names or site-specific endpoints** are embedded.
- No dependencies, third-party scripts, analytics, network requests, cookies or browser storage. A restrictive CSP is embedded in the HTML and available as a Cloudflare Pages `_headers` template; verify the host actually applies headers.
- Browser execution cannot defend against a compromised hosting account, poisoned DNS, malicious browser extensions, an infected user device or a substituted public key. The SHA-256 fingerprint helps only if compared over an independent trusted channel. Cache disabling and CSP do not solve supply-chain compromise. Screen/keylogging threats remain.
- The secret field is cleared after encryption, but JavaScript string and browser memory cannot be reliably zeroized. The ciphertext remains sensitive when combined with recipient state, even if encrypted.
- **WebAuthn/FIDO passkeys are not exportable passwords**; this tool does not extract or encrypt passkeys or hardware tokens.
- Never put plaintext secrets in GitHub issues, walkthrough payloads, build logs, chat or URL query parameters. No browser app should silently open a network session or submit credentials.
- For use in a private deployment, create and track a separate release record for domain ownership, TLS, DNS, CSP HTTP headers, SHA256 integrity, mobile test, threat-model approval and rollback before claiming the page is live.

## Audit / acceptance

Generic tests must verify: valid RSA-3072/SHA-256 OAEP round-trip; Unicode handling; invalid key rejected; oversized secret rejected; password field cleared; no external browser requests; CSP script/style hashes match the deployed file; and recipient fingerprint displayed. Independent security review and a real-browser E2E test remain necessary for production.

**Public-safe:** This is reusable educational infrastructure, not a deployment guide for any individual's environment. No deployment URLs, one-time keys, credentials, account identifiers, or private control-plane details may be committed.
