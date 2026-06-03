"use client";
import React from "react";
import { motion } from "framer-motion";

export default function EntryGate({
  onSelect,
}: {
  onSelect: (path: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-[#050505] text-emerald-500 flex flex-col items-center justify-center p-8 font-mono"
    >
      <div className="max-w-lg w-full">
        <h2 className="text-emerald-500/50 text-sm tracking-[0.3em] mb-12 text-center uppercase">
          System Ready
        </h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => onSelect("dashboard")}
            className="group w-full border border-emerald-500/20 p-8 hover:border-emerald-500 transition-all duration-500 text-left"
          >
            <span className="text-emerald-500/50 text-[10px] tracking-widest block mb-2">
              01
            </span>
            <span className="text-2xl font-bold tracking-widest group-hover:text-white transition-colors">
              DASHBOARD
            </span>
          </button>

          <button
            onClick={() => onSelect("blackjack")}
            className="group w-full border border-emerald-500/20 p-8 hover:border-emerald-500 transition-all duration-500 text-left"
          >
            <span className="text-emerald-500/50 text-[10px] tracking-widest block mb-2">
              02
            </span>
            <span className="text-2xl font-bold tracking-widest group-hover:text-white transition-colors">
              BLACKJACK
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
