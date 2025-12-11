/**
 * Anglerfish scrollytelling animations
 */

import type { GSAPInstance, ScrollTriggerInstance } from "./types";

export function initAnglerfishAnimations(
  gsap: GSAPInstance,
  ScrollTrigger: ScrollTriggerInstance,
): void {
  const fishHero = document.querySelector(".fish-hero");
  const fishEl = document.querySelector(".fish");
  if (!fishHero) return;

  // Anglerfish image parallax
  const fishImage = fishHero.querySelector(".fish-hero__image");
  if (fishImage) {
    gsap.set(fishImage, { yPercent: 25, opacity: 1 });
    gsap.to(fishImage, {
      yPercent: -20,
      opacity: 1,
      ease: "sine.out",
      scrollTrigger: {
        trigger: fishHero,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  // Fish ball floating animation enhancement
  const fishBall = fishHero.querySelector(".animation-fishball");
  if (fishBall && fishEl) {
    gsap.set(fishBall, { yPercent: -300, xPercent: -50 });
    gsap.to(fishBall, {
      yPercent: 400,
      xPercent: 80,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: fishEl,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  // Fish ball rotation (respects reduced motion preference)
  const fishBallImage = fishHero.querySelector(".fish-hero__ball");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (fishBallImage && !prefersReducedMotion) {
    gsap.to(fishBallImage, {
      rotate: 360,
      ease: "none",
      duration: 8,
      repeat: -1,
    });
  }

  // Museum logo reveal
  const museumLogo = fishHero.querySelector(".nhmla-logo");
  if (museumLogo) {
    gsap.set(museumLogo, { yPercent: 20 });
    gsap.to(museumLogo, {
      opacity: 1,
      yPercent: -20,
      ease: "power1.out",
      scrollTrigger: {
        trigger: museumLogo,
        start: "top 95%",
        scrub: 1,
      },
    });
  }

  // Anglerfish title dramatic reveal
  const fishTitle = fishHero.querySelector("#fish-monster");
  if (fishTitle) {
    gsap.set(fishTitle, { y: 30, opacity: 0 });
    ScrollTrigger.create({
      trigger: fishTitle,
      start: "top 95%",
      onEnter: () => {
        gsap.to(fishTitle, {
          y: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power1.out",
        });
      },
      once: true,
    });
  }

  // Water background subtle movement
  const waterElements = fishHero.querySelectorAll(".fish-hero__water, .fish-hero__water-blurred");
  waterElements.forEach((water) => {
    gsap.to(water, {
      yPercent: 5,
      ease: "none",
      scrollTrigger: {
        trigger: fishHero,
        start: "top bottom",
        end: "bottom top",
        scrub: 3,
      },
    });
  });

  // Story paragraphs sequential reveal
  const storyParagraphs = fishHero.querySelectorAll(".fish-hero__container p");
  storyParagraphs.forEach((paragraph, index) => {
    gsap.set(paragraph, { y: 25, opacity: 0 });

    ScrollTrigger.create({
      trigger: paragraph,
      start: "top 100%",
      onEnter: () => {
        gsap.to(paragraph, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power1.out",
          delay: index * 0.1,
        });
      },
      once: true,
    });
  });

  // Display images staggered reveal
  const displayImages = fishHero.querySelectorAll(
    'img[alt*="Anglerfish display"], img[alt*="Anglerfish specimen"]',
  );
  displayImages.forEach((image, index) => {
    gsap.set(image, { y: 30, opacity: 0, scale: 0.95 });

    ScrollTrigger.create({
      trigger: image,
      start: "top 100%",
      onEnter: () => {
        gsap.to(image, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power1.out",
          delay: index * 0.15,
        });
      },
      once: true,
    });
  });

  // Final specimen image dramatic reveal
  const specimenImage = fishHero.querySelector('img[alt="Anglerfish specimen"]');
  if (specimenImage) {
    gsap.set(specimenImage, { y: 40, opacity: 0, scale: 0.9 });

    ScrollTrigger.create({
      trigger: specimenImage,
      start: "top 100%",
      onEnter: () => {
        gsap.to(specimenImage, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power1.out",
        });
      },
      once: true,
    });
  }

  // Content sections fade in as user scrolls
  const contentSections = fishHero.querySelectorAll(".flex.flex-col.items-center.justify-center");
  contentSections.forEach((section) => {
    gsap.set(section, { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: section,
      start: "top 100%",
      onEnter: () => {
        gsap.to(section, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power1.out",
        });
      },
      once: true,
    });
  });
}
