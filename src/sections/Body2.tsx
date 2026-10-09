import React, { useState } from 'react';
import { Linking, Platform, Pressable, View } from 'react-native';
import { colors } from '../theme';
import { useLayout } from '../hooks/useBreakpoint';
import { useApp } from '../context';
import { Button, Container, Hairline, ImageSlot, MetaBar, Node, Section, SectionHead, TextLink, Txt } from '../components/ui';
import { ZPath } from '../graphics/ZPath';
import { Wordmark } from '../graphics/Wordmark';
import { experts, investors, press } from '../i18n/content';

const initials = (n: string) => n.split(' ').map((p) => p[0]).slice(0, 2).join('');

/* ───────── 06 · Experts ───────── */
export function Experts() {
  const { t } = useApp();
  const l = useLayout();
  const cols = l.pick(2, 3, 4);
  const gap = l.pick(16, 24, 32);
  const itemW = `${100 / cols}%` as const;
  return (
    <Section id="experts" tone="white">
      <Container>
        <MetaBar index="06 / 09" label={t.experts.eyebrow} />
        <SectionHead title={t.experts.title} sub={t.experts.sub} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -gap / 2, marginTop: l.pick(48, 72, 104), rowGap: l.pick(32, 44, 56) }}>
          {experts.map((e, i) => (
            <View key={e.name} style={{ width: itemW, paddingHorizontal: gap / 2 }}>
              <View>
                <ImageSlot ratio={1} />
                <View style={{ ...({} as object), position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                  <Txt v="display" size={l.pick(44, 56, 64)} style={{ color: '#9d9d95' }}>{initials(e.name)}</Txt>
                </View>
                {i === 0 && <View style={{ position: 'absolute', right: 0, top: 0, width: 10, height: 10, backgroundColor: colors.red }} />}
              </View>
              <View style={{ marginTop: 14, gap: 4 }}>
                <Txt v="title" size={l.pick(19, 21, 22)}>{e.name}</Txt>
                <Txt v="caption" muted size={10}>{e.role}</Txt>
                <Txt v="small" muted size={13} style={{ marginTop: 4 }}>{e.companies.join(' · ')}</Txt>
                <View style={{ marginTop: 6 }}><TextLink label="LinkedIn ↗" href={e.url} /></View>
              </View>
            </View>
          ))}
          {/* 12th cell closes the grid with the brand's Z */}
          <View style={{ width: itemW, paddingHorizontal: gap / 2 }}>
            <View style={{ aspectRatio: 1, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' }}>
              <ZPath size={l.pick(110, 150, 190)} node={10} stroke={1.2} />
            </View>
          </View>
        </View>
      </Container>
    </Section>
  );
}

/* ───────── 07 · Investidores ───────── */
export function Funding() {
  const { t } = useApp();
  const l = useLayout();
  const cols = l.pick(2, 4, 7);
  return (
    <Section id="investors" tone="ink">
      <Container>
        <MetaBar index="07 / 09" label={t.funding.eyebrow} tone="ink" />
        <View style={{ flexDirection: l.isDesktop ? 'row' : 'column', gap: l.pick(48, 64, 96) }}>
          <View style={{ flex: l.isDesktop ? 6 : undefined }}>
            <Txt v="display" tone="ink" size={l.pick(44, 72, 88)}>{t.funding.title}</Txt>
            <View style={{ marginTop: 28, maxWidth: 520 }}><Txt v="body" tone="ink" muted>{t.funding.body}</Txt></View>
          </View>
          <View style={{ flex: l.isDesktop ? 5 : undefined, justifyContent: 'flex-end' }}>
            <Node size={12} red />
            <View style={{ marginTop: 24 }}>
              <Txt v="title" tone="ink" size={l.pick(22, 28, 30)} style={{ lineHeight: l.pick(30, 38, 40) }}>{`“${t.funding.quote}”`}</Txt>
            </View>
            <View style={{ marginTop: 24, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <View style={{ width: 64 }}><ImageSlot ratio={1} tone="ink" /></View>
              <Txt v="caption" tone="ink" muted size={11} style={{ flex: 1, lineHeight: 18 }}>{t.funding.author}</Txt>
            </View>
          </View>
        </View>

        <View style={{ marginTop: l.pick(64, 96, 144), flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderLeftWidth: 1, borderColor: colors.lineDark }}>
          {investors.map((n, i) => (
            <View key={n} style={{ width: `${100 / cols}%`, minHeight: l.pick(84, 96, 120), borderRightWidth: 1, borderBottomWidth: 1, borderColor: colors.lineDark, padding: l.pick(12, 14, 16), justifyContent: 'space-between' }}>
              <Node size={6} red={i === 0} tone="ink" />
              <Txt v="small" tone="ink" size={l.pick(14, 15, 15)}>{n}</Txt>
            </View>
          ))}
        </View>
      </Container>
    </Section>
  );
}

/* ───────── 08 · Imprensa ───────── */
function PressRow({ item, lang }: { item: (typeof press)[number]; lang: 'pt' | 'en' }) {
  const l = useLayout();
  const [h, setH] = useState(false);
  return (
    <Pressable
      onPress={() => Linking.openURL(item.url)}
      // @ts-ignore web hover
      onHoverIn={() => setH(true)} onHoverOut={() => setH(false)}
      style={[{ borderTopWidth: 1, borderTopColor: h ? colors.ink : colors.line, paddingVertical: l.pick(22, 28, 36), flexDirection: l.isDesktop ? 'row' : 'column', gap: l.pick(8, 10, 32), alignItems: l.isDesktop ? 'center' : 'flex-start' }, Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : null]}
    >
      <View style={{ flex: l.isDesktop ? 2 : undefined }}><Txt v="caption" muted size={11}>{item.date[lang]}</Txt></View>
      <View style={{ flex: l.isDesktop ? 2 : undefined }}><Txt v="title" size={l.pick(22, 24, 26)}>{item.source}</Txt></View>
      <View style={{ flex: l.isDesktop ? 5 : undefined }}><Txt v="body" size={l.pick(17, 18, 19)}>{item.title}</Txt></View>
      <View style={{ flex: l.isDesktop ? 2 : undefined, alignItems: l.isDesktop ? 'flex-end' : 'flex-start' }}>
        <Txt v="small" style={{ color: h ? colors.red : colors.ink }}>{item.cta[lang]} →</Txt>
      </View>
    </Pressable>
  );
}

export function Press() {
  const { t, lang } = useApp();
  const l = useLayout();
  return (
    <Section tone="offwhite">
      <Container>
        <MetaBar index="08 / 09" label={t.press.eyebrow} />
        <SectionHead title={t.press.title} sub={t.press.sub} />
        <View style={{ marginTop: l.pick(40, 64, 88) }}>
          {press.map((p) => <PressRow key={p.url} item={p} lang={lang} />)}
          <Hairline />
          <View style={{ marginTop: 24 }}><TextLink label={`${t.press.all} →`} href="https://comp.vc/press-articles" /></View>
        </View>
      </Container>
    </Section>
  );
}

/* ───────── FAQ ───────── */
function Plus({ open }: { open: boolean }) {
  return (
    <View style={{ width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', width: 16, height: 1.5, backgroundColor: open ? colors.red : colors.ink }} />
      {!open && <View style={{ position: 'absolute', width: 1.5, height: 16, backgroundColor: colors.ink }} />}
    </View>
  );
}

function FaqItem({ q, open, onToggle, pending }: { q: string; open: boolean; onToggle: () => void; pending: string }) {
  const l = useLayout();
  return (
    <View style={{ borderTopWidth: 1, borderTopColor: open ? colors.ink : colors.line }}>
      <Pressable onPress={onToggle} accessibilityRole="button" accessibilityState={{ expanded: open }} style={[{ paddingVertical: l.pick(20, 22, 26), flexDirection: 'row', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start' }, Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : null]}>
        <View style={{ flex: 1 }}><Txt v="title" size={l.pick(20, 22, 24)}>{q}</Txt></View>
        <View style={{ paddingTop: 6 }}><Plus open={open} /></View>
      </Pressable>
      {open && (
        <View style={{ paddingBottom: 26, maxWidth: 640 }}>
          <Txt v="body" muted>{pending}</Txt>
        </View>
      )}
    </View>
  );
}

export function Faq() {
  const { t } = useApp();
  const l = useLayout();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Section id="faq" tone="white">
      <Container>
        <MetaBar index="09 / 09" label={t.faq.eyebrow} />
        <SectionHead title={t.faq.title} sub={t.faq.sub} />
        <View style={{ marginTop: l.pick(40, 64, 96), gap: l.pick(40, 56, 64) }}>
          {t.faq.groups.map((g) => (
            <View key={g.label} style={{ flexDirection: l.isDesktop ? 'row' : 'column', gap: l.pick(12, 16, 64) }}>
              <View style={{ flex: l.isDesktop ? 3 : undefined, paddingTop: l.isDesktop ? 26 : 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Node size={7} red />
                  <Txt v="caption" size={11}>{g.label}</Txt>
                </View>
              </View>
              <View style={{ flex: l.isDesktop ? 9 : undefined }}>
                {g.items.map((q) => <FaqItem key={q} q={q} open={open === q} pending={t.faq.pending} onToggle={() => setOpen(open === q ? null : q)} />)}
                <Hairline />
              </View>
            </View>
          ))}
        </View>
      </Container>
    </Section>
  );
}

/* ───────── CTA final + rodapé ───────── */
export function FinalCta() {
  const { t } = useApp();
  const l = useLayout();
  return (
    <Section tone="ink" padBottom={l.pick(64, 96, 120)}>
      <Container>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 48 }}>
          <View style={{ flex: 1 }}>
            <Txt v="display" tone="ink" size={l.pick(42, 72, 96)}>{t.final.title}</Txt>
            <View style={{ marginTop: l.pick(24, 32, 40), maxWidth: 520 }}><Txt v="body" tone="ink" muted>{t.final.sub}</Txt></View>
            <View style={{ marginTop: l.pick(32, 40, 48) }}><Button tone="ink" label={t.final.cta} href="https://comp.vc/schedule" /></View>
          </View>
          {l.isDesktop && <ZPath size={Math.min(400, l.width * 0.27)} tone="dark" node={16} />}
        </View>
      </Container>
    </Section>
  );
}

export function Footer() {
  const { t } = useApp();
  const l = useLayout();
  const cols = [
    { h: t.footer.insights, links: t.footer.insightsLinks },
    { h: t.footer.tools, links: t.footer.toolsLinks },
    { h: t.footer.company, links: t.footer.companyLinks },
    { h: t.footer.legal, links: t.footer.legalLinks },
  ];
  const wmWidth = Math.min(l.width, l.maxWidth) - l.gutter * 2;
  return (
    <View style={{ backgroundColor: colors.ink, paddingBottom: l.pick(24, 28, 32) }}>
      <Container>
        <Hairline tone="ink" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: l.pick(36, 48, 56), rowGap: 36 }}>
          {cols.map((c) => (
            <View key={c.h} style={{ width: l.isDesktop ? '25%' : '50%', paddingRight: 24 }}>
              <Txt v="caption" tone="ink" muted size={11} style={{ marginBottom: 16 }}>{c.h}</Txt>
              <View style={{ gap: 10 }}>{c.links.map((k) => <Txt key={k} v="small" tone="ink" size={14}>{k}</Txt>)}</View>
            </View>
          ))}
        </View>

        <View style={{ marginTop: l.pick(56, 80, 112) }}><Wordmark width={wmWidth} color={colors.white} /></View>

        <View style={{ marginTop: l.pick(24, 32, 40) }}><Hairline tone="ink" /></View>
        <View style={{ flexDirection: l.isTablet ? 'row' : 'column', justifyContent: 'space-between', gap: 14, paddingTop: 18 }}>
          <Txt v="small" tone="ink" muted size={13}>{t.footer.rights}</Txt>
          <View style={{ flexDirection: 'row', gap: 22, flexWrap: 'wrap' }}>
            {t.footer.badges.map((b) => <Txt key={b} v="caption" tone="ink" muted size={10}>{b}</Txt>)}
            <Txt v="caption" tone="ink" size={10}>LinkedIn</Txt>
            <Txt v="caption" tone="ink" size={10}>Instagram</Txt>
          </View>
        </View>
      </Container>
    </View>
  );
}
