import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';
import { colors } from '../theme';

/**
 * "Paths become a system." — a field of modular Z-glyphs. Every cell is four square points
 * with a random subset of the six possible connections; exactly one cell is the red Z.
 * Cells quietly reconfigure over time ("never the same").
 */
type Cell = boolean[]; // [top, bottom, left, right, diag \, diag /]

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const Z_CELL: Cell = [true, true, false, false, false, true];

function rollCell(rand: () => number): Cell {
  let c: Cell;
  do {
    c = Array.from({ length: 6 }, () => rand() < 0.32);
  } while (!c.some(Boolean) || JSON.stringify(c) === JSON.stringify(Z_CELL));
  return c;
}

export function GlyphField({ width, cell = 56, rows = 6, tone = 'dark', animate = true, seed = 7, opacity = 1 }: { width: number; cell?: number; rows?: number; tone?: 'dark' | 'light'; animate?: boolean; seed?: number; opacity?: number }) {
  const cols = Math.max(4, Math.floor(width / cell));
  const redIndex = useMemo(() => Math.floor(rows / 2) * cols + Math.floor(cols * 0.38), [rows, cols]);
  const build = () => {
    const rand = mulberry32(seed);
    return Array.from({ length: cols * rows }, (_, i) => (i === redIndex ? Z_CELL : rollCell(rand)));
  };
  const [cells, setCells] = useState<Cell[]>(build);
  useEffect(() => setCells(build()), [cols, rows, seed]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!animate) return;
    const rand = mulberry32(seed + 99);
    const id = setInterval(() => {
      setCells((prev) => {
        const next = prev.slice();
        for (let k = 0; k < 2; k++) {
          const i = Math.floor(rand() * next.length);
          if (i !== redIndex) next[i] = rollCell(rand);
        }
        return next;
      });
    }, 700);
    return () => clearInterval(id);
  }, [animate, seed, redIndex]);

  const ink = tone === 'dark' ? colors.white : colors.ink;
  const g = cell * 0.46; // glyph box
  const n = Math.max(3, cell * 0.085); // node size
  const w = cols * cell;
  const h = rows * cell;

  return (
    <View style={{ width: w, height: h, opacity }} pointerEvents="none">
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {cells.map((c, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x0 = col * cell + (cell - g) / 2;
          const y0 = row * cell + (cell - g) / 2;
          const x1 = x0 + g;
          const y1 = y0 + g;
          const isRed = i === redIndex;
          const stroke = isRed ? colors.red : ink;
          const L = (a: number, b: number, c2: number, d: number, k: string) => (
            <Line key={k} x1={a} y1={b} x2={c2} y2={d} stroke={stroke} strokeWidth={isRed ? 1.6 : 1.2} />
          );
          return (
            <React.Fragment key={i}>
              {c[0] && L(x0, y0, x1, y0, 't')}
              {c[1] && L(x0, y1, x1, y1, 'b')}
              {c[2] && L(x0, y0, x0, y1, 'l')}
              {c[3] && L(x1, y0, x1, y1, 'r')}
              {c[4] && L(x0, y0, x1, y1, 'd1')}
              {c[5] && L(x1, y0, x0, y1, 'd2')}
              {[[x0, y0], [x1, y0], [x0, y1], [x1, y1]].map(([px, py], k) => (
                <Rect key={k} x={px - n / 2} y={py - n / 2} width={n} height={n} fill={stroke} />
              ))}
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}
