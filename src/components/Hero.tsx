"use client";

import { Component } from "@/components/ui/etheral-shadow";
import SearchInput from "@/components/ui/search-input";
import Image from "next/image";

export function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects-section");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 overflow-hidden w-full">
      {/* Ethereal Shadow Background */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Component
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      {/* Explorer Image Background */}
      <div className="absolute -right-32 -bottom-32 w-[600px] h-[600px] opacity-30 -z-5">
        <Image
          src="/explorer-icon.png"
          alt="Privacy Explorer Background"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Explorer Image Background - Left */}
      <div className="hidden lg:block absolute -left-32 -bottom-32 w-[600px] h-[600px] opacity-30 -z-5">
        <Image
          src="/community-removebg.png"
          alt="Privacy Explorer Background Left"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 max-w-2xl space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium font-dm-mono tracking-widest">
          Your Guide to Privacy in Web3
        </h1>
        <p
          className="font-dm-mono font-medium text-muted-foreground"
          style={{
            lineHeight: "60px",
            letterSpacing: "20%",
          }}
        >
          Discover tools, protocols, and projects protecting digital freedom
        </p>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-4">
        <SearchInput />

        <button
          onClick={scrollToProjects}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
        >
          I&apos;ll just browse
        </button>
      </div>
    </section>
  );
}
