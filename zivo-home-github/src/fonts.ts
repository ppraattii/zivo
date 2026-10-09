import { useFonts } from 'expo-font';
import { fonts } from './theme';

/**
 * Brand fonts (ABC Dinamo). Files live in /assets/fonts.
 *  - ABC Arizona Flare  → display, headlines, titles. Light cut for text > 24px, Regular for ≤ 24px (see flareFor in theme.ts)
 *  - ABC Arizona Sans   → body, UI, captions
 * ABC Arizona Serif Bold is bundled in the folder but not used by the homepage.
 */
export function useBrandFonts() {
  return useFonts({
    [fonts.flare]: require('../assets/fonts/ABCArizonaFlare-Regular.otf'),
    [fonts.flareLight]: require('../assets/fonts/ABCArizonaFlare-Light.otf'),
    [fonts.sans]: require('../assets/fonts/ABCArizonaSans-Regular.otf'),
  });
}
