"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
  persona: z.enum(["Fashion", "Food", "Services"]),
  spaceSize: z.enum(["kiosk", "small", "medium", "large", "anchor"]),
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(8, "Phone number required"),
  company: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const steps = [
  { id: 1, title: "Business Persona" },
  { id: 2, title: "Space Requirements" },
  { id: 3, title: "Contact & Details" },
];

const spaceOptions = [
  { value: "kiosk", label: "Small Kiosk", desc: "Pop-up or kiosk space" },
  { value: "small", label: "Small Unit", desc: "≈ 50–100 m²" },
  { value: "medium", label: "Medium Unit", desc: "≈ 100–250 m²" },
  { value: "large", label: "Large Unit", desc: "≈ 250–500 m²" },
  { value: "anchor", label: "Anchor Tenant", desc: "500 m²+" },
] as const;

export default function LeasingPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const persona = watch("persona");
  const spaceSize = watch("spaceSize");

  const onSubmit = (data: FormData) => {
    console.log("Leasing enquiry:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 text-forest">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="font-serif text-3xl font-medium text-forest">Enquiry received</h1>
          <p className="mt-3 text-ink-muted leading-relaxed">
            Thank you for your interest in joining The Gables. Our leasing team will review your requirements and contact you shortly.
          </p>
          <Button
            variant="outline"
            className="mt-8"
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
          >
            Submit another enquiry
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand">
      <section className="border-b border-forest/10 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted">Leasing</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest tracking-tight text-balance">
            Join the 96+ brands defining the Ezulwini retail experience
          </h1>
          <p className="mt-4 text-ink-muted leading-relaxed max-w-xl mx-auto">
            Premium footfall, free secure parking, strong anchors and a growing lifestyle destination.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  step >= s.id ? "bg-forest text-white" : "bg-white border border-forest/20 text-ink-muted"
                )}
              >
                {step > s.id ? <Check className="h-4 w-4" /> : s.id}
              </div>
              <span className={cn("hidden sm:block text-sm font-medium", step >= s.id ? "text-forest" : "text-ink-muted")}>
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <div className={cn("mx-2 h-px flex-1", step > s.id ? "bg-forest" : "bg-forest/15")} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <h2 className="font-serif text-2xl text-forest">What type of business are you?</h2>
                <div className="grid gap-3">
                  {(["Fashion", "Food", "Services"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setValue("persona", p, { shouldValidate: true })}
                      className={cn(
                        "rounded-xl border px-5 py-4 text-left transition-all",
                        persona === p
                          ? "border-forest bg-forest/5 ring-2 ring-forest/20"
                          : "border-forest/15 bg-white hover:border-forest/30"
                      )}
                    >
                      <span className="font-medium text-forest">{p}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="button" variant="terracotta" disabled={!persona} onClick={() => setStep(2)} className="gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <h2 className="font-serif text-2xl text-forest">What size of space are you looking for?</h2>
                <div className="grid gap-3">
                  {spaceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setValue("spaceSize", opt.value, { shouldValidate: true })}
                      className={cn(
                        "rounded-xl border px-5 py-4 text-left transition-all",
                        spaceSize === opt.value
                          ? "border-forest bg-forest/5 ring-2 ring-forest/20"
                          : "border-forest/15 bg-white hover:border-forest/30"
                      )}
                    >
                      <span className="font-medium text-forest">{opt.label}</span>
                      <span className="mt-0.5 block text-sm text-ink-muted">{opt.desc}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button type="button" variant="terracotta" disabled={!spaceSize} onClick={() => setStep(3)} className="gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <h2 className="font-serif text-2xl text-forest">How can we reach you?</h2>
                <div>
                  <label className="block text-sm font-medium text-forest mb-1.5">Full name *</label>
                  <input {...register("name")} className="w-full rounded-lg border border-forest/15 bg-white px-3.5 py-2.5 text-sm focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-1.5">Email *</label>
                  <input type="email" {...register("email")} className="w-full rounded-lg border border-forest/15 bg-white px-3.5 py-2.5 text-sm focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-1.5">Phone *</label>
                  <input type="tel" {...register("phone")} className="w-full rounded-lg border border-forest/15 bg-white px-3.5 py-2.5 text-sm focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-1.5">Company / Brand (optional)</label>
                  <input {...register("company")} className="w-full rounded-lg border border-forest/15 bg-white px-3.5 py-2.5 text-sm focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-1.5">Additional notes</label>
                  <textarea {...register("message")} rows={3} className="w-full rounded-lg border border-forest/15 bg-white px-3.5 py-2.5 text-sm focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30 resize-none" />
                </div>
                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button type="submit" variant="terracotta" className="gap-2">
                    Submit enquiry <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
