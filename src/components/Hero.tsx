"use client";

import SearchInput from "@/components/ui/search-input";

export function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects-section");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 px-4">
      {/* Full Width Noise Background */}
      <div
        className="absolute inset-0 bg-gray-800 opacity-50 -mx-4 left-1/2 transform -translate-x-1/2 w-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-2xl space-y-4">
        <div className="font-mono text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[10px] leading-none">
          <pre className="whitespace-pre overflow-hidden">
            {`██╗   ██╗ ██████╗ ██╗   ██╗██████╗     ██████╗ ██╗   ██╗██╗██████╗ ███████╗
╚██╗ ██╔╝██╔═══██╗██║   ██║██╔══██╗    ██╔════╝ ██║   ██║██║██╔══██╗██╔════╝
 ╚████╔╝ ██║   ██║██║   ██║██████╔╝    ██║  ███╗██║   ██║██║██║  ██║█████╗  
  ╚██╔╝  ██║   ██║██║   ██║██╔══██╗    ██║   ██║██║   ██║██║██║  ██║██╔══╝  
   ██║   ╚██████╔╝╚██████╔╝██║  ██║    ╚██████╔╝╚██████╔╝██║██████╔╝███████╗
   ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝     ╚═════╝  ╚═════╝ ╚═╝╚═════╝ ╚══════╝

████████╗ ██████╗     ██████╗ ██████╗ ██╗██╗   ██╗ █████╗  ██████╗██╗   ██╗
╚══██╔══╝██╔═══██╗    ██╔══██╗██╔══██╗██║██║   ██║██╔══██╗██╔════╝╚██╗ ██╔╝
   ██║   ██║   ██║    ██████╔╝██████╔╝██║██║   ██║███████║██║      ╚████╔╝ 
   ██║   ██║   ██║    ██╔═══╝ ██╔══██╗██║╚██╗ ██╔╝██╔══██║██║       ╚██╔╝  
   ██║   ╚██████╔╝    ██║     ██║  ██║██║ ╚████╔╝ ██║  ██║╚██████╗   ██║   
   ╚═╝    ╚═════╝     ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝ ╚═════╝   ╚═╝   

██╗███╗   ██╗    ██╗    ██╗███████╗██████╗ ██████╗ 
██║████╗  ██║    ██║    ██║██╔════╝██╔══██╗╚════██╗
██║██╔██╗ ██║    ██║ █╗ ██║█████╗  ██████╔╝ █████╔╝
██║██║╚██╗██║    ██║███╗██║██╔══╝  ██╔══██╗ ╚═══██╗
██║██║ ╚████║    ╚███╔███╔╝███████╗██████╔╝██████╔╝
╚═╝╚═╝  ╚═══╝     ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═════╝`}
          </pre>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground">
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
