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
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 text-center text-brand-950">
        <h1 className="text-7xl md:text-8xl lg:text-9xl">Welcome</h1>
        <Button href="/menu" variant="dark" size="lg">
          Menu
        </Button>
      </div>
    </main>
  );
}
