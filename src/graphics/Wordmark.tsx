import React from 'react';
import Svg, { Path, Polygon } from 'react-native-svg';
import { colors } from '../theme';

/**
 * ZIVO wordmark redrawn as vector geometry from the deck cover (viewBox 1554 × 368),
 * so it renders identically on every platform without depending on a font file.
 * Swap with the official SVG when available.
 */
const VB_W = 1554;
const VB_H = 368;

export function Wordmark({ width = 120, color = colors.white }: { width?: number; color?: string }) {
  const height = (width * VB_H) / VB_W;
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${VB_W} ${VB_H}`} accessibilityLabel="Zivo">
      {/* Z */}
      <Polygon fill={color} points="0,6 320,6 320,61 73,307 320,307 320,363 0,363 0,307 247,61 0,61" />
      {/* I */}
      <Polygon fill={color} points="412,6 731,6 731,61 600,61 600,307 731,307 731,363 412,363 412,307 543,307 543,61 412,61" />
      {/* V */}
      <Polygon fill={color} points="789,6 851,6 977,296 1104,6 1165,6 1015,363 939,363" />
      {/* O */}
      <Path
        fill={color}
        fillRule="evenodd"
        d="M1368 0 C1471 0 1554 83 1554 184 C1554 285 1471 368 1368 368 C1265 368 1182 285 1182 184 C1182 83 1265 0 1368 0 Z M1368 55 C1295 55 1241 112 1241 184 C1241 256 1295 313 1368 313 C1441 313 1495 256 1495 184 C1495 112 1441 55 1368 55 Z"
      />
    </Svg>
  );
}
