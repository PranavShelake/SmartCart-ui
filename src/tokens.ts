/**
 * Smart Cart – Design Tokens
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for ALL design values.
 *
 * Usage:
 *   • Tailwind config imports `colors`, `spacing`, `borderRadius`, `fontFamily`, `fontSize`
 *   • Components use Tailwind utility classes (e.g. `bg-primary`, `text-on-surface`)
 *   • For inline styles or JS logic, import from this file directly
 *
 * Convention:
 *   • Color names follow Material You naming (surface, on-surface, primary, etc.)
 *   • Typography keys map directly to Tailwind `fontSize` / `fontFamily` keys
 * ─────────────────────────────────────────────────────────────
 */

// ─── Colors ──────────────────────────────────────────────────

export const colors = {
  // Surfaces (dark navy scale)
  surface:                    "#0b1326",
  "surface-dim":              "#0b1326",
  "surface-bright":           "#31394d",
  "surface-container-lowest": "#060e20",
  "surface-container-low":    "#131b2e",
  "surface-container":        "#171f33",
  "surface-container-high":   "#222a3d",
  "surface-container-highest":"#2d3449",
  "surface-variant":          "#2d3449",
  "surface-tint":             "#d0bcff",

  // On-surface (text/icon colors)
  "on-surface":         "#dae2fd",
  "on-surface-variant": "#cbc3d7",
  "inverse-surface":    "#dae2fd",
  "inverse-on-surface": "#283044",

  // Outlines / borders
  outline:          "#958ea0",
  "outline-variant": "#494454",

  // Primary – Electric Purple
  primary:              "#d0bcff",
  "on-primary":         "#3c0091",
  "primary-container":  "#a078ff",
  "on-primary-container":"#340080",
  "inverse-primary":    "#6d3bd7",
  "primary-fixed":      "#e9ddff",
  "primary-fixed-dim":  "#d0bcff",
  "on-primary-fixed":   "#23005c",
  "on-primary-fixed-variant": "#5516be",

  // Secondary – Tech Blue
  secondary:              "#89ceff",
  "on-secondary":         "#00344d",
  "secondary-container":  "#00a2e6",
  "on-secondary-container":"#00344e",
  "secondary-fixed":      "#c9e6ff",
  "secondary-fixed-dim":  "#89ceff",
  "on-secondary-fixed":   "#001e2f",
  "on-secondary-fixed-variant": "#004c6e",

  // Tertiary – Teal (success / badges)
  tertiary:              "#3cddc7",
  "on-tertiary":         "#003731",
  "tertiary-container":  "#00a392",
  "on-tertiary-container":"#00302a",
  "tertiary-fixed":      "#62fae3",
  "tertiary-fixed-dim":  "#3cddc7",
  "on-tertiary-fixed":   "#00201c",
  "on-tertiary-fixed-variant": "#005047",

  // Error / destructive
  error:              "#ffb4ab",
  "on-error":         "#690005",
  "error-container":  "#93000a",
  "on-error-container":"#ffdad6",

  // Background (same as surface for this palette)
  background:    "#0b1326",
  "on-background":"#dae2fd",
} as const;

export type ColorToken = keyof typeof colors;

// ─── Spacing ─────────────────────────────────────────────────

export const spacing = {
  xs:  "4px",
  sm:  "12px",
  base:"8px",
  md:  "24px",
  lg:  "48px",
  xl:  "80px",
  gutter: "24px",
  "container-max": "1440px",
} as const;

// ─── Border Radius ───────────────────────────────────────────

export const borderRadius = {
  sm:      "0.25rem",  // 4px
  DEFAULT: "0.5rem",   // 8px
  md:      "0.75rem",  // 12px
  lg:      "1rem",     // 16px
  xl:      "1.5rem",   // 24px
  "2xl":   "2rem",     // 32px  (cards, panels)
  full:    "9999px",   // pills / circles
} as const;

// ─── Typography ──────────────────────────────────────────────

/**
 * fontFamily: consumed by Tailwind's `fontFamily` extension.
 * Each key becomes a Tailwind class, e.g. `font-display`.
 */
export const fontFamily = {
  display: ["Space Grotesk", "sans-serif"],
  body:    ["Inter", "sans-serif"],
} as const;

/**
 * fontSize: consumed by Tailwind's `fontSize` extension.
 * Format: [size, { lineHeight, fontWeight, letterSpacing? }]
 */
export const fontSize = {
  "display-xl": ["64px", { lineHeight: "1.1",  fontWeight: "700", letterSpacing: "-0.02em" }],
  "headline-lg":["32px", { lineHeight: "1.2",  fontWeight: "600" }],
  "headline-md":["24px", { lineHeight: "1.3",  fontWeight: "600" }],
  "body-lg":    ["18px", { lineHeight: "1.6",  fontWeight: "400" }],
  "body-md":    ["16px", { lineHeight: "1.5",  fontWeight: "400" }],
  "label-md":   ["14px", { lineHeight: "1.2",  fontWeight: "500" }],
  "label-sm":   ["12px", { lineHeight: "1.2",  fontWeight: "500" }],
  "price-lg":   ["28px", { lineHeight: "1",    fontWeight: "700", letterSpacing: "-0.01em" }],
} as const;

// ─── Glassmorphism helpers (use in CSS-in-JS / style props) ──

export const glass = {
  /** Standard card surface */
  card: {
    background: "rgba(30, 41, 59, 0.7)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.10)",
  },
  /** Elevated modal / popover surface */
  elevated: {
    background: "rgba(51, 65, 85, 0.8)",
    backdropFilter: "blur(32px)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
  },
  /** Subtle nav / top-bar surface */
  nav: {
    background: "rgba(11, 19, 38, 0.80)",
    backdropFilter: "blur(24px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
} as const;

// ─── Gradient helpers ─────────────────────────────────────────

export const gradients = {
  /** Primary CTA – purple → blue */
  primary: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
  /** Subtle card accent glow */
  purpleGlow: "radial-gradient(ellipse at top-left, rgba(139,92,246,0.15) 0%, transparent 70%)",
  /** Chart bar fill */
  barPurple: "linear-gradient(to top, rgba(124,58,237,0.4), #a78bfa)",
  barBlue:   "linear-gradient(to top, rgba(59,130,246,0.4), #60a5fa)",
} as const;