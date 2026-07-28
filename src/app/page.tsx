"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight, Layers, Shield, Zap } from "lucide-react";

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const pulseRingVariants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: [1, 1.3, 1],
    opacity: [0.5, 0, 0.5],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

// ---------------------------------------------------------------------------
// Feature Badges
// ---------------------------------------------------------------------------

const features = [
  { icon: Layers, label: "Modular Architecture" },
  { icon: Shield, label: "Role-Based Access" },
  { icon: Zap, label: "Real-Time Ready" },
];

// ---------------------------------------------------------------------------
// Home Page
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex max-w-2xl flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo mark */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Activity className="h-10 w-10 text-primary" strokeWidth={1.5} />
            {/* Pulse rings */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-primary/20"
              variants={pulseRingVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div
              className="absolute -inset-2 rounded-3xl border border-primary/10"
              variants={pulseRingVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.8 }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          <span className="gradient-text">PulseOS</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mt-3 text-lg text-muted-foreground sm:text-xl"
        >
          The Operating System for Connected Care
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="mt-8 h-px w-24 bg-border"
        />

        {/* Status badge */}
        <motion.div variants={itemVariants} className="mt-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Foundation Ready
          </span>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg border border-border/50 bg-card px-3 py-2 text-sm text-muted-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground"
        >
          A clean, scalable frontend foundation built with Next.js 15, React 19,
          TypeScript, Tailwind CSS, and shadcn/ui. Ready to be extended with
          feature modules.
        </motion.p>

        {/* CTA placeholder */}
        <motion.div variants={itemVariants} className="mt-8">
          <button className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]">
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-6 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        PulseOS v0.1.0 · Foundation Build
      </motion.footer>
    </main>
  );
}
