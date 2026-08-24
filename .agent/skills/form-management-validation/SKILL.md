---
name: form-management-validation
description: >-
  Use this skill when building forms, implementing schema validation with Zod, integrating React Hook Form, handling file uploads, multi-step forms, or dynamic form arrays.
---

# Form Management & Validation Skill

This skill provides step-by-step implementations for creating accessible, high-performance, type-safe forms with React Hook Form and Zod.

---

## 1. Standard Form Pattern (React Hook Form + Zod)

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

// 1. Define Schema
export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  subject: z.enum(["general", "support", "billing"], {
    errorMap: () => ({ message: "Please select a valid subject" }),
  }),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "general",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Send API request
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      reset();
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-md mx-auto" noValidate>
      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="fullName" className="text-sm font-medium text-foreground">
          Full Name
        </label>
        <input
          id="fullName"
          {...register("fullName")}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className="h-10 px-3 rounded-lg border border-input bg-background focus-visible:ring-2 focus-visible:ring-primary"
        />
        {errors.fullName && (
          <p id="fullName-error" className="text-xs text-destructive">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="h-10 px-3 rounded-lg border border-input bg-background focus-visible:ring-2 focus-visible:ring-primary"
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Subject
        </label>
        <select
          id="subject"
          {...register("subject")}
          className="h-10 px-3 rounded-lg border border-input bg-background focus-visible:ring-2 focus-visible:ring-primary"
        >
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="billing">Billing</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="p-3 rounded-lg border border-input bg-background focus-visible:ring-2 focus-visible:ring-primary"
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Send Message"}
      </Button>

      {isSubmitSuccessful && (
        <p className="text-sm text-green-600 font-medium text-center">
          Your message has been sent successfully!
        </p>
      )}
    </form>
  );
};
```

---

## 2. Form Best Practices & Accessibility Checklist
- [ ] Connect `<label>` and `<input>` using matching `htmlFor` and `id`.
- [ ] Add `aria-invalid={true}` when a validation error is present.
- [ ] Link error messages to inputs using `aria-describedby="[input-id]-error"`.
- [ ] Set `noValidate` on `<form>` to disable native browser popups in favor of customized Zod error messages.
- [ ] Disable submit buttons or show spinners while `isSubmitting` is active to prevent double submissions.
