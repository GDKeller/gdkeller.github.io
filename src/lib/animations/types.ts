/**
 * Type definitions for GSAP animations
 */

export interface GSAPInstance {
  version: string;
  set: (targets: GSAPTarget, vars: GSAPVars) => void;
  to: (targets: GSAPTarget, vars: GSAPTweenVars) => GSAPTween;
  registerPlugin: (...plugins: unknown[]) => void;
}

export interface ScrollTriggerInstance {
  create: (vars: ScrollTriggerVars) => ScrollTriggerObject;
}

export interface ScrollTriggerObject {
  kill: () => void;
}

export type GSAPTarget = string | Element | Element[] | NodeListOf<Element> | null;

export interface GSAPVars {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  rotate?: number;
  rotateX?: number;
  xPercent?: number;
  yPercent?: number;
  repeat?: number;
  yoyo?: boolean;
}

export interface GSAPTweenVars extends GSAPVars {
  duration?: number;
  ease?: string;
  stagger?: number;
  delay?: number;
  scrollTrigger?: ScrollTriggerVars;
}

export interface ScrollTriggerVars {
  trigger?: GSAPTarget;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  onEnter?: () => void;
  once?: boolean;
}

export interface GSAPTween {
  kill: () => void;
}

export interface FadeUpOptions {
  duration?: number;
  ease?: string;
  y?: number;
  opacity?: number;
  stagger?: number;
  delay?: number;
}

export interface FadeInFromSideOptions {
  duration?: number;
  ease?: string;
  x?: number;
  opacity?: number;
  stagger?: number;
  delay?: number;
}
