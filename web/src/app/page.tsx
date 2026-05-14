import Image from "next/image";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { SkillsTree } from "@/components/SkillsTree";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Timeline } from "@/components/Timeline";
import { LatestBlog } from "@/components/LatestBlog";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HomeContentBackdrop>
          <AboutSection />
          <SkillsTree />
          <FeaturedProjects />
          <Timeline />
          <LatestBlog />
          <Contact />
        </HomeContentBackdrop>
      </main>
      <Footer />
    </>
  );
}

function HomeContentBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden bg-[var(--color-ink-950)]">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          aria-hidden
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 34% at 22% 6%, rgba(24,72,62,.34), transparent 68%), radial-gradient(ellipse 52% 26% at 77% 30%, rgba(38,61,45,.26), transparent 70%), radial-gradient(ellipse 74% 34% at 45% 64%, rgba(13,52,45,.24), transparent 74%), url('/assets/lydt/texture/texture-ink-green-noise.png')",
            backgroundSize: "auto, auto, auto, 520px 520px",
            backgroundRepeat: "no-repeat, no-repeat, no-repeat, repeat",
            backgroundBlendMode: "screen, screen, screen, soft-light",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-[620px] opacity-[0.16] mix-blend-screen">
          <Image
            src="/assets/lydt/bg/bg-home-hero-tree-sanctuary-desktop.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center saturate-[.8]"
          />
        </div>

        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[460px] bg-gradient-to-b from-[rgba(7,23,20,0)] via-[rgba(7,23,20,.44)] to-[rgba(7,23,20,0)]"
        />

        <Image
          src="/assets/lydt/scene/fog-layer-01.png"
          alt=""
          width={2400}
          height={800}
          sizes="100vw"
          className="absolute left-0 top-[260px] h-[420px] w-full object-cover opacity-[0.14] mix-blend-screen"
        />
        <Image
          src="/assets/lydt/scene/fog-layer-03.png"
          alt=""
          width={2400}
          height={800}
          sizes="100vw"
          className="absolute left-0 top-[1260px] h-[520px] w-full object-cover opacity-[0.12] mix-blend-screen"
        />
        <Image
          src="/assets/lydt/texture/texture-tree-ring-subtle.png"
          alt=""
          width={1254}
          height={1254}
          className="absolute left-1/2 top-[1460px] w-[900px] max-w-none -translate-x-1/2 opacity-[0.08] mix-blend-screen"
        />
        <Image
          src="/assets/lydt/scene/tree-root-foreground-left.png"
          alt=""
          width={900}
          height={1200}
          className="absolute -left-44 top-[420px] w-[560px] max-w-none opacity-[0.13]"
        />
        <Image
          src="/assets/lydt/scene/tree-root-foreground-right.png"
          alt=""
          width={900}
          height={1200}
          className="absolute -right-48 top-[640px] w-[600px] max-w-none opacity-[0.12]"
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
