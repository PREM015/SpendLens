'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const tools = [
  { name: 'Cursor', color: '#00e5a0' },
  { name: 'GitHub Copilot', color: '#6e40c9' },
  { name: 'Claude', color: '#d4a574' },
  { name: 'ChatGPT', color: '#10a37f' },
  { name: 'Windsurf', color: '#3b82f6' },
  { name: 'Gemini', color: '#4285f4' },
  { name: 'Anthropic API', color: '#d4a574' },
  { name: 'OpenAI API', color: '#10a37f' },
];

// Double the list for seamless looping
const marqueeTools = [...tools, ...tools];

export function ToolLogosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tools" ref={ref} className="relative py-28 sm:py-36 overflow-hidden">
      {/* Border lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-violet-400">
            Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Audit 8+ AI Tools
          </h2>
          <p className="text-zinc-600 dark:text-zinc-500 max-w-lg mx-auto">
            We support all major AI tools and APIs your team is using.
          </p>
        </motion.div>
      </div>

      {/* Infinite marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative"
      >
        {/* Deep Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white dark:from-black via-white/80 dark:via-black/80 to-transparent dark:to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white dark:from-black via-white/80 dark:via-black/80 to-transparent dark:to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden py-4">
          <div className="marquee-track flex shrink-0 gap-4">
            {marqueeTools.map((tool, i) => (
              <div
                key={`${tool.name}-${i}`}
                className="group flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-950/40 px-7 py-5 backdrop-blur-md transition-all duration-500 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-2xl shrink-0"
              >
                {/* Colored dot */}
                <div
                  className="h-3 w-3 rounded-full shrink-0 transition-shadow duration-300 group-hover:shadow-lg"
                  style={{
                    backgroundColor: tool.color,
                    boxShadow: `0 0 0 0 ${tool.color}00`,
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.boxShadow = `0 0 12px ${tool.color}60`;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.boxShadow = `0 0 0 0 ${tool.color}00`;
                  }}
                />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap group-hover:text-zinc-900 dark:group-hover:text-zinc-900 dark:text-white transition-colors duration-300">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
