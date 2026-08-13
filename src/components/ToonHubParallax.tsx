import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ParallaxSectionProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function ToonHubParallax({ children, className, strength = 34 }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const reveal = section.querySelector<HTMLElement>("[data-fizzi-reveal]") ?? section;
      gsap.set(reveal, { willChange: "transform, opacity" });
      gsap.fromTo(
        reveal,
        { y: strength, opacity: 0.72, rotateX: -1.2, transformPerspective: 900 },
        {
          y: -strength * 0.45,
          opacity: 1,
          rotateX: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.25,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [strength] },
  );

  return <div ref={sectionRef} className={className}><div data-fizzi-reveal>{children}</div></div>;
}
