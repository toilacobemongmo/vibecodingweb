# Frontend Security & Data Validation Standards (OWASP Aligned)

This document outlines mandatory security protocols and input/output validation standards to protect the frontend application from common vulnerabilities.

---

## 1. Cross-Site Scripting (XSS) Prevention

- **Default React Escaping**: Always rely on JSX `{variable}` expressions which automatically escape dangerous HTML entities.
- **`dangerouslySetInnerHTML` Strict Rule**:
  - `dangerouslySetInnerHTML` is strictly forbidden unless explicitly authorized and wrapped with **DOMPurify**.
  - Pattern:
    ```tsx
    import DOMPurify from "isomorphic-dompurify";

    export const SafeHTML: React.FC<{ htmlContent: string }> = ({ htmlContent }) => {
      const sanitized = DOMPurify.sanitize(htmlContent, {
        ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "ul", "ol", "li", "code", "pre"],
        ALLOWED_ATTR: ["href", "target", "rel"],
      });
      return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
    };
    ```
- **Dynamic URL Sanitization**:
  - Always validate dynamic URLs in `<a href={url}>` or `<iframe src={url}>` to prevent `javascript:` or `data:` protocol execution:
    ```ts
    export function isValidHttpUrl(url: string): boolean {
      try {
        const parsed = new URL(url, window.location.origin);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    }
    ```

---

## 2. Secrets & Environment Variable Isolation

- **Client Environment Variables**:
  - Only expose environment variables intended for the client bundle (e.g. `NEXT_PUBLIC_*` or `VITE_*`).
  - Never put private API keys, database credentials, or service tokens in frontend files or `.env.local` without strict prefix checks.
- **Runtime Environment Validation**:
  - Validate environment variables at build/runtime using Zod:
    ```ts
    import { z } from "zod";

    const envSchema = z.object({
      VITE_API_BASE_URL: z.string().url(),
      VITE_APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
    });

    export const env = envSchema.parse(import.meta.env);
    ```

---

## 3. Form & API Input Validation (Zod as Single Source of Truth)

- Every form and API request payload must be validated with a **Zod** schema.
- Derive TypeScript types directly from schemas (`z.infer<typeof schema>`):
  ```ts
  import { z } from "zod";

  export const UserRegistrationSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
      .regex(/[0-9]/, "Must contain at least 1 number"),
    fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  });

  export type UserRegistrationInput = z.infer<typeof UserRegistrationSchema>;
  ```

---

## 4. Authentication & Storage Best Practices

- **Token Storage**:
  - Prefer `httpOnly`, `Secure`, `SameSite=Lax` cookies for access/refresh tokens.
  - If stored in memory / client storage, ensure token refresh mechanisms handle expirations gracefully without infinite redirect loops.
- **CSRF Protection**:
  - Ensure state-changing requests (POST, PUT, DELETE, PATCH) include CSRF protection tokens or utilize modern SameSite cookie policies.
- **Clickjacking & Headers**:
  - Enforce Content Security Policy (CSP), `X-Frame-Options: DENY`, and `X-Content-Type-Options: nosniff` in headers or meta tags.
