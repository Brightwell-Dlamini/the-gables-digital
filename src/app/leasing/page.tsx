"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpaceTour } from "@/components/leasing/SpaceTour";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/store/admin";

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
  { id: 3, title: "Contact" },
  { id: 4, title: "Documents" },
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
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const addApplication = useAdmin((s) => s.addApplication);

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

  const simulateUpload = (selected: File) => {
    setFile(selected);
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return p + 8 + Math.random() * 12;
      });
    }, 180);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) simulateUpload(f);
  };

  const onSubmit = (data: FormData) => {
    addApplication({
      ...data,
      documentName: file?.name,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-forest text-white shadow-lg">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-forest">Enquiry received</h1>
          <p className="mt-3 text-ink-muted leading-relaxed">
            Thank you for your interest in joining The Gables. Our leasing team will review your requirements and contact you shortly.
          </p>
          <Button
            variant="outline"
            className="mt-8 rounded-full"
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setFile(null);
              setUploadProgress(0);
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
      <section className="relative min-h-[44vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-forest/65 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 pt-28 text-white">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta"
          >
            Leasing
          </motion.p>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-balance">
            Join the brands defining the valley
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 max-w-xl text-white/85 leading-relaxed"
          >
            Premium footfall, free secure parking, strong anchors and a lifestyle
            destination that keeps growing.
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-10">
        <SpaceTour />
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 flex items-center justify-between gap-1">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1.5 flex-1 min-w-0">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  step >= s.id ? "bg-forest text-white" : "bg-white border border-forest/20 text-ink-muted"
                )}
              >
                {step > s.id ? <Check className="h-3.5 w-3.5" /> : s.id}
              </div>
              <span className={cn("hidden lg:block text-xs font-medium truncate", step >= s.id ? "text-forest" : "text-ink-muted")}>
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <div className={cn("mx-1 h-px flex-1", step > s.id ? "bg-forest" : "bg-forest/15")} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-forest/10 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-4">
                <h2 className="font-serif text-xl font-medium text-forest">What kind of brand are you?</h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(["Fashion", "Food", "Services"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setValue("persona", p, { shouldValidate: true })}
                      className={cn(
                        "rounded-xl border p-4 text-left transition-all",
                        persona === p
                          ? "border-terracotta bg-terracotta/5 ring-2 ring-terracotta/30"
                          : "border-forest/10 hover:border-forest/25"
                      )}
                    >
                      <p className="font-serif text-lg font-medium text-forest">{p}</p>
                    </button>
                  ))}
                </div>
                {errors.persona && <p className="text-xs text-terracotta">{errors.persona.message}</p>}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-4">
                <h2 className="font-serif text-xl font-medium text-forest">How much space do you need?</h2>
                <div className="grid gap-3">
                  {spaceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setValue("spaceSize", opt.value, { shouldValidate: true })}
                      className={cn(
                        "flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all",
                        spaceSize === opt.value
                          ? "border-terracotta bg-terracotta/5 ring-2 ring-terracotta/30"
                          : "border-forest/10 hover:border-forest/25"
                      )}
                    >
                      <div>
                        <p className="font-medium text-forest">{opt.label}</p>
                        <p className="text-xs text-ink-muted">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-4">
                <h2 className="font-serif text-xl font-medium text-forest">How can we reach you?</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Name</label>
                    <input {...register("name")} className="mt-1.5 w-full rounded-xl border border-forest/15 bg-sand/40 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
                    {errors.name && <p className="mt-1 text-xs text-terracotta">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Email</label>
                    <input type="email" {...register("email")} className="mt-1.5 w-full rounded-xl border border-forest/15 bg-sand/40 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
                    {errors.email && <p className="mt-1 text-xs text-terracotta">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Phone</label>
                    <input {...register("phone")} className="mt-1.5 w-full rounded-xl border border-forest/15 bg-sand/40 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
                    {errors.phone && <p className="mt-1 text-xs text-terracotta">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Company</label>
                    <input {...register("company")} className="mt-1.5 w-full rounded-xl border border-forest/15 bg-sand/40 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Message</label>
                  <textarea {...register("message")} rows={3} className="mt-1.5 w-full rounded-xl border border-forest/15 bg-sand/40 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 resize-y" />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-4">
                <h2 className="font-serif text-xl font-medium text-forest">Supporting documents</h2>
                <p className="text-sm text-ink-muted">Optional — floor plans, concept deck or company profile.</p>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                  className="rounded-xl border-2 border-dashed border-forest/20 bg-sand/30 p-8 text-center hover:border-terracotta/40 transition-colors"
                >
                  <Upload className="mx-auto h-8 w-8 text-ink-muted" />
                  <p className="mt-3 text-sm text-forest">Drop a file or browse</p>
                  <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) simulateUpload(f);
                    }}
                  />
                  <Button type="button" variant="outline" size="sm" className="mt-4 rounded-full" onClick={() => inputRef.current?.click()}>
                    Choose file
                  </Button>
                  {file && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-forest">
                      <FileText className="h-4 w-4" />
                      {file.name}
                      <button type="button" className="rounded-full p-1.5 text-ink-muted hover:bg-forest/10" onClick={() => { setFile(null); setUploadProgress(0); }}>
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                  {(uploading || uploadProgress > 0) && file && (
                    <div className="mt-2 mx-auto h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-forest/10">
                      <div className="h-full rounded-full bg-terracotta transition-all duration-200" style={{ width: `${Math.min(uploadProgress, 100)}%` }} />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-full gap-1.5"
              disabled={step === 1}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            {step < 4 ? (
              <Button
                type="button"
                variant="terracotta"
                className="rounded-full gap-1.5 btn-lift"
                onClick={() => setStep((s) => Math.min(4, s + 1))}
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" variant="terracotta" className="rounded-full gap-1.5 btn-lift">
                Submit enquiry <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
