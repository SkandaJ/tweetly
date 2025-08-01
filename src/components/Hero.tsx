"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { FlipWord } from "../components/ui/flip-words";

export function Hero() {
  const words = ["thoughts", "ideas", "stories", "updates", "rants"];
  return (
    <>
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          Transform your {" "}
          <Highlight className="text-black dark:text-white">
            <FlipWord words={words} />
          </Highlight>
          {" "} into clear, concise, and impactful tweets.
        </motion.h1>
      </HeroHighlight>
      <footer className="w-full py-6 text-center text-sm text-neutral-600 dark:text-neutral-400 bg-white dark:bg-black">
        © {new Date().getFullYear()} Tweetly. All rights reserved.
      </footer>
    </>
  );
}
