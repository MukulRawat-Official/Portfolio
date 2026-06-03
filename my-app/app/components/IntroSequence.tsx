"use client";
import { motion, AnimatePresence, Variants } from "framer-motion"; // 1. Import Variants
import { useState, useEffect } from "react";

// 2. Explicitly cast these objects as 'Variants'
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: -10 },
  // 3. Changed "circOut" to "easeOut" to ensure type compatibility
  show: { opacity: 1, x: 0, transition: { ease: "easeOut", duration: 0.6 } },
};

export default function IntroSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (slide === 0) setSlide(1);
      else onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [slide, onComplete]);

  return (
    <div className="min-h-screen bg-[#050505] text-emerald-500 flex flex-col items-center justify-center font-mono p-8">
      <AnimatePresence mode="wait">
        {slide === 0 ? (
          <motion.div
            key="slide1"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="text-left w-full max-w-lg border-l border-emerald-500/30 pl-8"
          >
            <motion.p
              variants={item}
              className="text-emerald-500/40 text-[10px] tracking-[0.3em] uppercase mb-1"
            >
              Status
            </motion.p>
            <motion.h1
              variants={item}
              className="text-3xl font-bold tracking-[0.2em] mb-8"
            >
              IDENTITY_VERIFIED.
            </motion.h1>

            <motion.p
              variants={item}
              className="text-emerald-500/40 text-[10px] tracking-[0.3em] uppercase mb-1"
            >
              User
            </motion.p>
            <motion.h1
              variants={item}
              className="text-4xl font-bold tracking-[0.1em]"
            >
              HELLO. I'M MUKUL.
            </motion.h1>
          </motion.div>
        ) : (
          <motion.div
            key="slide2"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="text-left w-full max-w-lg border-l border-emerald-500/30 pl-8"
          >
            <motion.p
              variants={item}
              className="text-emerald-500/40 text-[10px] tracking-[0.3em] uppercase mb-1"
            >
              Role_Designation
            </motion.p>
            <motion.h1
              variants={item}
              className="text-2xl font-bold tracking-[0.1em] mb-8"
            >
              SOFTWARE ENGINEER.
            </motion.h1>

            <motion.p
              variants={item}
              className="text-emerald-500/40 text-[10px] tracking-[0.3em] uppercase mb-1"
            >
              Organization
            </motion.p>
            <motion.h1
              variants={item}
              className="text-2xl font-bold tracking-[0.1em]"
            >
              @ D. E. SHAW.
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
