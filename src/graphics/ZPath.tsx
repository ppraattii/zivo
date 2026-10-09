import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';
import { colors } from '../theme';

/**
 * The brand's core shape: four square points joined by a path that draws a Z.
 * One point is always red — it represents the company.
 */
const AnimatedLine = Animated.createAnimatedComponent(Line);

type Tone = 'dark' | 'light'; // tone of the BACKGROUND
const fg = (t: Tone) => (t === 'dark' ? colors.white : colors.ink);
const dim = (t: Tone) => (t === 'dark' ? colors.lineDark : colors.line);

function geometry(S: number, node: number) {
  const p = node; // padding so nodes stay inside the box
  const A = { x: p, y: p };
  const B = { x: S - p, y: p };
  const C = { x: p, y: S - p };
  const D = { x: S - p, y: S - p };
  return { nodes: [A, B, C, D], segs: [[A, B], [B, C], [C, D]] as const };
}

/** Static Z with an optional highlighted segment (0, 1, 2). */
export function ZPath({ size = 320, tone = 'light', active = null, stroke = 1.5, node = 14 }: { size?: number; tone?: Tone; active?: number | null; stroke?: number; node?: number }) {
  const { nodes, segs } = geometry(size, node);
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segs.map(([a, b], i) => (
        <Line
          key={i}
          x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          stroke={active === null || active === i ? fg(tone) : dim(tone)}
          strokeWidth={active === i ? stroke * 2 : stroke}
        />
      ))}
      {nodes.map((n, i) => (
        <Rect key={i} x={n.x - node / 2} y={n.y - node / 2} width={node} height={node} fill={i === 0 ? colors.red : fg(tone)} />
      ))}
    </Svg>
  );
}

/** Hero version: the path draws itself segment by segment, then loops. */
export function ZPathAnimated({ size = 420, tone = 'dark', stroke = 1.5, node = 16 }: { size?: number; tone?: Tone; stroke?: number; node?: number }) {
  const { nodes, segs } = geometry(size, node);
  const progress = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const draw = (v: Animated.Value) => Animated.timing(v, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.cubic), useNativeDriver: false });
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(500),
        draw(progress[0]),
        draw(progress[1]),
        draw(progress[2]),
        Animated.delay(2600),
        Animated.parallel(progress.map((v) => Animated.timing(v, { toValue: 0, duration: 500, useNativeDriver: false }))),
      ]),
    );
    const beat = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1400, easing: Easing.out(Easing.quad), useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: false }),
      ]),
    );
    loop.start();
    beat.start();
    return () => { loop.stop(); beat.stop(); };
  }, [progress, pulse]);

  const len = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(b.x - a.x, b.y - a.y);
  const halo = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 3.2] });
  const haloOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] });

  return (
    <View style={{ width: size, height: size }}>
      {/* red halo behind the company node */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute', left: nodes[0].x - node / 2, top: nodes[0].y - node / 2, width: node, height: node,
          backgroundColor: colors.red, opacity: haloOpacity, transform: [{ scale: halo }],
        }}
      />
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute' }}>
        {segs.map(([a, b], i) => {
          const L = len(a, b);
          return (
            <AnimatedLine
              key={i}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={fg(tone)} strokeWidth={stroke}
              strokeDasharray={[L, L]}
              strokeDashoffset={progress[i].interpolate({ inputRange: [0, 1], outputRange: [L, 0] })}
            />
          );
        })}
        {nodes.map((n, i) => (
          <Rect key={i} x={n.x - node / 2} y={n.y - node / 2} width={node} height={node} fill={i === 0 ? colors.red : fg(tone)} />
        ))}
      </Svg>
    </View>
  );
}
