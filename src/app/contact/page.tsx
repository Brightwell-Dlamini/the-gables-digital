"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/store/admin";

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

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const addMessage = useAdmin((s) => s.addMessage);

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
      /* demo: still succeed offline */
    }
    addMessage({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });
    setSending(false);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-sand">
      <section className="relative min-h-[42vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-forest/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 pt-28 text-white">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta"
          >
            Get in touch
          </motion.p>
          <h1 className="mt-3 max-w-2xl font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight overflow-hidden">
            {["Contact", "the", "centre"].map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: easeOut }}
                className="inline-block mr-[0.22em]"
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-4 max-w-lg text-white/85 leading-relaxed"
          >
            Stores, events, leasing or a group visit — send a note and the team
            responds during centre hours.
          </motion.p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-4">
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
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="flex gap-4 rounded-2xl border border-forest/10 bg-white p-5 shadow-sm hover:shadow-glass transition-shadow"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-forest">
                      {item.title}
                    </h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-0.5 text-sm text-ink-muted hover:text-terracotta whitespace-pre-line transition-colors"
                      >
                        {item.body}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm text-ink-muted whitespace-pre-line">
                        {item.body}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-forest/10 bg-white p-10 sm:p-12 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest text-white">
                    <Check className="h-8 w-8" />
                  </div>
                  <h2 className="mt-5 font-serif text-2xl sm:text-3xl font-medium text-forest">
                    Message sent
                  </h2>
                  <p className="mt-2 text-ink-muted max-w-sm mx-auto">
                    Thank you. We will get back to you during centre hours.
                  </p>
                  <Button
                    className="mt-8 rounded-full"
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="rounded-2xl border border-forest/10 bg-white p-6 sm:p-8 shadow-sm space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        Name
                      </label>
                      <input
                        {...register("name")}
                        className="mt-1.5 w-full rounded-xl border border-forest/15 bg-sand/40 px-3.5 py-2.5 text-sm text-forest focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-terracotta">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="mt-1.5 w-full rounded-xl border border-forest/15 bg-sand/40 px-3.5 py-2.5 text-sm text-forest focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-terracotta">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        Phone
                      </label>
                      <input
                        {...register("phone")}
                        className="mt-1.5 w-full rounded-xl border border-forest/15 bg-sand/40 px-3.5 py-2.5 text-sm text-forest focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        Subject
                      </label>
                      <select
                        {...register("subject")}
                        className="mt-1.5 w-full rounded-xl border border-forest/15 bg-sand/40 px-3.5 py-2.5 text-sm text-forest focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
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
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="mt-1.5 w-full rounded-xl border border-forest/15 bg-sand/40 px-3.5 py-2.5 text-sm text-forest focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30 resize-y"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-terracotta">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="terracotta"
                    size="lg"
                    disabled={sending}
                    className="rounded-full gap-2 btn-lift w-full sm:w-auto"
                  >
                    {sending ? "Sending…" : "Send message"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
