"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/tweet-input"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { GoogleGenAI } from "@google/genai";
import { useState } from "react"
import { LoaderFive } from "@/components/ui/loader"
import { GridBackground } from "@/components/ui/background"

function Ideas() {

    const [inputValue, setInputValue] = useState("");
    const [tweet, setTweet] = useState("");
    const [loading, setLoading] = useState(false);

    const placeholders = [
        "Describe the topic — AI will spark the tweet idea.",
        "What's on your mind? Let's turn it into a scroll-stopper.",
        "Give a theme or thought — we’ll craft the hook.",
        "Write a few words — we’ll generate the viral starter.",
        "Start with a rough idea, we’ll sharpen it into gold.",
    ];


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setTweet("");
        const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
        async function main() {
            const template = process.env.NEXT_PUBLIC_AI_IDEA_INPUT || "";
            const prompt = template.replace("{input}", inputValue);
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

            const output = response.text;
            setTweet(output ?? "No response");
            setLoading(false);
        }

        main();
    };
    return (
        <>
            <GridBackground>
                <div className="h-[49rem] flex flex-col justify-center  items-center px-4">
                    <h2 className="mt-40 mb-10 text-xl text-center sm:text-5xl dark:text-black text-black">
                        Need Ideas? Start with These Hooks
                    </h2>
                    <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={handleChange}
                        onSubmit={onSubmit}
                    />
                    {
                        loading ? (
                            <div className="mt-12">
                                <LoaderFive text="Generating ideas..." />
                            </div>
                        ) :
                            tweet && (
                                <div className="mt-8 max-w-2xl text-left bg-white/5 p-6 rounded-xl shadow-2xl space-y-2">
                                    {tweet
                                        .split(/\d+\./)
                                        .filter(Boolean)
                                        .map((point, idx) => (
                                            <div key={idx}>
                                                <TypewriterEffectSmooth
                                                    key={idx}
                                                    words={(idx + 1 + ". " + point.trim()).split(" ").map((word) => ({ text: word }))}
                                                />
                                            </div>
                                        ))}
                                </div>

                            )
                    }
                </div>
                <footer className="-mb-16 w-full py-6 text-center text-sm text-neutral-600 dark:text-neutral-400 bg-white dark:bg-black">
                    © {new Date().getFullYear()} Tweetly. All rights reserved.
                </footer>
            </GridBackground>
        </>
    );
}

export default Ideas;
