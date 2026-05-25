'use client';

import { useEffect, useRef } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";

export function TextGenerateEffect({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
          filter: "blur(0px)",
        },
        {
          duration: 0.5,
          delay: stagger(0.1),
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0 filter blur-[8px] inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div ref={ref} className={className}>
      {renderWords()}
    </div>
  );
}
