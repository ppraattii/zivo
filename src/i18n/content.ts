/**
 * Homepage copy. Structure and text follow https://comp.vc/ (PT-BR), with "Comp" → "Zivo".
 * EN is a working translation for the global positioning shown in the brand deck.
 */
export type Lang = 'pt' | 'en';

export const experts = [
  { name: 'Filipe Ducas', role: 'Co-founder & HR Executive', companies: ['OLX', 'XP'], url: 'https://www.linkedin.com/in/filipe-ducas/' },
  { name: 'Dino Pieczynski', role: 'HR Executive', companies: ['AON', 'Mercer'], url: 'https://www.linkedin.com/in/dino-pieczynski/' },
  { name: 'Fábio Camargo', role: 'HR Executive', companies: ['How 2 Pay', 'Korn Ferry'], url: 'https://www.linkedin.com/in/fabiogcamargo/' },
  { name: 'Guilherme Tomazin', role: 'HR Executive', companies: ['Neon', 'Nubank'], url: 'https://www.linkedin.com/in/guilhermetomazin/' },
  { name: 'Tiago Maciel', role: 'HR Executive', companies: ['Vale', 'Hotmart'], url: 'https://www.linkedin.com/in/tiagobmaciel/' },
  { name: 'Bruno DeMarco', role: 'HR Executive', companies: ['Dock', 'Serasa'], url: 'https://www.linkedin.com/in/brunodemarco/' },
  { name: 'Bernardo Rodrigues', role: 'HR Executive', companies: ['GPA', 'PanVel'], url: 'https://www.linkedin.com/in/rodriguesbernardo/' },
  { name: 'Gabriel Aquino', role: 'HR Executive', companies: ['Cerc', 'Stone'], url: 'https://www.linkedin.com/in/gaquino27/' },
  { name: 'Karina Testai', role: 'HR Executive', companies: ['IBM'], url: 'https://www.linkedin.com/in/karina-testai/' },
  { name: 'Carolina Hatae', role: 'HR Executive', companies: ['d-Local', 'Ebanx'], url: 'https://www.linkedin.com/in/carolinahatae-hr/' },
  { name: 'Daniel Seixas', role: 'HR Executive', companies: ['Nubank', 'Unico'], url: 'https://www.linkedin.com/in/danielseixas/' },
];

export const investors = ['Khosla Ventures', 'Kaszek', 'Canary', 'Norte Ventures', 'Endeavor ScaleUp', 'Recall Capital', 'Abstract Ventures'];

export const press = [
  { source: 'Forbes', date: { pt: '22 de julho de 2026', en: 'July 22, 2026' }, title: 'A Virada Que o RH Brasileiro Ainda Não Fez com a IA', cta: { pt: 'Ver artigo', en: 'Read article' }, url: 'https://forbes.com.br/forbes-collab/2026/07/a-virada-que-o-rh-brasileiro-ainda-nao-fez-com-a-ia/' },
  { source: 'Aura', date: { pt: '10 de março de 2026', en: 'March 10, 2026' }, title: 'Comp: A startup de IA que está substituindo o RH tradicional', cta: { pt: 'Assistir ao episódio', en: 'Watch episode' }, url: 'https://www.youtube.com/watch?v=OvUES5IkOqw' },
  { source: 'Brazil Journal', date: { pt: '23 de fevereiro de 2026', en: 'February 23, 2026' }, title: "Comp levanta R$ 100 milhões para fazer do RH uma 'experiência mágica'", cta: { pt: 'Ver artigo', en: 'Read article' }, url: 'https://braziljournal.com/comp-levanta-r-100-milhoes-para-fazer-do-rh-uma-experiencia-magica/' },
];

type Copy = {
  banner: { tag: string; text: string };
  nav: { solution: string; how: string; experts: string; investors: string; faq: string; menu: string; close: string; cta: string };
  meta: { left: string; center: string; right: string };
  hero: { title: [string, string]; body: string; cta: string; scroll: string };
  testimonials: { eyebrow: string; title: string; sub: string; slot: string };
  problem: { eyebrow: string; title: string; sub: string; items: { title: string; body: string }[] };
  solution: { eyebrow: string; title: string; sub: string; items: { title: string; body: string }[] };
  clients: { eyebrow: string; title: string; sub: string; slot: string };
  how: { eyebrow: string; title: string; sub: string; steps: { title: string; body: string }[] };
  plan: { title: string; sub: string; cta: string };
  experts: { eyebrow: string; title: string; sub: string };
  funding: { eyebrow: string; title: string; body: string; quote: string; author: string };
  press: { eyebrow: string; title: string; sub: string; all: string };
  faq: { eyebrow: string; title: string; sub: string; pending: string; groups: { label: string; items: string[] }[] };
  final: { title: string; sub: string; cta: string };
  footer: {
    insights: string; insightsLinks: string[];
    tools: string; toolsLinks: string[];
    company: string; companyLinks: string[];
    legal: string; legalLinks: string[];
    rights: string; badges: string[];
  };
};

