import React, { createContext, useContext } from 'react';
import { Copy, Lang, content } from './i18n/content';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Copy;
  scrollTo: (id: string) => void;
};

export const AppContext = createContext<Ctx>({
  lang: 'pt',
  setLang: () => {},
  t: content.pt,
  scrollTo: () => {},
});

export const useApp = () => useContext(AppContext);
