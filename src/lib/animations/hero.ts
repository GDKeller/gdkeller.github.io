/**
 * Hero section animations
 */

import type { GSAPInstance, ScrollTriggerInstance } from "./types";
import { fadeUp, fadeInFromSide } from "./utils";

export function initHeroAnimations(
  gsap: GSAPInstance,
  _ScrollTrigger: ScrollTriggerInstance,
): void {
  // Hero name - immediate subtle fade up
  const heroName = document.querySelector(".hero__name");
  if (heroName) {
    fadeUp(gsap, heroName, {
      duration: 0.8,
      delay: 0,
      y: 15,
    });
  }

  // Hero subtitle - immediate fade from left
  const heroSubtitle = document.querySelector(".hero__text p");
  if (heroSubtitle) {
    fadeInFromSide(gsap, heroSubtitle, {
      duration: 0.8,
      delay: 0,
      x: 20,
    });
  }

  // Hero list items - immediate staggered fade up
  const heroListItems = document.querySelectorAll(".hero__text li");
  if (heroListItems.length > 0) {
    fadeUp(gsap, heroListItems, {
      duration: 0.6,
      delay: 0,
      stagger: 0.06,
      y: 12,
    });
  }

  // SkillBadges - immediate fade in
  const heroSkillBadges = document.querySelectorAll(".hero__text .pill");
  if (heroSkillBadges.length > 0) {
    fadeUp(gsap, heroSkillBadges, {
      duration: 0.5,
      delay: 0,
      stagger: 0.03,
      y: 8,
    });
  }
}

export function initHeaderAnimations(
  gsap: GSAPInstance,
  _ScrollTrigger: ScrollTriggerInstance,
): void {
  const header = document.querySelector(".animate__header");
  if (header) {
    gsap.set(header, { yPercent: 30, opacity: 0 });
    gsap.to(header, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power1.out",
      delay: 0.8,
    });
  }
}

export function initSectionHeadingAnimations(
  gsap: GSAPInstance,
  ScrollTrigger: ScrollTriggerInstance,
): void {
  const sectionHeadings = document.querySelectorAll("h2");
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
