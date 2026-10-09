import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useBrandFonts } from './src/fonts';
import { colors } from './src/theme';
import { AppContext } from './src/context';
import { Lang, content } from './src/i18n/content';
import { SectionRegistryProvider } from './src/components/ui';
import { Banner, Header } from './src/sections/Header';
import { Hero } from './src/sections/Hero';
import { Clients, How, PlanCta, Problem, Solution, Testimonials } from './src/sections/Body1';
import { Experts, Faq, FinalCta, Footer, Funding, Press } from './src/sections/Body2';

export default function App() {
  const [loaded] = useBrandFonts();
  const [lang, setLang] = useState<Lang>('pt');
  const scroller = useRef<ScrollView>(null);
  const ys = useRef<Record<string, number>>({});

  const registerSection = useCallback((id: string, y: number) => { ys.current[id] = y; }, []);
  const scrollTo = useCallback((id: string) => {
    const y = id === 'top' ? 0 : (ys.current[id] ?? 0) - 68;
    scroller.current?.scrollTo({ y: Math.max(0, y), animated: true });
  }, []);
  const ctx = useMemo(() => ({ lang, setLang, t: content[lang], scrollTo }), [lang, scrollTo]);

  if (!loaded) return <View style={{ flex: 1, backgroundColor: colors.ink }} />;

  return (
    <AppContext.Provider value={ctx}>
      <SectionRegistryProvider value={{ registerSection }}>
        <StatusBar style="light" />
        <ScrollView ref={scroller} style={{ flex: 1, backgroundColor: colors.ink }} stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
          <Banner />
          <Header />
          <Hero />
          <Testimonials />
          <Problem />
          <Solution />
          <Clients />
          <How />
          <PlanCta />
          <Experts />
          <Funding />
          <Press />
          <Faq />
          <FinalCta />
          <Footer />
        </ScrollView>
      </SectionRegistryProvider>
    </AppContext.Provider>
  );
}
