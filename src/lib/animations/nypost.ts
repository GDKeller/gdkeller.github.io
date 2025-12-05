/**
 * NY Post section animations
 */

import type { GSAPInstance, ScrollTriggerInstance } from './types';

export function initNypostAnimations(
  gsap: GSAPInstance,
  ScrollTrigger: ScrollTriggerInstance
): void {
  const nypostSection = document.querySelector('.color__nyp-red--dark');
  if (!nypostSection) return;

  // Statistics dramatic reveal
  const stats = nypostSection.querySelectorAll('.stat');
  stats.forEach((stat, index) => {
    gsap.set(stat, { scale: 0.8, opacity: 0 });

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 100%',
      onEnter: () => {
        gsap.to(stat, {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power1.out',
          delay: index * 0.2
        });
      },
      once: true
    });
  });

  // Browser mockup reveal
  const browser = nypostSection.querySelector('.browser');
  if (browser) {
    gsap.set(browser, { y: 40, opacity: 0, rotateX: 10 });

    ScrollTrigger.create({
      trigger: browser,
      start: 'top 100%',
      onEnter: () => {
        gsap.to(browser, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.4,
          ease: 'power1.out'
        });
      },
      once: true
    });
  }

  // NY Post logo reveal
  const nypostLogo = nypostSection.querySelector('svg, .color__nyp-red');
  if (nypostLogo) {
    gsap.set(nypostLogo, { x: -30, opacity: 0 });

    ScrollTrigger.create({
      trigger: nypostLogo,
      start: 'top 100%',
      onEnter: () => {
        gsap.to(nypostLogo, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power1.out',
          delay: 0.3
        });
      },
      once: true
    });
  }

  // Content text sections
  const contentSections = nypostSection.querySelectorAll('.content-box p, .content-box ul');
  contentSections.forEach((section, index) => {
    gsap.set(section, { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 100%',
      onEnter: () => {
        gsap.to(section, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power1.out',
          delay: index * 0.1
        });
      },
      once: true
    });
  });

  // Statue of Liberty image
  const statueImage = nypostSection.querySelector('.image__statueofliberty img');
  if (statueImage) {
    gsap.set(statueImage, { x: 50, opacity: 0 });

    ScrollTrigger.create({
      trigger: statueImage,
      start: 'top 100%',
      onEnter: () => {
        gsap.to(statueImage, {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power1.out',
          delay: 0.5
        });
      },
      once: true
    });
  }
}
