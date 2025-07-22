"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="relative z-50">
      <div
        className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
      >
        <Menu setActive={setActive}>
          <HoveredLink href="/">Home</HoveredLink>

          <MenuItem setActive={setActive} active={active} item="Tweet">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/tweet">Generate a Tweet</HoveredLink>
              <HoveredLink href="/ideas">Generate Ideas</HoveredLink>
            </div>
          </MenuItem>

          <HoveredLink href="/" onClick={(e: { preventDefault: () => any; }) => e.preventDefault()} style={{ pointerEvents: 'none', opacity: 0.5 }}>
            Pricing
          </HoveredLink>
        </Menu>
      </div>

      <div
        className={cn(
          "fixed top-[calc(100px-3rem)] inset-x-0 max-w-2xl mx-auto z-40",
          "scale-y-[-1] opacity-20 blur-sm pointer-events-none"
        )}
      >
        <Menu setActive={() => { }}>
          <HoveredLink href="/">Home</HoveredLink>

          <MenuItem setActive={() => { }} active={null} item="Tweet">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/tweet">Generate a Tweet</HoveredLink>
              <HoveredLink href="/ideas">Generate Ideas</HoveredLink>
            </div>
          </MenuItem>

          <HoveredLink href="/" onClick={(e: { preventDefault: () => any; }) => e.preventDefault()} style={{ pointerEvents: 'none', opacity: 0.5 }}>
            Pricing
          </HoveredLink>

        </Menu>
      </div>
    </div>

  )
}

export default Navbar
