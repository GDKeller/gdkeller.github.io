/**
 * Content section animations (jobs, projects, footer)
 */

import type { GSAPInstance, ScrollTriggerInstance } from "./types";

export function initJobAnimations(
  gsap: GSAPInstance,
  ScrollTrigger: ScrollTriggerInstance,
): void {
  const jobCards = document.querySelectorAll(".entry-frame");
  jobCards.forEach((card, index) => {
    gsap.set(card, { y: 30, opacity: 0 });

    ScrollTrigger.create({
      trigger: card,
      start: "top 100%",
      onEnter: () => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power1.out",
          delay: index * 0.15,
          clearProps: "transform,opacity",
        });
      },
      once: true,
    });
  });
}

export function initFooterAnimations(
  gsap: GSAPInstance,
  ScrollTrigger: ScrollTriggerInstance,
): void {
  const footer = document.querySelector("footer, .relative.z-0.pt-64");
  if (footer) {
    gsap.set(footer, { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: footer,
      start: "top 100%",
      onEnter: () => {
        gsap.to(footer, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.out",
          clearProps: "transform,opacity",
        });
      },
      once: true,
    });
  }
}
