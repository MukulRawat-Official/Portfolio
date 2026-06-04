"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: -10 },
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
    <div className="min-h-screen bg-[#050505] text-emerald-500 flex flex-col items-center justify-center font-mono p-4 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {slide === 0 ? (
          <motion.div
            key="slide1"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="w-full max-w-sm md:max-w-2xl border-l border-emerald-500/30 pl-6 md:pl-12"
          >
            <motion.p
              variants={item}
              className="text-emerald-500/40 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-1"
            >
              Status
            </motion.p>
            <motion.h1
              variants={item}
              className="text-2xl md:text-5xl font-bold tracking-[0.2em] mb-8 break-words"
            >
              IDENTITY_VERIFIED
            </motion.h1>

            <motion.p
              variants={item}
              className="text-emerald-500/40 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-1"
            >
              User
            </motion.p>
            <motion.h1
              variants={item}
              className="text-3xl md:text-6xl font-bold tracking-[0.1em] break-words"
            >
              MUKUL RAWAT
            </motion.h1>
          </motion.div>
        ) : (
          <motion.div
            key="slide2"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="w-full max-w-sm md:max-w-2xl border-l border-emerald-500/30 pl-6 md:pl-12"
          >
            <motion.p
              variants={item}
              className="text-emerald-500/40 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-1"
            >
              Role_Designation
            </motion.p>
            <motion.h1
              variants={item}
              className="text-xl md:text-4xl font-bold tracking-[0.1em] mb-8 break-words"
            >
              SOFTWARE ENGINEER
            </motion.h1>

            <motion.p
              variants={item}
              className="text-emerald-500/40 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-1"
            >
              Organization
            </motion.p>
            <motion.h1
              variants={item}
              className="text-xl md:text-4xl font-bold tracking-[0.1em] break-words"
            >
              DE SHAW & Co
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
