import { CommandCenter } from "@/components/sections/CommandCenter";
import { Hero } from "@/components/sections/Hero";
import { Platform } from "@/components/sections/Platform";
import { Problem } from "@/components/sections/Problem";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Problem />
      <Platform />
      <CommandCenter />
    </main>
  );
}
