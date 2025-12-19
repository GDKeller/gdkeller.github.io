/**
 * Content section animations (jobs, projects, footer)
 */

import type { GSAPInstance, ScrollTriggerInstance } from "./types";

export function initProjectAnimations(
  gsap: GSAPInstance,
  ScrollTrigger: ScrollTriggerInstance,
): void {
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    gsap.set(card, { y: 25, opacity: 0 });

    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power1.out",
          delay: index * 0.05,
        });
      },
      once: true,
    });
  });
}

export function initJobAnimations(gsap: GSAPInstance, ScrollTrigger: ScrollTriggerInstance): void {
  const jobCards = document.querySelectorAll(".job-card");
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
        });
      },
      once: true,
    });
  }
}

export function initInteractiveAnimations(gsap: GSAPInstance): void {
  // Subtle hover effects for interactive elements (buttons only)
  const interactiveElements = document.querySelectorAll(".btn");
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      gsap.to(element, {
        scale: 1.02,
        duration: 0.3,
        ease: "power1.out",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
      });
    });
  });
}

export function initBackgroundAnimations(gsap: GSAPInstance): void {
  // Very subtle parallax for background text
  const mainHeader = document.querySelector("#header__main");
  const heroContent = document.querySelectorAll("#hero__content");
  const hugeText = document.querySelector(".header__billboard");
  if (hugeText) {
    gsap.set(hugeText, { yPercent: 10 });
    gsap.to(hugeText, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: mainHeader,
        start: "bottom bottom",
        end: "top center",
        scrub: 1,
      },
    });
  }

  // Background image subtle parallax
  const bgImage = document.querySelector("#bg__main img");
  if (bgImage) {
    gsap.to(bgImage, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: "main",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }
}
