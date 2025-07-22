"use client";

import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";

export const TypewriterEffectSmooth = ({
  words,
  className,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const [copied, setCopied] = useState(false);

  const combinedText = words.map((w) => w.text).join(" ");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(combinedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  useEffect(() => {
    animate(
      "span",
      { opacity: 1 },
      { delay: stagger(0.05), duration: 0.3, ease: "easeInOut" }
    );
  }, []);

  const renderWords = () => (
    <div ref={scope} className="text-left">
      {words.map((word, idx) => (
        <span key={`word-${idx}`} className="inline-block mr-1">
          {word.text.split("").map((char, i) => (
            <motion.span
              key={`char-${idx}-${i}`}
              initial={{ opacity: 0 }}
              className="text-black dark:text-white"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("text-m font-medium text-center", className)}>
      <div className="relative block px-4 py-4 border border-gray-300 bg-white dark:bg-zinc-900 dark:border-zinc-700 rounded-md shadow-sm leading-tight max-w-[90vw]">
        {renderWords()}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          title="Copy text"
        >
          <Copy className="w-4 h-4 text-gray-500 dark:text-gray-300" />
        </button>
        {copied && (
          <span className="absolute top-2 left-2 text-xs text-green-600 dark:text-green-400">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
};
