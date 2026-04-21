/**
 * Hero section animations
 */

import type { GSAPInstance, ScrollTriggerInstance } from "./types";

export function initSectionHeadingAnimations(
  gsap: GSAPInstance,
  ScrollTrigger: ScrollTriggerInstance,
): void {
  const sectionHeadings = document.querySelectorAll(".section-heading");
  sectionHeadings.forEach((heading) => {
    gsap.set(heading, { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: heading,
      start: "top 85%",
      onEnter: () => {
        gsap.to(heading, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.out",
        });
      },
      once: true,
    });
  });
}
