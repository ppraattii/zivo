import { useWindowDimensions } from 'react-native';
import { bp } from '../theme';

export type Layout = {
  width: number;
  isMobile: boolean;
  isTablet: boolean; // tablet and up
  isDesktop: boolean; // desktop and up
  gutter: number;
  maxWidth: number;
  /** pick a value by breakpoint: m = mobile, t = tablet, d = desktop */
  pick: <T>(m: T, t: T, d?: T) => T;
};

export function useLayout(): Layout {
  const { width } = useWindowDimensions();
  const isTablet = width >= bp.tablet;
  const isDesktop = width >= bp.desktop;
  return {
    width,
    isMobile: !isTablet,
    isTablet,
    isDesktop,
    gutter: isDesktop ? 40 : isTablet ? 32 : 20,
    maxWidth: 1600,
    pick: (m, t, d) => (isDesktop ? (d ?? t) : isTablet ? t : m),
  };
}
