/**
 * Zivo design tokens — extracted from "ZIVO — Design review 10.08.26".
 * Colour ratio in the brand system: Ink 50% · White 25% · Off-white 20% · Red 5%.
 * Red is an ACCENT only: it marks "the company" (one red node per composition).
 */
import { Platform } from 'react-native';

export const colors = {
  ink: '#1A1A1A', // primary: backgrounds, type, contrast
  white: '#FFFFFF', // paper, screens, clean fields
  offwhite: '#F1F1EA', // secondary background: warmth and pause
  red: '#F43F4C', // accent
  // neutrals derived from Ink/Off-white for hairlines and secondary text
  gray600: '#6B6B66',
  gray400: '#9A9A93',
  line: '#D8D8D0', // hairline on light
  lineDark: '#3A3A38', // hairline on dark
  muted: '#B8B8B0', // secondary text on dark
};

/**
 * Typeface mapping — only the two brand families are used:
 *   ABC Arizona Flare → display / headlines     ABC Arizona Sans → body / UI
 * Files: assets/fonts/*.otf, registered in src/fonts.ts.
 */
export const fonts = {
  flare: 'ArizonaFlare', // Regular
  flareLight: 'ArizonaFlareLight', // Light
  sans: 'ArizonaSans',
};

/** Flare switches to its Light cut for any text LARGER than this size (px). 24px itself stays Regular. */
export const FLARE_LIGHT_ABOVE = 24;

export const fallback = Platform.select({
  web: {
    flare: `${fonts.flare}, 'ABC Arizona Flare', Georgia, serif`,
    flareLight: `${fonts.flareLight}, 'ABC Arizona Flare Light', ${fonts.flare}, Georgia, serif`,
    sans: `${fonts.sans}, 'ABC Arizona Sans', system-ui, sans-serif`,
  },
  default: fonts,
})!;

// Breakpoints (px)
export const bp = { tablet: 768, desktop: 1100, wide: 1440 };

// Spacing scale (4pt base)
export const space = (n: number) => n * 4;

// Hairline width — the deck structures everything with 1px rules
export const HAIR = 1;

/** Font family for Flare text at a given size: Light above FLARE_LIGHT_ABOVE, Regular at or below it. */
export const flareFor = (fontSize: number): string => (fontSize > FLARE_LIGHT_ABOVE ? fallback.flareLight : fallback.flare);
