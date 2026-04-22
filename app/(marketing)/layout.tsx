import { ReactNode } from "react";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <ScrollProgress />
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
    </LenisProvider>
  );
}
