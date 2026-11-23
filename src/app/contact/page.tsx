"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  subject: z.enum(["general", "leasing", "events", "media", "other"]),
  message: z.string().min(10, "Please write a short message"),
});

type FormData = z.infer<typeof schema>;

const subjects = [
  { value: "general", label: "General enquiry" },
  { value: "leasing", label: "Leasing / retail space" },
  { value: "events", label: "Events & promotions" },
  { value: "media", label: "Media / press" },
  { value: "other", label: "Other" },
] as const;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "general" },
  });

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // Demo UX: still show success if offline
    }
    setSending(false);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-sand">
      <section className="border-b border-forest/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted">
            Get in touch
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest tracking-tight">
            Contact the centre
          </h1>
          <p className="mt-3 max-w-2xl text-ink-muted leading-relaxed">
            Questions about stores, events, leasing or a group visit? Send a
            message and the team will respond during centre hours.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-5">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  body: "MR103, Shebas Rocks\nEzulwini, Eswatini",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  body: "+268 2416 1600",
                  href: "tel:+26824161600",
                },
                {
                  icon: Mail,
                  title: "Email",
                  body: "info@thegables.co.sz",
                  href: "mailto:info@thegables.co.sz",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl border border-forest/10 bg-white p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/5 text-forest">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-forest">{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-0.5 text-sm text-ink-muted hover:text-terracotta whitespace-pre-line"
                      >
                        {item.body}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm text-ink-muted whitespace-pre-line">
                        {item.body}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-forest/10 bg-white p-10 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white">
                    <Check className="h-7 w-7" />
                  </div>
                  <h2 className="mt-4 font-serif text-2xl font-medium text-forest">
                    Message sent
                  </h2>
                  <p className="mt-2 text-ink-muted">
                    Thank you. We will get back to you during centre hours.
                  </p>
                  <Button
                    className="mt-6"
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="rounded-2xl border border-forest/10 bg-white p-6 sm:p-8 space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-forest"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        {...register("name")}
                        className={cn(
                          "mt-1.5 w-full rounded-lg border bg-sand/50 px-3 py-2.5 text-sm text-forest focus:outline-none focus:ring-2 focus:ring-terracotta/30",
                          errors.name ? "border-red-400" : "border-forest/15"
                        )}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-forest"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className={cn(
                          "mt-1.5 w-full rounded-lg border bg-sand/50 px-3 py-2.5 text-sm text-forest focus:outline-none focus:ring-2 focus:ring-terracotta/30",
                          errors.email ? "border-red-400" : "border-forest/15"
                        )}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-forest"
                      >
                        Phone (optional)
                      </label>
                      <input
                        id="phone"
                        {...register("phone")}
                        className="mt-1.5 w-full rounded-lg border border-forest/15 bg-sand/50 px-3 py-2.5 text-sm text-forest focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-forest"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        {...register("subject")}
                        className="mt-1.5 w-full rounded-lg border border-forest/15 bg-sand/50 px-3 py-2.5 text-sm text-forest focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                      >
                        {subjects.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-forest"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message")}
                      className={cn(
                        "mt-1.5 w-full rounded-lg border bg-sand/50 px-3 py-2.5 text-sm text-forest focus:outline-none focus:ring-2 focus:ring-terracotta/30 resize-y",
                        errors.message ? "border-red-400" : "border-forest/15"
                      )}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="terracotta"
                    disabled={sending}
                    className="w-full sm:w-auto gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {sending ? "Sending…" : "Send message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
