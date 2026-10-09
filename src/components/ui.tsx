import React, { useState } from 'react';
import { Image, ImageSourcePropType, Linking, Platform, Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';
import { colors, fallback, flareFor, HAIR } from '../theme';
import { useLayout } from '../hooks/useBreakpoint';
import { useApp } from '../context';

export type Tone = 'offwhite' | 'white' | 'ink';
const isDark = (t: Tone) => t === 'ink';
export const bgOf = (t: Tone) => (t === 'ink' ? colors.ink : t === 'white' ? colors.white : colors.offwhite);
export const fgOf = (t: Tone) => (isDark(t) ? colors.white : colors.ink);
export const subOf = (t: Tone) => (isDark(t) ? colors.muted : colors.gray600);
export const lineOf = (t: Tone) => (isDark(t) ? colors.lineDark : colors.line);

/* ───────── Typography (scale from the deck: Display 96/92 · Headline 48/54 · Body 20/28 · Caption 13/16) ───────── */
type Variant = 'display' | 'headline' | 'title' | 'body' | 'small' | 'caption';

export function Txt({
  v = 'body', tone = 'offwhite', style, children, size, numberOfLines, muted,
}: {
  v?: Variant; tone?: Tone; style?: TextStyle; children: React.ReactNode; size?: number; numberOfLines?: number; muted?: boolean;
}) {
  const l = useLayout();
  const color = muted ? subOf(tone) : fgOf(tone);
  const base: TextStyle = { color, margin: 0 };
  let s: TextStyle;
  switch (v) {
    case 'display': {
      const fs = size ?? l.pick(46, 72, 96);
      s = { fontFamily: flareFor(fs), fontSize: fs, lineHeight: Math.round(fs * 0.96), letterSpacing: -fs * 0.02 };
      break;
    }
    case 'headline': {
      const fs = size ?? l.pick(32, 42, 48);
      s = { fontFamily: flareFor(fs), fontSize: fs, lineHeight: Math.round(fs * 1.12), letterSpacing: -fs * 0.012 };
      break;
    }
    case 'title': {
      const fs = size ?? l.pick(24, 26, 28);
      s = { fontFamily: flareFor(fs), fontSize: fs, lineHeight: Math.round(fs * 1.18), letterSpacing: -fs * 0.005 };
      break;
    }
    case 'body': {
      const fs = size ?? l.pick(17, 19, 20);
      s = { fontFamily: fallback.sans, fontSize: fs, lineHeight: Math.round(fs * 1.4) };
      break;
    }
    case 'small':
      s = { fontFamily: fallback.sans, fontSize: size ?? 15, lineHeight: Math.round((size ?? 15) * 1.5) };
      break;
    case 'caption':
      s = { fontFamily: fallback.sans, fontSize: size ?? 12, lineHeight: 16, letterSpacing: 0.9, textTransform: 'uppercase' };
      break;
  }
  return (
    <Text numberOfLines={numberOfLines} style={[base, s, style]}>
      {children}
    </Text>
  );
}

/* ───────── Primitives ───────── */
export const Hairline = ({ tone = 'offwhite', style }: { tone?: Tone; style?: ViewStyle }) => (
  <View style={[{ height: HAIR, backgroundColor: lineOf(tone), alignSelf: 'stretch' }, style]} />
);

export const Node = ({ size = 12, red, tone = 'offwhite', style }: { size?: number; red?: boolean; tone?: Tone; style?: ViewStyle }) => (
  <View style={[{ width: size, height: size, backgroundColor: red ? colors.red : fgOf(tone) }, style]} />
);

export function Container({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const l = useLayout();
  return (
    <View style={[{ width: '100%', maxWidth: l.maxWidth, alignSelf: 'center', paddingHorizontal: l.gutter }, style]}>{children}</View>
  );
}

/** Full-bleed band. Registers its y-position so the nav can scroll to it. */
export function Section({ id, tone = 'offwhite', children, style, padTop, padBottom }: { id?: string; tone?: Tone; children: React.ReactNode; style?: ViewStyle; padTop?: number; padBottom?: number }) {
  const l = useLayout();
  const { registerSection } = useSectionRegistry();
  const vPad = l.pick(72, 112, 160);
  return (
    <View
      onLayout={(e) => id && registerSection(id, e.nativeEvent.layout.y)}
      style={[{ backgroundColor: bgOf(tone), paddingTop: padTop ?? vPad, paddingBottom: padBottom ?? vPad }, style]}
    >
      {children}
    </View>
  );
}

/* tiny registry so Section can report its y without prop-drilling */
const RegistryCtx = React.createContext<{ registerSection: (id: string, y: number) => void }>({ registerSection: () => {} });
export const SectionRegistryProvider = RegistryCtx.Provider;
const useSectionRegistry = () => React.useContext(RegistryCtx);

/** Deck-style header row: label · section · index, over a hairline. */
export function MetaBar({ index, label, tone = 'offwhite' }: { index: string; label: string; tone?: Tone }) {
  const l = useLayout();
  const { t } = useApp();
  return (
    <View style={{ marginBottom: l.pick(40, 56, 72) }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 14 }}>
        <View style={{ flex: 1 }}><Txt v="caption" tone={tone} size={11} muted>{t.meta.left}</Txt></View>
        <View style={{ flex: l.isTablet ? 1 : 2 }}><Txt v="caption" tone={tone} size={11}>{label}</Txt></View>
        <View style={{ alignItems: 'flex-end' }}><Txt v="caption" tone={tone} size={11} muted>{index}</Txt></View>
      </View>
      <Hairline tone={tone} />
    </View>
  );
}

/** Headline left / lead paragraph right, like the deck's slide headers. */
export function SectionHead({ title, sub, tone = 'offwhite', titleSize }: { title: string; sub?: string; tone?: Tone; titleSize?: number }) {
  const l = useLayout();
  return (
    <View style={{ flexDirection: l.isDesktop ? 'row' : 'column', gap: l.isDesktop ? 64 : 20, alignItems: 'flex-start' }}>
      <View style={{ flex: l.isDesktop ? 7 : undefined, maxWidth: l.isDesktop ? undefined : 760 }}>
        <Txt v="headline" tone={tone} size={titleSize}>{title}</Txt>
      </View>
      {sub ? (
        <View style={{ flex: l.isDesktop ? 5 : undefined, maxWidth: 560, paddingTop: l.isDesktop ? 10 : 0 }}>
          <Txt v="body" tone={tone} muted>{sub}</Txt>
        </View>
      ) : null}
    </View>
  );
}

/* ───────── Button ───────── */
export function Button({ label, onPress, tone = 'ink', href, style }: { label: string; onPress?: () => void; tone?: Tone; href?: string; style?: ViewStyle }) {
  const [hover, setHover] = useState(false);
  const onDark = isDark(tone);
  const bg = hover ? colors.red : onDark ? colors.white : colors.ink;
  const fg = hover ? colors.white : onDark ? colors.ink : colors.white;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => (href ? Linking.openURL(href) : onPress?.())}
      // @ts-ignore web-only hover events
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 28, height: 56, paddingHorizontal: 22, backgroundColor: bg, alignSelf: 'flex-start' }, Platform.OS === 'web' ? ({ transitionProperty: 'background-color', transitionDuration: '180ms', cursor: 'pointer' } as any) : null, style]}
    >
      <Text style={{ color: fg, fontFamily: fallback.sans, fontSize: 15, letterSpacing: 0.2 }}>{label}</Text>
      <Text style={{ color: fg, fontFamily: fallback.sans, fontSize: 18, transform: [{ translateX: hover ? 3 : 0 }] }}>→</Text>
    </Pressable>
  );
}

