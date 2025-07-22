"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/tweet-input"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { GoogleGenAI } from "@google/genai";
import { useState } from "react"
import { LoaderFive } from "@/components/ui/loader"
import { GridBackground } from "@/components/ui/background"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";


function TweetInput() {

  const [inputValue, setInputValue] = useState("");
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const button = ["Funny", "Formal", "Inspirational", "Witty", "Casual"];

  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "hindi", label: "Hindi" },
    { value: "japanese", label: "Japanese" },
    { value: "chinese", label: "Chinese" },
    { value: "arabic", label: "Arabic" },
    { value: "russian", label: "Russian" },
    { value: "portuguese", label: "Portuguese" },
  ];


  const placeholders = [
    "Paste your paragraph here...",
    "Type something long. We'll make it tweet-sized.",
    "Enter your content to generate a tweet...",
    "Drop in your thoughts — AI will do the rest.",
    "Write freely. We'll distill it into 280 characters.",
  ];

  const handleClick = (text: string) => {
    setSelectedLabel(text);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTweet("");
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
    async function main() {
      const template = process.env.NEXT_PUBLIC_AI_TWEET_INPUT || "";
      const prompt = template
        .replace("{input}", inputValue)
        .replace("{tone}", selectedLabel)
        .replace("{language}", selectedLanguage);

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
          <h2 className="mb-10 mt-20 sm:mb-20 text-xl text-center sm:text-5xl dark:text-black text-black">
            {"Let's Make It Tweet-Worthy"}
          </h2>
          <div className="flex items-center gap-2 w-full max-w-2xl ">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {languages.find((lang) => lang.value === selectedLanguage)?.label || "Select Language"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select a Language</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  {languages.map((lang) => (
                    <DropdownMenuRadioItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-10 flex gap-3">
            {button.map((label, idx) => {
              const isSelected = selectedLabel === label;
              return (
                <button className="p-[3px] relative" key={idx} onClick={() => handleClick(label)}>
                  <div className={`absolute inset-0 rounded-lg ${isSelected ? "bg-gradient-to-r from-green-500 to-blue-500" : "bg-gradient-to-r from-indigo-500 to-purple-500"}`} />
                  <div className={`px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white ${isSelected ? "bg-transparent" : "hover:bg-transparent"}`}>
                    {label}
                  </div>
                </button>
              );
            })}
          </div>

          {
            loading ? (
              <div className="mt-12">
                <LoaderFive text="Generating tweet..." />
              </div>
            ) :
              tweet && (
                <div className="mt-8 max-w-2xl text-center">
                  <TypewriterEffectSmooth
                    key={tweet}
                    words={tweet.split(" ").map((word) => ({ text: word }))}
                  />
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

export default TweetInput;
