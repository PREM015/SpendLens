'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function BackgroundBeams() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
      <div className="absolute inset-0 bg-white dark:bg-black/10 backdrop-blur-[1px]" />
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
        className="absolute h-px w-1/2 top-1/4 bg-gradient-to-r from-transparent via-violet-500 to-transparent"
      />
      <motion.div
        animate={{
          x: ["100%", "-100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear",
        }}
        className="absolute h-px w-1/2 top-2/4 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
      />
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="absolute h-px w-1/2 top-3/4 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"
      />
    </div>
  );
}
