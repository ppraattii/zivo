import React from 'react';
import { View } from 'react-native';
import { useLayout } from '../hooks/useBreakpoint';
import { useApp } from '../context';
import { Button, Container, Hairline, Section, Txt } from '../components/ui';
import { ZPathAnimated } from '../graphics/ZPath';
import { GlyphField } from '../graphics/GlyphField';

export function Hero() {
  const { t } = useApp();
  const l = useLayout();
  const displaySize = l.pick(46, 76, Math.max(84, Math.min(112, l.width * 0.07)));
  const zSize = l.pick(Math.min(l.width - l.gutter * 2, 300), 340, Math.min(440, l.width * 0.3));

  return (
    <Section id="top" tone="ink" padTop={l.pick(48, 72, 96)} padBottom={0}>
      <Container>
        <View style={{ flexDirection: l.isDesktop ? 'row' : 'column', alignItems: l.isDesktop ? 'center' : 'flex-start', justifyContent: 'space-between', gap: l.pick(48, 64, 40) }}>
          <View style={{ flex: l.isDesktop ? 1 : undefined }}>
            <Txt v="display" tone="ink" size={displaySize}>{t.hero.title[0]}</Txt>
            <Txt v="display" tone="ink" size={displaySize}>{t.hero.title[1]}</Txt>
            <View style={{ marginTop: l.pick(28, 36, 48), maxWidth: 560 }}>
              <Txt v="body" tone="ink" muted>{t.hero.body}</Txt>
            </View>
            <View style={{ marginTop: l.pick(32, 40, 48) }}>
              <Button tone="ink" label={t.hero.cta} href="https://comp.vc/schedule" />
            </View>
          </View>
          <View style={{ alignSelf: l.isDesktop ? 'center' : 'flex-start', marginRight: l.isDesktop ? 24 : 0 }}>
            <ZPathAnimated size={zSize} node={l.pick(12, 14, 16)} />
          </View>
        </View>
      </Container>

      {/* Paths become a system */}
      <View style={{ marginTop: l.pick(56, 88, 128) }}>
        <Container><Hairline tone="ink" /></Container>
        <View style={{ alignItems: 'center', paddingVertical: l.pick(24, 36, 48), overflow: 'hidden' }}>
          <GlyphField width={l.width - l.gutter * 2} cell={l.pick(40, 48, 58)} rows={l.pick(4, 4, 5)} tone="dark" />
        </View>
      </View>
    </Section>
  );
}
