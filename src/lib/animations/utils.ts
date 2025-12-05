/**
 * Shared animation utility functions
 */

import type { GSAPInstance, GSAPTarget, FadeUpOptions, FadeInFromSideOptions } from './types';

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Show all animated elements immediately (for reduced motion preference)
 */
export function showAllElementsImmediately(): void {
  const allAnimatedElements = document.querySelectorAll(
    '.hero__name, .hero__text p, .hero__text li, .hero__text .pill, h2, ' +
    '.skill-item, .project-card, .job-card, .stat, .browser, .sticky, ' +
    '.fish-hero__image, img, p, footer, .relative.z-0.pt-64'
  );

  allAnimatedElements.forEach(el => {
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'none';
  });
}

/**
 * Subtle fade up animation
 */
export function fadeUp(
  gsap: GSAPInstance,
  elements: GSAPTarget,
  options: FadeUpOptions = {}
): void {
  const defaults: Required<FadeUpOptions> = {
    duration: 0.8,
    ease: 'power1.out',
    y: 20,
    opacity: 0,
    stagger: 0.1,
    delay: 0
  };

  const config = { ...defaults, ...options };

  gsap.set(elements, { y: config.y, opacity: config.opacity });
  gsap.to(elements, {
    y: 0,
    opacity: 1,
    duration: config.duration,
    ease: config.ease,
    stagger: config.stagger,
    delay: config.delay
  });
}

/**
 * Subtle fade in from side animation
 */
export function fadeInFromSide(
  gsap: GSAPInstance,
  elements: GSAPTarget,
  options: FadeInFromSideOptions = {}
): void {
  const defaults: Required<FadeInFromSideOptions> = {
    duration: 0.8,
    ease: 'power1.out',
    x: 30,
    opacity: 0,
    stagger: 0.08,
    delay: 0
  };

  const config = { ...defaults, ...options };

  gsap.set(elements, { x: config.x, opacity: config.opacity });
  gsap.to(elements, {
    x: 0,
    opacity: 1,
    duration: config.duration,
    ease: config.ease,
    stagger: config.stagger,
    delay: config.delay
  });
}
