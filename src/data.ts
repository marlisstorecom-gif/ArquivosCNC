import { Category, Review, FAQItem, CompareRow } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'decor',
    emoji: '🏠',
    title: 'Casa e Decoração',
    description: 'Arte de parede, organizadores, padrões de cozinha, porta-copos e quadros decorativos.',
    image: 'https://thelaserdesign.store/wp-content/uploads/2025/10/2-1.png'
  },
  {
    id: 'jewelry',
    emoji: '💍',
    title: 'Joias e Acessórios',
    description: 'Modelos criativos de brincos, pingentes elegantes, chaveiros personalizados e presilhas.',
    image: 'https://thelaserdesign.store/wp-content/uploads/2025/10/4-1.png'
  },
  {
    id: 'animals',
    emoji: '🦁',
    title: 'Animais e Vida Selvagem',
    description: 'Silhuetas artísticas, painéis multicamadas 3D e cabeças de animais geométricas.',
    image: 'https://thelaserdesign.store/wp-content/uploads/2025/10/5-1.png'
  },
  {
    id: 'seasonal',
    emoji: '🎄',
    title: 'Sazonal e Feriados',
    description: 'Decorações para Natal, Páscoa, Dia dos Namorados, Halloween e aniversários.',
    image: 'https://thelaserdesign.store/wp-content/uploads/2025/10/1-1.png'
  },
  {
    id: 'models3d',
    emoji: '🚗',
    title: 'Modelos 3D e Hobbies',
    description: 'Brinquedos mecânicos funcionais, miniaturas de carros, trens e kits faça você mesmo (DIY).',
    image: 'https://thelaserdesign.store/wp-content/uploads/2025/10/6-1.png'
  },
  {
    id: 'mandalas',
    emoji: '🌸',
    title: 'Mandalas e Decorações',
    description: 'Arte geométrica complexa, mandalas multicamadas de madeira do estilo zen e decoração de casamento.',
    image: 'https://thelaserdesign.store/wp-content/uploads/2025/10/3-1.png'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Michael S.',
    initials: 'MS',
    machine: 'CO₂ Laser',
    material: 'Madeira',
    stars: 5,
    text: '"Os arquivos foram cortados perfeitamente na primeira tentativa. Economizei mais de 20 horas de desenho e ajuste de nós só na primeira semana. A qualidade é simplesmente incomparável."',
    tag: 'Loja Profissional',
    verified: true,
    image: 'https://thelaserdesign.store/wp-content/uploads/2025/10/2.png'
  },
  {
    id: 'rev-2',
    name: 'Amina M.',
    initials: 'AM',
    machine: 'LightBurn',
    material: 'Acrílico',
    stars: 5,
    text: '"Arrastei os arquivos DXF diretamente para o LightBurn e comecei a cortar em 10 minutos. Já recuperei os 20 dólares no meu primeiríssimo dia de vendas usando minhas peças no Etsy."',
    tag: 'Vendedor do Etsy',
    verified: true,
    image: 'https://thelaserdesign.store/wp-content/uploads/2025/10/1.png'
  },
  {
    id: 'rev-3',
    name: 'Roger Y.',
    initials: 'RY',
    machine: 'Laser de fibra + CNC',
    material: 'Metal & Acrílico',
    stars: 5,
    text: '"Os caminhos vetoriais mais limpos e polidos que já comprei na vida. Sem nós duplicados ou linhas quebradas. Funciona perfeitamente tanto na minha máquina de fibra quanto na CNC do workshop."',
    tag: 'Fibra e CNC',
    verified: true,
    image: 'https://thelaserdesign.store/wp-content/uploads/2026/05/6f8c8751-3e68-473e-b409-305efd2fd5b5_800x1066.avif'
  },
  {
    id: 'rev-4',
    name: 'Khaled S.',
    initials: 'KS',
    machine: 'Fresadora CNC',
    material: 'Madeira maciça',
    stars: 5,
    text: '"Incrível como os tamanhos e as juntas se encaixam certinho. Abre diretamente no CorelDRAW sem travamentos ou erros. Os melhores 20 dólares que já gastei para turbinar minha marcenaria."',
    tag: 'Marcenaria',
    verified: true,
    image: 'https://thelaserdesign.store/wp-content/uploads/2026/05/78.jpg'
  },
  {
    id: 'rev-5',
    name: 'Paula B.',
    initials: 'PB',
    machine: 'Laser de fibra',
    material: 'Joias & Pingentes',
    stars: 5,
    text: '"Usei as estampas de brincos e relicários geométricos para lançar nossa nova coleção de joias alternativas. Vendi tudo na primeira hora de exposição aos clientes da feira local!"',
    tag: 'Fabricante de Joias',
    verified: true,
    image: 'https://thelaserdesign.store/wp-content/uploads/2026/05/picpic.jpg'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Trata-se de um pagamento único ou de uma assinatura?',
    answer: 'É um pagamento único de apenas US$ 20. Você não terá cobranças mensais, anuidades ou taxas escondidas. Você garante acesso vitalício a toda a biblioteca atual e a todas as atualizações futuras gratuitamente.'
  },
  {
    id: 'faq-2',
    question: 'Como faço para obter os arquivos após a compra?',
    answer: 'Imediatamente após a aprovação do pagamento, você receberá um e-mail de confirmação contendo o botão de acesso instantâneo direto para a nossa pasta premium compartilhada no Google Drive. Lá você poderá fazer o download individual das pastas por categorias, ou de todo o conteúdo em lotes compactados. Sem tempo de espera!'
  },
  {
    id: 'faq-3',
    question: 'Posso vender produtos feitos com esses arquivos?',
    answer: 'Sim, absolutamente! A licença comercial completa está inclusa com a compra hoje. Isso autoriza você a cortar, fabricar e vender quantos produtos físicos quiser no Etsy, no Instagram, em feiras de artesanato ou diretamente para seus clientes. A única restrição é revender ou redistribuir os arquivos ou vetores digitais em si.'
  },
  {
    id: 'faq-4',
    question: 'Quais formatos de arquivos estão incluídos?',
    answer: 'Você receberá os designs nos 7 formatos mais populares e exigidos pelo mercado: SVG, DXF, AI, PNG, EPS, PDF e CDR. Isso garante compatibilidade total com LightBurn, CorelDRAW, Adobe Illustrator, Inkscape, AutoCAD, RDWorks e Silhouette Studio.'
  },
  {
    id: 'faq-5',
    question: 'Esses arquivos funcionarão com a minha máquina?',
    answer: 'Sim! Os designs foram minuciosamente testados e otimizados para uma gama enorme de maquinários, incluindo Lasers CO₂ , Lasers de Fibra, Cortadores de Diodo (como xTool, Ortur, Creality, Sculpfun), Fresadoras CNC Routers, Cortadores de Jato de Água e Plasma.'
  },
  {
    id: 'faq-6',
    question: 'Qual é a política de reembolso do pacote?',
    answer: 'Oferecemos uma garantia total de satisfação de 7 dias. Se por qualquer motivo você achar que o bundle não é adequado para você ou que os arquivos não atendem às suas expectativas, basta nos enviar um e-mail simples para info.emaillaserdesign@gmail.com. Nós devolveremos 100% do seu dinheiro, sem perguntas!'
  }
];

