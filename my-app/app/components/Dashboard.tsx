import React from "react";
import { motion } from "framer-motion";

// 1. Added interface to handle the onBack prop
interface DashboardProps {
  onBack: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const Section = ({
  children,
  id,
  title,
}: {
  children: React.ReactNode;
  id: string;
  title?: string;
}) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeUp}
    className="py-24 border-t border-zinc-900/50"
  >
    {title && (
      <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-12">
        {title}
      </h2>
    )}
    {children}
  </motion.section>
);

const Badge = ({ text }: { text: string }) => (
  <span className="px-2.5 py-1 text-xs font-mono border border-zinc-800 text-zinc-400 rounded-sm bg-zinc-900/30 uppercase tracking-wider">
    {text}
  </span>
);

// 2. Destructured onBack from props
export default function Dashboard({ onBack }: DashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-6 md:px-12"
    >
      {/* Back button added to satisfy the onBack prop */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 text-xs font-mono text-zinc-500 hover:text-emerald-500 transition-colors uppercase tracking-widest"
      >
        &lt;- Back to Menu
      </button>

      <section className="pt-40 pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Available for new opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-3xl leading-tight"
          >
            Hi, I'm Mukul.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-zinc-500 max-w-2xl font-light leading-relaxed"
          >
            I architect fault-tolerant distributed systems and design
            high-throughput backend infrastructure.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-8">
            <a
              href="#philosophy"
              className="px-6 py-3 bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors"
            >
              Explore Architecture
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              className="px-6 py-3 border border-zinc-800 text-white font-medium text-sm hover:bg-zinc-900 transition-colors"
            >
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Section id="telemetry" title="Algorithmic Baselines">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "LeetCode", value: "Guardian", sub: "Top 0.18% (AIR 2)" },
            { label: "Codeforces", value: "1974", sub: "Candidate Master" },
            { label: "CodeChef", value: "2066", sub: "5 Star (AIR 1)" },
            { label: "ICPC", value: "AIR 52", sub: "Regionalist (2022)" },
          ].map((metric, idx) => (
            <div
              key={idx}
              className="p-6 border border-zinc-800/60 bg-zinc-900/20 hover:border-zinc-700 transition-colors"
            >
              <div className="text-xs font-mono text-zinc-500 mb-2">
                {metric.label}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-zinc-400">{metric.sub}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="philosophy" title="System Design Principles">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border border-zinc-800/60 bg-zinc-900/10 hover:border-zinc-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-3">
              Event-Driven Decoupling
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Designing systems where state and compute are isolated. Utilizing
              Kafka and asynchronous pipelines to ensure high throughput without
              blocking critical transactional threads.
            </p>
          </div>
          <div className="p-8 border border-zinc-800/60 bg-zinc-900/10 hover:border-zinc-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-3">
              Resiliency & Idempotency
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Building for failure. Implementing circuit breakers, localized
              failure domains, and strict Compare-And-Swap (CAS) versioning to
              prevent stale overwrites and cascading outages.
            </p>
          </div>
          <div className="p-8 border border-zinc-800/60 bg-zinc-900/10 hover:border-zinc-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-3">
              Algorithmic Optimization
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Moving beyond vertical scaling by addressing core algorithmic
              bottlenecks. Replacing linear O(N) operations with logarithmic
              architectures like Quadtrees and tiered write-through caching.
            </p>
          </div>
        </div>
      </Section>

      <Section id="experience" title="Professional Deployments">
        <div className="space-y-8">
          <div className="p-8 border border-zinc-800/60 bg-zinc-900/10">
            <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-6 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Member Tech</h3>
                <div className="text-zinc-500 mt-1">D.E. Shaw & Co.</div>
              </div>
              <div className="text-sm font-mono text-zinc-500">
                July 2024 - Present
              </div>
            </div>
            <ul className="space-y-4 text-zinc-400 leading-relaxed text-sm">
              <li className="flex gap-4">
                <span className="text-zinc-600">—</span> Upgraded a legacy Trade
                Management pipeline from scheduled batches to an event-driven
                workflow, implementing partial-success processing and
                file-versioning CAS checks to prevent stale-data overwrites.
              </li>
              <li className="flex gap-4">
                <span className="text-zinc-600">—</span> Engineered an
                asynchronous, event-driven trade processing pipeline using Kafka
                and Python; implemented the claim-check pattern and idempotency
                guards to process $1B-$2B in quarterly volume with zero
                duplicate bookings.
              </li>
              <li className="flex gap-4">
                <span className="text-zinc-600">—</span> Optimized
                high-frequency market data pipelines by eliminating N+1 query
                bottlenecks through vectorized batch fetching and a 3-tier
                write-through cache, reducing latency from 27m to 1m 26s.
              </li>
              <li className="flex gap-4">
                <span className="text-zinc-600">—</span> Enhanced backend
                reliability by implementing custom Circuit Breaker logic and
                failure-domain isolation, preventing cascading outages during
                vendor API failures.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="projects" title="Core Infrastructure Studies">
        <div className="space-y-8">
          <div className="p-8 border border-zinc-800/60 bg-zinc-900/10 hover:border-zinc-700 transition-colors group">
            <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-4">
              <h3 className="text-2xl font-bold text-white">
                Nexus Orchestrator
              </h3>
              <a
                href="https://github.com/MukulRawat-Official/Nexus-Orchestrator"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-mono text-zinc-500 hover:text-white mt-2 md:mt-0 transition-colors"
              >
                View Source -&gt;
              </a>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge text="Node.js" />
              <Badge text="Java" />
              <Badge text="Redis" />
              <Badge text="Distributed Tasks" />
            </div>
            <ul className="space-y-4 text-zinc-400 leading-relaxed text-sm">
              <li className="flex gap-4">
                <span className="text-zinc-600">—</span> Engineered a
                high-throughput multi-process task engine capable of
                orchestrating 10M+ background jobs using a decoupled
                architecture to separate task ingestion from compute processing.
              </li>
              <li className="flex gap-4">
                <span className="text-zinc-600">—</span> Architected a real-time
                hardware telemetry stack utilizing the Systeminformation API and
                Socket.io to broadcast per-core CPU topology, RAM, and GPU
                utilization sparklines with sub-second latency.
              </li>
              <li className="flex gap-4">
                <span className="text-zinc-600">—</span> Implemented stateful
                ingestion controls via Redis flags, enabling independent pause,
                resume, and forceful termination of producer/consumer streams
                without data corruption or loss of state.
              </li>
            </ul>
          </div>

          <div className="p-8 border border-zinc-800/60 bg-zinc-900/10 hover:border-zinc-700 transition-colors group">
            <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-4">
              <h3 className="text-2xl font-bold text-white">GeoNexus</h3>
              <a
                href="https://github.com/MukulRawat-Official/GeoNexus"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-mono text-zinc-500 hover:text-white mt-2 md:mt-0 transition-colors"
              >
                View Source -&gt;
              </a>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge text="JavaScript" />
              <Badge text="Quadtrees" />
              <Badge text="Geohashing" />
            </div>
            <ul className="space-y-4 text-zinc-400 leading-relaxed text-sm">
              <li className="flex gap-4">
                <span className="text-zinc-600">—</span> Architected an
                in-memory spatial indexer using Quadtree-based partitioning,
                optimizing proximity search complexity from linear O(N) to
                logarithmic O(log N).
              </li>
              <li className="flex gap-4">
                <span className="text-zinc-600">—</span> Engineered a
                deterministic diagnostic suite with a simulation freeze mode,
                allowing for step-by-step analysis of spatial search paths and
                successive refinement logic.
              </li>
              <li className="flex gap-4">
                <span className="text-zinc-600">—</span> Implemented visual
                tethers and target-locking UI elements to provide real-time
                feedback for concurrent spatial queries.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <footer className="py-12 border-t border-zinc-900/50 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-zinc-500 text-sm font-mono">
          Mukul Rawat © {new Date().getFullYear()}
        </div>
        <div className="flex gap-8">
          <a
            href="mailto:mukulrawat24032001@gmail.com"
            className="text-sm text-zinc-500 hover:text-white transition-colors font-mono uppercase tracking-widest"
          >
            Email
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-zinc-500 hover:text-white transition-colors font-mono uppercase tracking-widest"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/MukulRawat-Official"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-zinc-500 hover:text-white transition-colors font-mono uppercase tracking-widest"
          >
            GitHub
          </a>
        </div>
      </footer>
    </motion.div>
  );
}