export function TextLink({ label, href, tone = 'offwhite' }: { label: string; href: string; tone?: Tone }) {
  const [hover, setHover] = useState(false);
  return (
    <Pressable
      accessibilityRole="link"
      onPress={() => Linking.openURL(href)}
      // @ts-ignore
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : undefined}
    >
      <Text style={{ color: hover ? colors.red : fgOf(tone), fontFamily: fallback.sans, fontSize: 15, lineHeight: 22 }}>{label}</Text>
    </Pressable>
  );
}

/* ───────── Image slot ─────────
 * Brand imagery is aerial photography: top-down, desaturated, people with long shadows.
 * Until real assets are dropped in, this renders a neutral placeholder; pass `source` to use a photo
 * (it is forced to grayscale on web to match the system).
 */
export function ImageSlot({ ratio = 4 / 5, label, tone = 'offwhite', source, style, labelAlign = 'left' }: { ratio?: number; label?: string; tone?: Tone; source?: ImageSourcePropType; style?: ViewStyle; labelAlign?: 'left' | 'right' }) {
  const dark = isDark(tone);
  return (
    <View style={[{ width: '100%', aspectRatio: ratio, backgroundColor: dark ? '#262624' : '#CFCFC8', overflow: 'hidden' }, style]}>
      {source ? (
        <Image source={source} resizeMode="cover" style={[{ width: '100%', height: '100%' }, Platform.OS === 'web' ? ({ filter: 'grayscale(1) contrast(1.05)' } as any) : null]} />
      ) : (
        <>
          {[{ left: 10, top: 10 }, { right: 10, top: 10 }, { left: 10, bottom: 10 }, { right: 10, bottom: 10 }].map((p, i) => (
            <View key={i} style={[{ position: 'absolute', width: 5, height: 5, backgroundColor: dark ? '#5a5a56' : '#A8A8A0' }, p as ViewStyle]} />
          ))}
          {label ? (
            <View style={{ position: 'absolute', left: 14, bottom: 14, right: 14, alignItems: labelAlign === 'right' ? 'flex-end' : 'flex-start' }}>
              <Txt v="caption" tone={tone} size={10} muted>{label}</Txt>
            </View>
          ) : null}
        </>
      )}
    </View>
  );
}