export const COMPARE_ROWS: CompareRow[] = [
  {
    feature: 'Qualidade do arquivo',
    free: 'Inconsistente (linhas duplicadas)',
    thisBundle: 'Alta Definição (Vetores limpos)',
    designer: 'Varia (depende do designer)',
    freeCheck: false,
    thisBundleCheck: true,
    designerCheck: undefined
  },
  {
    feature: 'Testado na máquina de corte',
    free: 'Não (alto risco de quebra de bocal)',
    thisBundle: 'Sim, testado em máquinas reais',
    designer: 'Raramente (não possuem máquinas)',
    freeCheck: false,
    thisBundleCheck: true,
    designerCheck: false
  },
  {
    feature: 'Pronto para cortar',
    free: 'Precisa de reparos minuciosos',
    thisBundle: 'Pronto instantaneamente',
    designer: 'Depende da entrega final',
    freeCheck: false,
    thisBundleCheck: true,
    designerCheck: undefined
  },
  {
    feature: 'Licença comercial inclusa',
    free: 'Raramente ou proibido para revenda',
    thisBundle: 'Sim, inclusa para sempre',
    designer: 'Custo adicional de propriedade',
    freeCheck: false,
    thisBundleCheck: true,
    designerCheck: false
  },
  {
    feature: 'Número de arquivos',
    free: '10 a 50 arquivos espalhados',
    thisBundle: 'Mais de 700.000 designs premium',
    designer: 'Pagamento avulso por arquivo',
    freeCheck: false,
    thisBundleCheck: true,
    designerCheck: false
  },
  {
    feature: 'Custo total de investimento',
    free: 'Grátis (mas perde horas buscando)',
    thisBundle: 'Apenas US$ 20 (pagamento único)',
    designer: 'U$$ 50 a US$ 500 por projeto',
    freeCheck: true,
    thisBundleCheck: true,
    designerCheck: false
  },
  {
    feature: 'Tempo total de início',
    free: 'Horas infinitas garimpando na web',
    thisBundle: 'Menos de 5 minutos',
    designer: 'Dias ou semanas de vaivém',
    freeCheck: false,
    thisBundleCheck: true,
    designerCheck: false
  }
];

