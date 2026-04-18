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
  const toolsHeading = skillsSection.querySelector("p.font-blackletter");
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

  // Platform text ("at home on Mac, Linux & Windows")
  const platformText = skillsSection.querySelector(".divider");
  if (platformText?.parentElement) {
    gsap.set(platformText.parentElement, { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: platformText,
      start: "top 100%",
      onEnter: () => {
        gsap.to(platformText.parentElement, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.out",
          delay: 0.2,
        });
      },
      once: true,
    });
  }

  // Primary skill pills
  const primarySkills = skillsSection.querySelectorAll(".primary-skill");
  if (primarySkills.length > 0) {
    gsap.set(primarySkills, { y: 15, opacity: 0, scale: 0.9 });

    ScrollTrigger.create({
      trigger: ".primary-skills",
      start: "top 90%",
      onEnter: () => {
        gsap.to(primarySkills, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power1.out",
          delay: 0.2,
        });
      },
      once: true,
    });
  }

  // Secondary skill cards — animate on details open
  const detailsEl = skillsSection.querySelector(".secondary-skills-details");
  if (detailsEl) {
    let hasAnimated = false;
    detailsEl.addEventListener("toggle", () => {
      if ((detailsEl as HTMLDetailsElement).open && !hasAnimated) {
        hasAnimated = true;
        const skillItems = detailsEl.querySelectorAll(".skill-item");
        const skillLists = detailsEl.querySelectorAll(".skill-item ul li");

        gsap.set(skillItems, { y: 25, opacity: 0, scale: 0.95 });
        gsap.to(skillItems, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power1.out",
        });

        gsap.set(skillLists, { x: -10, opacity: 0 });
        gsap.to(skillLists, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.02,
          ease: "power1.out",
          delay: 0.4,
        });
      }
    });
  }
}