const pt: Copy = {
  banner: { tag: 'News', text: '[Workshop · 09/10] CHRO: do 0 ao seu primeiro produto' },
  nav: { solution: 'Solução', how: 'Como funciona', experts: 'Experts', investors: 'Investidores', faq: 'FAQ', menu: 'Menu', close: 'Fechar', cta: 'Fale com um especialista' },
  meta: { left: 'Zivo', center: 'AI-Native HR', right: '2026' },
  hero: {
    title: ['AI-Native HR.', 'Built for you.'],
    body: 'A Zivo co-constrói o seu RH AI-Native, ponta a ponta: políticas, processos e ferramentas sob medida que ampliam a capacidade da sua empresa de executar a estratégia.',
    cta: 'Fale com um especialista',
    scroll: 'Role para explorar',
  },
  testimonials: {
    eyebrow: 'CHROs',
    title: 'O que CHROs dizem sobre trabalhar com a Zivo integrada em seus times',
    sub: 'Não acredite em nós. Acredite em quem já está vivendo essa experiência.',
    slot: 'Depoimento em vídeo',
  },
  problem: {
    eyebrow: 'O problema',
    title: 'O mercado de RH está quebrado',
    sub: 'Apesar de centenas de ferramentas e consultorias, as empresas ainda não conseguiram transformar RH em uma função realmente estratégica.',
    items: [
      { title: 'Consultorias', body: 'Lentas, genéricas, entregam slides bonitos e vão embora. Você fica com o PPT e o problema.' },
      { title: 'Software', body: 'Genérico, de prateleira. Você compra a ferramenta e descobre que ninguém usa direito.' },
      { title: 'Time interno', body: 'Sobrecarregado com o tático, sem tempo para estratégia. Sob pressão do CEO para "ser mais estratégico".' },
    ],
  },
  solution: {
    eyebrow: 'Solução',
    title: 'Seu parceiro de transformação AI ponta a ponta para o RH',
    sub: 'Executivos de People e engenheiros de AI desenham e implementam as políticas, os processos e as ferramentas do seu RH. A parceria roda em OKRs trimestrais, com prioridades revisadas quando o negócio muda.',
    items: [
      { title: 'Experts de RH', body: 'Executivos sêniores que lideraram RH em empresas como Nubank, XP, iFood, Hotmart, IBM, Neon e várias outras, respondendo pelas entregas do seu RH.' },
      { title: 'Engenheiros de AI', body: 'Engenheiros que constroem agentes e ferramentas de AI que entregam contexto, dados e recomendações no momento exato da decisão — sem esperar dias de análises.' },
      { title: 'Software sob medida', body: 'Ferramentas construídas especificamente para o seu negócio. Não adaptamos você ao software, construímos o software para você.' },
    ],
  },
  clients: {
    eyebrow: 'Clientes',
    title: '150+ empresas inovadoras estão operando com a Zivo',
    sub: 'De early-stage startups a enterprises, ajudamos quem quer crescer e sabe que people é a maior alavanca.',
    slot: 'Logo',
  },
  how: {
    eyebrow: 'Parceria',
    title: 'Como funciona a parceria com a Zivo?',
    sub: 'Experts + AI responsáveis pelo resultado, do diagnóstico à entrega.',
    steps: [
      { title: 'Diagnóstico completo', body: 'Análise profunda das políticas, processos e ferramentas de people da sua empresa. Em 2 semanas, você tem clareza total de onde está e o que precisa evoluir.' },
      { title: 'Alinhamento de prioridades', body: 'Definimos juntos os outcomes prioritários para o negócio e construímos o primeiro escopo de trabalho, que combina redesenho de políticas, novos processos e software + AI sob medida.' },
      { title: 'Experts + AI em ação', body: 'Nosso time trabalha lado a lado com o seu — redesenhando políticas, construindo ferramentas e implementando mudanças até o resultado estar entregue.' },
    ],
  },
  plan: { title: 'Quer construir o plano para sua empresa?', sub: 'A gente te ajuda a diagnosticar e priorizar', cta: 'Agende um diagnóstico gratuito' },
  experts: {
    eyebrow: 'Time',
    title: 'Experts com trajetória em RH que impulsionam inovação',
    sub: 'Nosso time combina décadas de experiência em empresas como Nubank, XP, OLX, Neon, IBM e várias outras. Lado a lado de nossos AI engineers para construir impacto.',
  },
  funding: {
    eyebrow: 'Investidores',
    title: '+R$100M para transformar HR com AI',
    body: 'Já somos apoiados pela Kaszek, Canary, Norte e protagonizamos o primeiro investimento da Khosla Ventures no Brasil. Os primeiros investidores da OpenAI que agora apostam no futuro de AI + HR.',
    quote: "I've built and scaled companies for 20 years and never once had an HR function that actually made the company better. [Zivo] is the first time I've seen that change.",
    author: 'Keith Rabois, Managing Director, Khosla',
  },
  press: { eyebrow: 'Imprensa', title: 'Na mídia', sub: 'O que estão falando sobre nós', all: 'Ver todas as matérias' },
  faq: {
    eyebrow: 'FAQ',
    title: 'Ainda tem dúvidas?',
    sub: 'Antes de marcar uma conversa, talvez a gente já tenha respondido o que você quer saber.',
    pending: 'Resposta a inserir — o conteúdo atual do site não expõe as respostas.',
    groups: [
      { label: 'O modelo', items: ['Vocês são consultoria, SaaS, BPO ou o quê?', 'Quem responde pela entrega no dia a dia?', 'Vocês trabalham por projeto?', 'Com quem fica o código e a IP?'] },
      { label: 'Escopo', items: ['Que tipo de iniciativa vocês entregam?', 'Vocês fazem folha de pagamento?', 'Vocês fazem recrutamento? Abordam candidatos?', 'Integra com as ferramentas que a gente já usa?'] },
      { label: 'Dados e segurança', items: ['Como funciona a segurança de dados e LGPD? Vocês treinam modelos com os nossos dados?'] },
      { label: 'Cases e ROI', items: ['Tem case na minha indústria?', 'Tem ROI comprovado?'] },
      { label: 'Investimento', items: ['Qual o investimento envolvido?'] },
    ],
  },
  final: { title: 'Faça um diagnóstico com a gente', sub: 'Se você também acredita que o RH pode e deve impactar o negócio, precisamos conversar.', cta: 'Fale com um especialista' },
  footer: {
    insights: 'Insights', insightsLinks: ['Artigos', 'Webinars', 'Podcast', 'News: AI-Native HR', 'Comunidade AI-Native CHROs', 'Panorama de Remuneração Tech', 'Maturidade em Remuneração', 'Palestra AI-Powered Compensation', 'SOMA 2026: gravações'],
    tools: 'Ferramentas Gratuitas', toolsLinks: ['Diagnóstico de Maturidade AI', 'Claude Skills para CHROs', 'Benchmark de Total Rewards'],
    company: 'Empresa', companyLinks: ['Eventos', 'Series A', 'White paper: Maturidade em AI', 'Press releases', 'Na mídia', 'Metodologia', 'Segurança', 'Carreiras'],
    legal: 'Legal', legalLinks: ['Termos de uso', 'Política de privacidade'],
    rights: '© 2026 Zivo. Todos os direitos reservados.',
    badges: ['Endeavor ScaleUp', 'ISO 27001', 'Melhor Fornecedor RH'],
  },
};