export const INSIDE_GRID_IMAGES = [
  'https://thelaserdesign.store/wp-content/uploads/2026/05/3.avif',
  'https://thelaserdesign.store/wp-content/uploads/2026/05/2.avif',
  'https://thelaserdesign.store/wp-content/uploads/2026/05/PIC001.jpg',
  'https://thelaserdesign.store/wp-content/uploads/2026/05/1.avif',
  'https://thelaserdesign.store/wp-content/uploads/2025/10/iap_800x800.6001331219_e7cgv4c4.avif',
  'https://thelaserdesign.store/wp-content/uploads/2025/10/iap_800x800.6451309595_9dzpoz70.avif',
  'https://thelaserdesign.store/wp-content/uploads/2025/10/iap_800x800.7235620088_tve1wwc9.avif',
  'https://thelaserdesign.store/wp-content/uploads/2025/10/iap_800x800.7308932821_k9vyx2zx.avif',
  'https://thelaserdesign.store/wp-content/uploads/2026/05/678.jpg'
];

export const REAL_PROJECTS_IMAGES = [
  { url: 'https://thelaserdesign.store/wp-content/uploads/2025/10/8.png', title: 'Caixa de Jóias Clássica em Madeira mdf' },
  { url: 'https://thelaserdesign.store/wp-content/uploads/2025/10/5.png', title: 'Abajur multicamada de corte a laser' },
  { url: 'https://thelaserdesign.store/wp-content/uploads/2025/10/3.png', title: 'Porta Chaves rústico com ganchos' },
  { url: 'https://thelaserdesign.store/wp-content/uploads/2025/10/6.png', title: 'Pente e acessórios personalizados de Barba' }
];

export const DOWNLOADABLE_SAMPLES = [
  {
    title: 'Chaveiro Coração Geométrico',
    format: 'SVG, DXF',
    complexity: 'Fácil',
    svgCode: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-yellow-500 fill-none" stroke-width="2">
      <path d="M50 30 C35 10, 10 30, 25 55 L50 85 L75 55 C90 30, 65 10, 50 30 Z" />
      <circle cx="50" cy="38" r="4" class="fill-yellow-500" />
      <path d="M50 48 L50 70 M40 58 L60 58" stroke-dasharray="1 1" />
    </svg>`
  },
  {
    title: 'Brinco Mandala Floral',
    format: 'SVG, PDF',
    complexity: 'Média',
    svgCode: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-orange-400 fill-none" stroke-width="1.5">
      <circle cx="50" cy="50" r="40" />
      <circle cx="50" cy="50" r="10" />
      <circle cx="50" cy="18" r="4" class="fill-orange-400" />
      <path d="M50 10 L50 90 M10 50 L90 50" stroke-dasharray="3 3" />
      <path d="M30 30 L70 70 M30 70 L70 30" stroke-dasharray="3 3"/>
      <!-- Petals -->
      <path d="M50 50 Q40 30 50 10 Q60 30 50 50" />
      <path d="M50 50 Q30 40 10 50 Q30 60 50 50" />
      <path d="M50 50 Q60 70 50 90 Q40 70 50 50" />
      <path d="M50 50 Q70 60 90 50 Q70 40 50 50" />
    </svg>`
  },
  {
    title: 'Suporte de Celular Multifuro',
    format: 'DXF',
    complexity: 'Fácil',
    svgCode: `<svg viewBox="0 0 120 100" class="w-full h-full stroke-amber-500 fill-none" stroke-width="2">
      <!-- Base Slot -->
      <rect x="15" y="15" width="90" height="70" rx="6" />
      <rect x="35" y="45" width="50" height="10" rx="2" />
      <!-- Support arm -->
      <path d="M25 80 L95 80 L80 30 L40 30 Z" />
      <line x1="60" y1="30" x2="60" y2="80" stroke-dasharray="2 2" />
    </svg>`
  },
  {
    title: 'Relógio de Parede Numeral Antigo',
    format: 'SVG, DXF, CDR',
    complexity: 'Alta',
    svgCode: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-yellow-600 fill-none" stroke-width="1.2">
      <circle cx="50" cy="50" r="45" />
      <circle cx="50" cy="50" r="42" stroke-dasharray="2 1" />
      <circle cx="50" cy="50" r="3" class="fill-yellow-600" />
      <!-- Hands -->
      <line x1="50" y1="50" x2="50" y2="25" stroke-width="2" />
      <line x1="50" y1="50" x2="70" y2="50" stroke-width="1.5" />
      <!-- Ticks -->
      <path d="M50 5 L50 12 M50 95 L50 88 M5 50 L12 50 M95 50 L88 50" stroke-width="2" />
      <path d="M72.5 27.5 L67.5 32.5 M27.5 72.5 L32.5 67.5 M27.5 27.5 L32.5 32.5 M72.5 72.5 L67.5 67.5" />
    </svg>`
  }
];
