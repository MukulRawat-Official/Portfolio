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

  // Transitions the slides after 3.5 seconds
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
              className="text-2xl md:text-5xl font-bold tracking-[0.2em] mb-12 break-words"
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
              className="text-3xl md:text-6xl font-bold tracking-[0.1em] break-words flex items-center flex-wrap"
            >
              MUKUL RAWAT
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                  ease: "circInOut",
                }}
                className="ml-2 md:ml-3 w-[6px] md:w-1 h-[0.7em] bg-emerald-500 inline-block"
              />
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
              className="text-xl md:text-4xl font-bold tracking-[0.1em] mb-12 break-words"
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
              className="text-xl md:text-4xl font-bold tracking-[0.1em] break-words flex items-center flex-wrap"
            >
              DE Shaw & Co
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                  ease: "circInOut",
                }}
                className="ml-2 md:ml-3 w-[6px] md:w-1 h-[0.7em] bg-emerald-500 inline-block"
              />
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
