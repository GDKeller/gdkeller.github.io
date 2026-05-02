/**
 * Main animation initializer
 * Coordinates all GSAP animations across the portfolio
 */

import type { GSAPInstance, ScrollTriggerInstance } from "./types";
import { prefersReducedMotion, showAllElementsImmediately } from "./utils";
import { initSectionHeadingAnimations } from "./hero";
import { initJobAnimations, initFooterAnimations } from "./content";

/**
 * Initialize all GSAP animations
 * Respects user's motion preferences for accessibility
 */
export function initAllAnimations(
  gsap: GSAPInstance,
  ScrollTrigger: ScrollTriggerInstance,
): void {
  // Respect user's motion preferences (WCAG 2.3.3)
  if (prefersReducedMotion()) {
    showAllElementsImmediately();
    return;
  }

  initSectionHeadingAnimations(gsap, ScrollTrigger);

  // Content animations
  initJobAnimations(gsap, ScrollTrigger);
  initFooterAnimations(gsap, ScrollTrigger);
}

// Re-export types for convenience
export type { GSAPInstance, ScrollTriggerInstance } from "./types";
