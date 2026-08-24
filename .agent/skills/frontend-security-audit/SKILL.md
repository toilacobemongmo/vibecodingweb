---
name: frontend-security-audit
description: >-
  Use this skill when auditing a frontend codebase for security vulnerabilities, preventing XSS, securing API communication, auditing dependencies, and configuring Content Security Policy (CSP).
---

# Frontend Security Audit & Hardening Skill

This skill provides a comprehensive procedure for identifying and eliminating vulnerabilities in client-side applications.

---

## 1. Security Audit Procedure

### Step 1: Scan for Known Dependency Vulnerabilities
Execute regular package audits:
```bash
npm audit --production
# Or with pnpm/bun
pnpm audit
```
- Immediately patch high and critical severity vulnerabilities by updating dependencies or adding `overrides` in `package.json`.

### Step 2: XSS & Injection Vulnerability Scan
Search the codebase for potentially dangerous patterns:
1. `dangerouslySetInnerHTML`: Ensure every usage is protected with `DOMPurify.sanitize(...)`.
2. `eval()` or `new Function()`: Strictly ban in all client-side code.
3. Unsanitized URLs: Check all `<a href={...}>` and `<iframe src={...}>` for unvalidated dynamic inputs.
4. Third-party script injections: Ensure all analytics/tag scripts use Subresource Integrity (SRI) hashes.

### Step 3: Secrets & Token Leakage Inspection
Verify that no private keys or secrets are bundled:
- Ensure no files import or reference environment variables without the client prefix (e.g. `NEXT_PUBLIC_` or `VITE_`).
- Check `.gitignore` to ensure `.env`, `.env.local`, `.env.production` are strictly excluded from VCS.

---

## 2. Content Security Policy (CSP) Template

For `index.html` or server middleware headers:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://apis.google.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    connect-src 'self' https://api.yourdomain.com wss://api.yourdomain.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
  "
/>
```

---

## 3. Frontend Security Checklist
- [ ] No private keys or un-prefixed secrets in client code.
- [ ] User-generated HTML is sanitized with DOMPurify.
- [ ] Authentication tokens are stored securely with appropriate expiration and refresh mechanisms.
- [ ] CSP headers are configured to prevent clickjacking and arbitrary script injection.
- [ ] All inputs and URL parameters are validated using Zod before state updates or network calls.
