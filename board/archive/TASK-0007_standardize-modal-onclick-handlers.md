---
type: task
status: done
priority: 2
created: 2026-03-27
---

# Standardize modal onclick handlers

**Source:** Audit H7

## What to do

Two different patterns are used to open the contact modal:

- `onclick="hire_me_modal.showModal()"` (Header.astro:103) — relies on implicit global ID-to-variable mapping
- `onclick="document.getElementById('hire_me_modal').showModal()"` (Footer.astro:16) — explicit lookup

Standardize on `document.getElementById('hire_me_modal').showModal()` everywhere, or better yet, add a small `<script>` with event delegation to avoid inline handlers entirely (helps with CSP).

## Files

- `src/components/Header.astro`
- `src/components/Footer.astro`
