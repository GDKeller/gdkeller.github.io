/**
 * Main animation initializer
 * Coordinates all GSAP animations across the portfolio
 */

import type { GSAPInstance, ScrollTriggerInstance } from './types';
import { prefersReducedMotion, showAllElementsImmediately } from './utils';
import { initHeroAnimations, initHeaderAnimations, initSectionHeadingAnimations } from './hero';
import { initSkillsAnimations } from './skills';
import { initAnglerfishAnimations } from './anglerfish';
import { initNypostAnimations } from './nypost';
import {
  initProjectAnimations,
  initJobAnimations,
  initFooterAnimations,
  initInteractiveAnimations,
  initBackgroundAnimations
} from './content';

/**
 * Initialize all GSAP animations
 * Respects user's motion preferences for accessibility
 */
export function initAllAnimations(
  gsap: GSAPInstance,
  ScrollTrigger: ScrollTriggerInstance
): void {
  // Respect user's motion preferences (WCAG 2.3.3)
  if (prefersReducedMotion()) {
    showAllElementsImmediately();
    return;
  }

  // Hero and header animations (immediate)
  initHeroAnimations(gsap, ScrollTrigger);
  initHeaderAnimations(gsap, ScrollTrigger);
  initSectionHeadingAnimations(gsap, ScrollTrigger);

  // Section-specific animations (scroll-triggered)
  initSkillsAnimations(gsap, ScrollTrigger);
  initAnglerfishAnimations(gsap, ScrollTrigger);
  initNypostAnimations(gsap, ScrollTrigger);

  // Content animations
  initProjectAnimations(gsap, ScrollTrigger);
  initJobAnimations(gsap, ScrollTrigger);
  initFooterAnimations(gsap, ScrollTrigger);

  // Interactive and background effects
  initInteractiveAnimations(gsap);
  initBackgroundAnimations(gsap);
}

// Re-export types for convenience
export type { GSAPInstance, ScrollTriggerInstance } from './types';
