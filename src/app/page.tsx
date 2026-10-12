import Image from "next/image";
import Navbar from "@/components/Navbar";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="relative h-dvh w-full overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Customers enjoying coffee in a sunlit cafe"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center] md:object-center"
      />
      <Navbar overlay />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10 text-center text-brand-950">
        {/* One heading in two lines: a small greeting, then the shop name as the big text */}
        <h1 className="flex flex-col items-center gap-1 md:gap-2">
          <span className="font-sans text-3xl font-semibold md:text-5xl lg:text-6xl">Welcome to</span>
          <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">SLO Drip</span>
        </h1>
        <Button href="/menu" variant="dark" size="lg">
          Menu
        </Button>
      </div>
    </main>
  );
}