const en: Copy = {
  banner: { tag: 'News', text: '[Workshop · 10/09] CHRO: from zero to your first product' },
  nav: { solution: 'Solution', how: 'How it works', experts: 'Experts', investors: 'Investors', faq: 'FAQ', menu: 'Menu', close: 'Close', cta: 'Talk to an expert' },
  meta: { left: 'Zivo', center: 'AI-Native HR', right: '2026' },
  hero: {
    title: ['AI-Native HR.', 'Built for you.'],
    body: 'Zivo builds your AI-Native HR end to end: tailored policies, processes and tools that expand your company’s ability to execute strategy.',
    cta: 'Talk to an expert',
    scroll: 'Scroll to explore',
  },
  testimonials: {
    eyebrow: 'CHROs',
    title: 'What CHROs say about working with Zivo embedded in their teams',
    sub: 'Don’t take our word for it. Hear from the people living the experience.',
    slot: 'Video testimonial',
  },
  problem: {
    eyebrow: 'The problem',
    title: 'The HR market is broken',
    sub: 'Despite hundreds of tools and consultancies, companies still haven’t turned HR into a truly strategic function.',
    items: [
      { title: 'Consultancies', body: 'Slow, generic, they deliver pretty slides and leave. You keep the deck and the problem.' },
      { title: 'Software', body: 'Generic, off-the-shelf. You buy the tool and find out nobody really uses it.' },
      { title: 'In-house team', body: 'Buried in tactical work, no time for strategy. Pressured by the CEO to “be more strategic”.' },
    ],
  },
  solution: {
    eyebrow: 'Solution',
    title: 'Your end-to-end AI transformation partner for HR',
    sub: 'People executives and AI engineers design and implement your HR policies, processes and tools. The partnership runs on quarterly OKRs, with priorities reviewed whenever the business changes.',
    items: [
      { title: 'HR experts', body: 'Senior executives who led HR at companies like Nubank, XP, iFood, Hotmart, IBM, Neon and more, accountable for your HR deliverables.' },
      { title: 'AI engineers', body: 'Engineers who build agents and AI tools that deliver context, data and recommendations at the exact moment of decision — no waiting days for analysis.' },
      { title: 'Custom software', body: 'Tools built specifically for your business. We don’t adapt you to the software; we build the software for you.' },
    ],
  },
  clients: {
    eyebrow: 'Clients',
    title: '150+ innovative companies run on Zivo',
    sub: 'From early-stage startups to enterprises, we help those who want to grow and know that people are the biggest lever.',
    slot: 'Logo',
  },
  how: {
    eyebrow: 'Partnership',
    title: 'How does the partnership with Zivo work?',
    sub: 'Experts + AI accountable for the outcome, from diagnosis to delivery.',
    steps: [
      { title: 'Full diagnosis', body: 'A deep analysis of your company’s people policies, processes and tools. In 2 weeks you have total clarity on where you stand and what needs to evolve.' },
      { title: 'Priority alignment', body: 'Together we define the priority business outcomes and build the first scope of work, combining policy redesign, new processes and custom software + AI.' },
      { title: 'Experts + AI in action', body: 'Our team works side by side with yours — redesigning policies, building tools and implementing change until the result is delivered.' },
    ],
  },
  plan: { title: 'Want to build the plan for your company?', sub: 'We help you diagnose and prioritize', cta: 'Book a free diagnosis' },
  experts: {
    eyebrow: 'Team',
    title: 'HR experts with a track record that drives innovation',
    sub: 'Our team combines decades of experience at companies like Nubank, XP, OLX, Neon, IBM and more. Side by side with our AI engineers to build impact.',
  },
  funding: {
    eyebrow: 'Investors',
    title: '+R$100M to transform HR with AI',
    body: 'Backed by Kaszek, Canary and Norte, and the first Khosla Ventures investment in Brazil. OpenAI’s early investors, now betting on the future of AI + HR.',
    quote: "I've built and scaled companies for 20 years and never once had an HR function that actually made the company better. [Zivo] is the first time I've seen that change.",
    author: 'Keith Rabois, Managing Director, Khosla',
  },
  press: { eyebrow: 'Press', title: 'In the press', sub: 'What they are saying about us', all: 'See all articles' },
  faq: {
    eyebrow: 'FAQ',
    title: 'Still have questions?',
    sub: 'Before booking a conversation, we may have already answered what you want to know.',
    pending: 'Answer to be added — the current site does not expose the answers.',
    groups: [
      { label: 'The model', items: ['Are you a consultancy, SaaS, BPO, or what?', 'Who is accountable for day-to-day delivery?', 'Do you work by project?', 'Who owns the code and IP?'] },
      { label: 'Scope', items: ['What kind of initiatives do you deliver?', 'Do you handle payroll?', 'Do you do recruiting? Do you approach candidates?', 'Does it integrate with the tools we already use?'] },
      { label: 'Data & security', items: ['How do data security and LGPD work? Do you train models on our data?'] },
      { label: 'Cases & ROI', items: ['Do you have a case in my industry?', 'Is there proven ROI?'] },
      { label: 'Investment', items: ['What is the investment involved?'] },
    ],
  },
  final: { title: 'Run a diagnosis with us', sub: 'If you also believe HR can and should impact the business, we need to talk.', cta: 'Talk to an expert' },
  footer: {
    insights: 'Insights', insightsLinks: ['Articles', 'Webinars', 'Podcast', 'News: AI-Native HR', 'AI-Native CHROs Community', 'Tech Compensation Landscape', 'Compensation Maturity', 'Talk: AI-Powered Compensation', 'SOMA 2026: recordings'],
    tools: 'Free tools', toolsLinks: ['AI Maturity Diagnostic', 'Claude Skills for CHROs', 'Total Rewards Benchmark'],
    company: 'Company', companyLinks: ['Events', 'Series A', 'White paper: AI Maturity', 'Press releases', 'In the press', 'Methodology', 'Security', 'Careers'],
    legal: 'Legal', legalLinks: ['Terms of use', 'Privacy policy'],
    rights: '© 2026 Zivo. All rights reserved.',
    badges: ['Endeavor ScaleUp', 'ISO 27001', 'Best HR Vendor'],
  },
};

export const content: Record<Lang, Copy> = { pt, en };
export type { Copy };
