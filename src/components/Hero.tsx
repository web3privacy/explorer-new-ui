import Image from "next/image";

export function Hero() {
  return (
    <div className="relative w-full bg-black overflow-hidden rounded-lg mb-8">
      {/* Background Image */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        <Image
          src="/explorer-hero - copia.png"
          alt="Web3 Privacy Dashboard Eye"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Your Guide to Privacy in Web3
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                Discover tools, protocols, and projects protecting digital
                freedom
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
