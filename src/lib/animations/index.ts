/**
 * Main animation initializer
 * Coordinates all GSAP animations across the portfolio
 */

import type { GSAPInstance, ScrollTriggerInstance } from "./types";
import { initSectionHeadingAnimations } from "./hero";
import { initJobAnimations, initFooterAnimations } from "./content";

/**
 * Initialize all GSAP animations
 * Skipped entirely in simple mode (Effects: Off), which is also the default
 * under prefers-reduced-motion (WCAG 2.3.3). Nothing is hidden, so nothing
 * needs restoring.
 */
export function initAllAnimations(
  gsap: GSAPInstance,
  ScrollTrigger: ScrollTriggerInstance,
): void {
  if (document.documentElement.dataset.simpleMode === "on") return;

  initSectionHeadingAnimations(gsap, ScrollTrigger);

  // Content animations
  initJobAnimations(gsap, ScrollTrigger);
  initFooterAnimations(gsap, ScrollTrigger);
}

// Re-export types for convenience
export type { GSAPInstance, ScrollTriggerInstance } from "./types";
