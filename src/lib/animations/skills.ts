/**
 * Skills section animations
 */

import type { GSAPInstance, ScrollTriggerInstance } from "./types";

export function initSkillsAnimations(
  gsap: GSAPInstance,
  ScrollTrigger: ScrollTriggerInstance,
): void {
  const skillsSection = document.querySelector("#skills");
  if (!skillsSection) return;

  // "Tools of the Trade" heading
  const toolsHeading = skillsSection.querySelector("p.font-decorative");
  if (toolsHeading) {
    gsap.set(toolsHeading, { y: 30, opacity: 0 });

    ScrollTrigger.create({
      trigger: toolsHeading,
      start: "top 100%",
      onEnter: () => {
        gsap.to(toolsHeading, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power1.out",
        });
      },
      once: true,
    });
  }
}
