import React, { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { colors, fallback } from '../theme';
import { useLayout } from '../hooks/useBreakpoint';
import { useApp } from '../context';
import { Button, Hairline, Node, Txt } from '../components/ui';
import { Wordmark } from '../graphics/Wordmark';
import { Lang } from '../i18n/content';

/** Announcement strip (from the current site's "News" banner). */
export function Banner() {
  const { t } = useApp();
  const l = useLayout();
  return (
    <View style={{ backgroundColor: colors.offwhite, paddingVertical: 10, paddingHorizontal: l.gutter, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Node size={7} red />
      <Txt v="small" size={13} numberOfLines={l.isMobile ? 2 : 1} style={{ flexShrink: 1, textAlign: 'center' }}>
        <Text style={{ fontFamily: fallback.sans, textTransform: 'uppercase', letterSpacing: 0.9, fontSize: 11, color: colors.gray600 }}>{t.banner.tag}  </Text>
        {t.banner.text}
      </Txt>
    </View>
  );
}

function LangToggle() {
  const { lang, setLang } = useApp();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      {(['pt', 'en'] as Lang[]).map((k, i) => (
        <React.Fragment key={k}>
          {i > 0 && <View style={{ width: 1, height: 12, backgroundColor: colors.lineDark }} />}
          <Pressable onPress={() => setLang(k)} accessibilityRole="button" accessibilityLabel={k.toUpperCase()}>
            <Txt v="caption" tone="ink" size={11} muted={lang !== k}>{k}</Txt>
          </Pressable>
        </React.Fragment>
      ))}
    </View>
  );
}

function NavLink({ label, onPress }: { label: string; onPress: () => void }) {
  const [h, setH] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      // @ts-ignore web hover
      onHoverIn={() => setH(true)} onHoverOut={() => setH(false)}
      style={Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : undefined}
    >
      <Text style={{ color: h ? colors.red : colors.white, fontFamily: fallback.sans, fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}

export function Header() {
  const { t, scrollTo } = useApp();
  const l = useLayout();
  const [open, setOpen] = useState(false);
  const links: [string, string][] = [['solution', t.nav.solution], ['how', t.nav.how], ['experts', t.nav.experts], ['investors', t.nav.investors], ['faq', t.nav.faq]];
  const go = (id: string) => { setOpen(false); scrollTo(id); };

  return (
    <View style={{ backgroundColor: colors.ink, zIndex: 50 }}>
      <View style={{ height: l.pick(60, 68, 72), paddingHorizontal: l.gutter, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: l.maxWidth, alignSelf: 'center' }}>
        <Pressable onPress={() => go('top')} accessibilityRole="link" accessibilityLabel="Zivo" style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Wordmark width={l.pick(64, 76, 84)} color={colors.white} />
          <Node size={8} red />
        </Pressable>

        {l.isDesktop && (
          <View style={{ flexDirection: 'row', gap: 36 }}>
            {links.map(([id, label]) => <NavLink key={id} label={label} onPress={() => go(id)} />)}
          </View>
        )}

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: l.pick(16, 24, 28) }}>
          <LangToggle />
          {l.isDesktop ? (
            <Button tone="ink" label={t.nav.cta} href="https://comp.vc/schedule" style={{ height: 44, paddingHorizontal: 18, gap: 18 }} />
          ) : (
            <Pressable onPress={() => setOpen((o) => !o)} accessibilityRole="button" accessibilityLabel={t.nav.menu} style={{ height: 36, justifyContent: 'center' }}>
              <Txt v="caption" tone="ink" size={11}>{open ? t.nav.close : t.nav.menu}</Txt>
            </Pressable>
          )}
        </View>
      </View>
      <View style={{ paddingHorizontal: l.gutter }}><Hairline tone="ink" /></View>

      {open && !l.isDesktop && (
        <View style={{ backgroundColor: colors.ink, paddingHorizontal: l.gutter, paddingTop: 12, paddingBottom: 28, position: 'absolute', top: l.pick(61, 69), left: 0, right: 0, borderBottomWidth: 1, borderBottomColor: colors.lineDark }}>
          {links.map(([id, label]) => (
            <Pressable key={id} onPress={() => go(id)} style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.lineDark, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Txt v="title" tone="ink" size={26}>{label}</Txt>
              <Txt v="body" tone="ink" muted>→</Txt>
            </Pressable>
          ))}
          <View style={{ marginTop: 24 }}>
            <Button tone="ink" label={t.nav.cta} href="https://comp.vc/schedule" style={{ alignSelf: 'stretch' }} />
          </View>
        </View>
      )}
    </View>
  );
}
