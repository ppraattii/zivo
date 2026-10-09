import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { useLayout } from '../hooks/useBreakpoint';
import { useApp } from '../context';
import { Button, Container, Hairline, ImageSlot, MetaBar, Node, Section, SectionHead, Tone, Txt, lineOf } from '../components/ui';
import { ZPath } from '../graphics/ZPath';

/* ───────── 01 · CHROs ───────── */
export function Testimonials() {
  const { t } = useApp();
  const l = useLayout();
  const cards = [0, 1, 2];
  const Card = ({ i }: { i: number }) => (
    <View style={{ flex: l.isTablet ? 1 : undefined, width: l.isTablet ? undefined : Math.min(l.width * 0.74, 320) }}>
      <View>
        <ImageSlot ratio={l.isDesktop ? 1.05 : 4 / 5} label={t.testimonials.slot} labelAlign="right" />
        <View style={{ position: 'absolute', left: 0, bottom: 0, width: 56, height: 56, backgroundColor: i === 0 ? colors.red : colors.ink, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 0, height: 0, borderTopWidth: 7, borderBottomWidth: 7, borderLeftWidth: 11, borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: colors.white, marginLeft: 3 }} />
        </View>
      </View>
      <View style={{ marginTop: 16, gap: 4 }}>
        <Txt v="title" size={22}>Nome Sobrenome</Txt>
        <Txt v="caption" muted size={11}>CHRO · Empresa</Txt>
      </View>
    </View>
  );
  return (
    <Section tone="offwhite">
      <Container>
        <MetaBar index="01 / 09" label={t.testimonials.eyebrow} />
        <SectionHead title={t.testimonials.title} sub={t.testimonials.sub} />
      </Container>
      <View style={{ marginTop: l.pick(40, 56, 72) }}>
        {l.isTablet ? (
          <Container><View style={{ flexDirection: 'row', gap: 24 }}>{cards.map((i) => <Card key={i} i={i} />)}</View></Container>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: l.gutter, gap: 16 }}>
            {cards.map((i) => <Card key={i} i={i} />)}
          </ScrollView>
        )}
      </View>
    </Section>
  );
}

/* ───────── 02 · O problema ───────── */
export function Problem() {
  const { t } = useApp();
  const l = useLayout();
  return (
    <Section tone="white">
      <Container>
        <MetaBar index="02 / 09" label={t.problem.eyebrow} />
        <SectionHead title={t.problem.title} sub={t.problem.sub} />
        <View style={{ flexDirection: l.isTablet ? 'row' : 'column', gap: l.pick(40, 24, 40), marginTop: l.pick(48, 72, 104) }}>
          {t.problem.items.map((it, i) => (
            <View key={it.title} style={{ flex: l.isTablet ? 1 : undefined }}>
              <Hairline />
              <View style={{ paddingTop: 20, minHeight: l.isTablet ? 260 : undefined }}>
                <Node size={14} red={i === 0} />
                <View style={{ marginTop: l.isTablet ? 72 : 28 }}>
                  <Txt v="title">{it.title}</Txt>
                  <View style={{ marginTop: 12, maxWidth: 380 }}><Txt v="body" muted>{it.body}</Txt></View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Container>
    </Section>
  );
}

/* Nodes joined by a path — used for pillars and anywhere "things connect". */
export function PathSteps({ items, tone, numbered }: { items: { title: string; body: string }[]; tone: Tone; numbered?: boolean }) {
  const l = useLayout();
  const line = lineOf(tone) === colors.lineDark ? '#6a6a66' : colors.gray400;
  if (l.isTablet) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {items.map((it, i) => (
          <View key={it.title} style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Node size={14} red={i === 0} tone={tone} />
              {i < items.length - 1 && <View style={{ flex: 1, height: 1, backgroundColor: line }} />}
            </View>
            <View style={{ paddingRight: 40, marginTop: 40 }}>
              {numbered && <Txt v="caption" tone={tone} muted size={11} style={{ marginBottom: 14 }}>{`0${i + 1}`}</Txt>}
              <Txt v="title" tone={tone}>{it.title}</Txt>
              <View style={{ marginTop: 14, maxWidth: 400 }}><Txt v="body" tone={tone} muted>{it.body}</Txt></View>
            </View>
          </View>
        ))}
      </View>
    );
  }
  return (
    <View>
      {items.map((it, i) => (
        <View key={it.title} style={{ flexDirection: 'row', gap: 20 }}>
          <View style={{ alignItems: 'center', width: 14 }}>
            <Node size={14} red={i === 0} tone={tone} />
            {i < items.length - 1 && <View style={{ flex: 1, width: 1, backgroundColor: line, marginTop: 6, marginBottom: 6 }} />}
          </View>
          <View style={{ flex: 1, paddingBottom: i < items.length - 1 ? 44 : 0, marginTop: -4 }}>
            {numbered && <Txt v="caption" tone={tone} muted size={11} style={{ marginBottom: 8 }}>{`0${i + 1}`}</Txt>}
            <Txt v="title" tone={tone}>{it.title}</Txt>
            <View style={{ marginTop: 10 }}><Txt v="body" tone={tone} muted>{it.body}</Txt></View>
          </View>
        </View>
      ))}
    </View>
  );
}

/* ───────── 03 · Solução ───────── */
export function Solution() {
  const { t } = useApp();
  const l = useLayout();
  return (
    <Section id="solution" tone="ink">
      <Container>
        <MetaBar index="03 / 09" label={t.solution.eyebrow} tone="ink" />
        <SectionHead tone="ink" title={t.solution.title} sub={t.solution.sub} />
        <View style={{ marginTop: l.pick(56, 80, 120) }}>
          <PathSteps items={t.solution.items} tone="ink" />
        </View>
      </Container>
    </Section>
  );
}

/* ───────── 04 · Clientes ───────── */
export function Clients() {
  const { t } = useApp();
  const l = useLayout();
  const cols = l.pick(3, 4, 4);
  const total = 12;
  return (
    <Section tone="offwhite">
      <Container>
        <MetaBar index="04 / 09" label={t.clients.eyebrow} />
        <View style={{ flexDirection: l.isDesktop ? 'row' : 'column', gap: l.pick(32, 48, 80) }}>
          <View style={{ flex: l.isDesktop ? 5 : undefined }}>
            <Txt v="display" size={l.pick(88, 140, 200)} style={{ marginLeft: -4 }}>150+</Txt>
            <View style={{ marginTop: 20, maxWidth: 520, gap: 16 }}>
              <Txt v="headline" size={l.pick(26, 32, 34)}>{t.clients.title.replace(/^150\+ /, '')}</Txt>
              <Txt v="body" muted>{t.clients.sub}</Txt>
            </View>
          </View>
          <View style={{ flex: l.isDesktop ? 7 : undefined, marginTop: l.isDesktop ? 12 : 8 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderLeftWidth: 1, borderColor: colors.line }}>
              {Array.from({ length: total }, (_, i) => (
                <View key={i} style={{ width: `${100 / cols}%`, aspectRatio: 1.5, borderRightWidth: 1, borderBottomWidth: 1, borderColor: colors.line, padding: l.pick(10, 14, 16), justifyContent: 'space-between' }}>
                  <Node size={6} red={i === 4} />
                  <Txt v="caption" muted size={10}>{`${t.clients.slot} ${String(i + 1).padStart(2, '0')}`}</Txt>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Container>
    </Section>
  );
}

/* ───────── 05 · Como funciona ───────── */
export function How() {
  const { t } = useApp();
  const l = useLayout();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setActive((a) => (a + 1) % 3), 3600);
    return () => clearInterval(id);
  }, [auto]);
  const zSize = l.pick(Math.min(l.width - l.gutter * 2, 300), 380, Math.min(460, l.width * 0.32));
  return (
    <Section id="how" tone="white">
      <Container>
        <MetaBar index="05 / 09" label={t.how.eyebrow} />
        <SectionHead title={t.how.title} sub={t.how.sub} />
        <View style={{ flexDirection: l.isDesktop ? 'row' : 'column', gap: l.pick(40, 56, 96), marginTop: l.pick(48, 64, 96), alignItems: l.isDesktop ? 'center' : 'flex-start' }}>
          <View style={{ alignSelf: l.isDesktop ? 'center' : 'flex-start' }}>
            <ZPath size={zSize} tone="light" active={active} node={l.pick(12, 14, 16)} />
          </View>
          <View style={{ flex: l.isDesktop ? 1 : undefined, alignSelf: 'stretch' }}>
            {t.how.steps.map((s, i) => {
              const on = i === active;
              return (
                <Pressable key={s.title} onPress={() => { setAuto(false); setActive(i); }} accessibilityRole="button" style={{ borderTopWidth: 1, borderTopColor: on ? colors.ink : colors.line, paddingVertical: l.pick(22, 28, 32), flexDirection: 'row', gap: l.pick(16, 28, 36), opacity: on ? 1 : 0.5 }}>
                  <View style={{ width: 28, paddingTop: 6 }}><Txt v="caption" size={11}>{`0${i + 1}`}</Txt></View>
                  <View style={{ flex: 1 }}>
                    <Txt v="title">{s.title}</Txt>
                    <View style={{ marginTop: 12, maxWidth: 520 }}><Txt v="body" muted>{s.body}</Txt></View>
                  </View>
                </Pressable>
              );
            })}
            <Hairline />
          </View>
        </View>
      </Container>
    </Section>
  );
}

/* ───────── CTA · plano ───────── */
export function PlanCta() {
  const { t } = useApp();
  const l = useLayout();
  return (
    <Section tone="offwhite" padTop={l.pick(64, 96, 128)} padBottom={l.pick(64, 96, 128)}>
      <Container>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: l.pick(40, 64, 88) }}>
          <Node size={14} red />
          <View style={{ flex: 1, height: 1, backgroundColor: colors.gray400 }} />
          <Node size={14} />
        </View>
        <View style={{ flexDirection: l.isDesktop ? 'row' : 'column', justifyContent: 'space-between', alignItems: l.isDesktop ? 'flex-end' : 'flex-start', gap: l.pick(28, 36, 64) }}>
          <View style={{ flex: l.isDesktop ? 1 : undefined, maxWidth: 820 }}>
            <Txt v="headline" size={l.pick(32, 48, 60)}>{t.plan.title}</Txt>
            <View style={{ marginTop: 16 }}><Txt v="body" muted>{t.plan.sub}</Txt></View>
          </View>
          <Button tone="offwhite" label={t.plan.cta} href="https://comp.vc/schedule" />
        </View>
      </Container>
    </Section>
  );
}
