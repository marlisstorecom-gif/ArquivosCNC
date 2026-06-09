import { useState, useEffect } from 'react';
import { 
  Clock, 
  Sparkles, 
  Check, 
  Award, 
  Lock, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight, 
  ExternalLink,
  ChevronDown,
  Star,
  Flame,
  FileDown,
  ArrowRight,
  Maximize2,
  HardDrive,
  Cpu,
  Layers,
  Wrench,
  ThumbsUp,
  X
} from 'lucide-react';
import { 
  FAQS, 
  COMPARE_ROWS, 
  INSIDE_GRID_IMAGES, 
  REAL_PROJECTS_IMAGES,
  DOWNLOADABLE_SAMPLES
} from './data';
import CheckoutModal from './components/CheckoutModal';
import ReviewsSection from './components/ReviewsSection';
import CategoryExplorer from './components/CategoryExplorer';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ url: string; title: string } | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  
  // Secure checkout redirect and prefill states
  const [initialCheckoutStep, setInitialCheckoutStep] = useState<'form' | 'success'>('form');
  const [prefilledName, setPrefilledName] = useState('');
  const [prefilledEmail, setPrefilledEmail] = useState('');

  // Target successful redirect parameters
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const statusParam = urlParams.get('status')?.toLowerCase() || '';
      const transactionIdParam = urlParams.get('transaction_id') || urlParams.get('id') || urlParams.get('txid') || urlParams.get('order_id') || '';
      
      const hasSuccessIndicator = 
        statusParam === 'approved' || 
        statusParam === 'aprovado' || 
        statusParam === 'paid' || 
        statusParam === 'pago' || 
        statusParam === 'sucesso' || 
        statusParam === 'success' ||
        urlParams.has('checkout_success') ||
        (transactionIdParam && (transactionIdParam.startsWith('MP-') || transactionIdParam.startsWith('TX-'))) ||
        (urlParams.has('id') && urlParams.has('name') && urlParams.has('email'));

      if (hasSuccessIndicator) {
        console.log("[Secure Checkout] Redirect de compra bem sucedida detectado!");
        setPrefilledName(urlParams.get('name') || urlParams.get('client_name') || '');
        setPrefilledEmail(urlParams.get('email') || urlParams.get('client_email') || '');
        setInitialCheckoutStep('success');
        setIsCheckoutOpen(true);
        
        // Limpa parâmetros da URL para evitar reabertura involuntária do modal no refresh
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    } catch (e) {
      console.error("[Checkout parameter parsing error]", e);
    }
  }, []);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 59, seconds: 47 });

  // Update timer remaining every second
  useEffect(() => {
    // Generate randomized initial seconds (5h 59m 47s) or pull from sessionStorage
    let totalSeconds = 5 * 3600 + 59 * 60 + 47;
    const storedTime = sessionStorage.getItem('promo_timer_seconds');
    if (storedTime) {
      totalSeconds = parseInt(storedTime, 10);
    }

    const interval = setInterval(() => {
      if (totalSeconds <= 0) {
        totalSeconds = 5 * 3600 + 59 * 60 + 47; // Reset to create constant FOMO
      } else {
        totalSeconds -= 1;
      }
      sessionStorage.setItem('promo_timer_seconds', totalSeconds.toString());
      
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');
  const timerStr = `${formatNumber(timeLeft.hours)}:${formatNumber(timeLeft.minutes)}:${formatNumber(timeLeft.seconds)}`;

  const [platformCheckoutUrl, setPlatformCheckoutUrl] = useState('https://go.pepperpay.com.br/d85ef');

  useEffect(() => {
    fetch('/api/checkout-url')
      .then(res => res.json())
      .then(data => {
        if (data.checkoutUrl) {
          setPlatformCheckoutUrl(data.checkoutUrl);
        }
      })
      .catch(() => {});
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleScrollToPricing = () => {
    const el = document.getElementById('pricing-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCheckout = () => {
    window.location.href = platformCheckoutUrl;
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800 antialiased selection:bg-yellow-200">
      
      {/* 1. TOP FLASH SALE TIMER BAR */}
      <div className="bg-slate-900 border-b border-yellow-400 text-yellow-300 py-2.5 px-4 sticky top-0 z-50 text-center font-sans shadow-md flex flex-wrap gap-2 justify-center items-center">
        <span className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold tracking-tight">
          <Flame className="w-4 h-4 text-yellow-400 animate-pulse" />
          🔥 PROMOÇÃO RELÂMPAGO — O preço volta a ser R$ 97 em breve! Tempo restante:
        </span>
        <div className="bg-yellow-400 text-slate-950 px-2.5 py-1 rounded-md font-mono text-xs sm:text-sm font-black tracking-widest flex items-center gap-1.5 shadow-2xs">
          <Clock className="w-3.5 h-3.5" />
          <span>{timerStr}</span>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <header className="relative bg-white border-b-2 border-yellow-400 overflow-hidden">
        {/* Subtle decorative background laser beam */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100/30 rounded-full filter blur-3xl pointer-events-none select-none" />

        {/* Floating badge */}
        <div className="bg-slate-900 py-2 text-center border-b border-slate-800">
          <span className="inline-block bg-yellow-400 text-slate-950 text-[10px] md:text-xs font-black tracking-widest uppercase px-4 py-1 rounded-full shadow-xs">
            🔥 OFERTA POR TEMPO LIMITADO — 80% DE DESCONTO DISPONÍVEL HOJE
          </span>
        </div>

        {/* Outer Grid wrap */}
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Hero Left Info */}
          <div className="space-y-6 text-center md:text-left animate-in fade-in slide-in-from-left-4 duration-500 order-last md:order-first">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 leading-tight tracking-tight">
              Mais de <span className="text-yellow-500 underline decoration-yellow-400 decoration-wavy">700.000 arquivos</span> prontos para impressão a laser por apenas <span className="text-yellow-600 bg-yellow-100 px-3 py-1 rounded-xl">R$ 10</span>
            </h1>
            
            <p className="text-slate-500 text-sm sm:text-base pr-0 md:pr-10">
              O maior pacote de design a laser do mercado internacional — testado, organizado por pastas catalogadas e pronto para recortes limpos.
            </p>

            {/* Micro checks block */}
            <ul className="inline-flex flex-col gap-2.5 text-left text-xs sm:text-sm font-semibold max-w-sm">
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span>Mais de 100 GB em SVG, DXF, AI, PNG, EPS, PDF e CDR</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span>Testado em CO₂, Fibra, Cortadores de Diodo e CNC</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span>Mais de 40 categorias catalogadas excelentes</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span>Acesso vitalício integral — compra única, sem taxas</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span>Livre para fabricação comercial incluída em tudo</span>
              </li>
            </ul>

            {/* Pricing Tag */}
            <div className="pt-2 flex flex-col items-center md:items-start space-y-1.5">
              <span className="text-xs line-through text-slate-400 font-bold">Preço Regular Estimado: R$ 97,00</span>
              <div className="flex items-baseline gap-1">
                <span className="text-slate-800 font-bold text-lg sm:text-xl">Apenas</span>
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">R$ 10,00</span>
                <span className="text-emerald-600 font-bold text-xs bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">Economize R$ 87</span>
              </div>
            </div>

            {/* Quick Timer wrapper for action block */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 shadow-2xs">
              <span className="animate-ping w-2 h-2 rounded-full bg-red-500 mr-1" />
              <span>A oferta expira em: </span>
              <strong className="text-red-500 font-mono text-sm tracking-widest">{timerStr}</strong>
            </div>

            {/* Main Action Call button */}
            <div className="pt-2">
              <button
                onClick={handleScrollToPricing}
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black px-8 py-4 sm:py-4.5 rounded-xl shadow-xs hover:shadow-lg transform active:scale-97 transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>👉 Obtenha Acesso Instantâneo Agora ➔</span>
              </button>
              
              {/* Payment methods badge link */}
              <div className="mt-[5px] flex flex-col items-center md:items-start gap-[5px]">
                <img 
                  src="https://res.cloudinary.com/dm2glkkcv/image/upload/e_trim/v1780970759/ChatGPT_Image_8_de_jun._de_2026_23_05_19_l5xojq.png" 
                  alt="Metodos de pagamento seguro"
                  className="w-full max-w-[290px] h-auto object-contain select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Score badge summary */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50/50 px-3 py-1 rounded-lg border border-emerald-100 mt-[5px]">
                  <div className="flex gap-0.5 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-500" />)}
                  </div>
                  <span><strong>4.9 / 5</strong> — Avaliado por 2.845 compradores verificados</span>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Right Preview Image Mockup representation */}
          <div className="relative group flex items-center justify-center animate-in fade-in slide-in-from-right-4 duration-500 order-first md:order-last">
            <div className="absolute inset-0 bg-yellow-100/40 rounded-3xl transform rotate-1.5" />
            <div className="relative bg-slate-50 border border-slate-200/60 p-4 rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
              <img 
                src="https://res.cloudinary.com/dm2glkkcv/image/upload/v1780856506/ChatGPT_Image_7_de_jun._de_2026_15_14_48_uhjggt.png" 
                alt="Demonstração do Pacote Premium e Projetos Cortados"
                className="w-full h-auto rounded-2xl shadow-xs select-none pointer-events-none group-hover:scale-101 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </header>

      {/* 3. 5-STATS COUNTER PANEL */}
      <section className="bg-slate-900 border-b-2 border-yellow-400 py-6 text-white text-center font-sans">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="py-2 space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-yellow-400 leading-none">700K+</div>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-bold">Arquivos de Projetos</p>
          </div>
          <div className="py-2 space-y-1 border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-yellow-400 leading-none">100 GB</div>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-bold">Tamanho Total</p>
          </div>
          <div className="py-2 space-y-1 block md:border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-yellow-400 leading-none">40+</div>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-bold">Categorias Livres</p>
          </div>
          <div className="py-2 space-y-1 border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-yellow-400 leading-none">2.000+</div>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-bold">Criadores de Felicidade</p>
          </div>
          <div className="py-2 space-y-1 border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-yellow-400 leading-none">7</div>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-bold">Formatos de Arquivo</p>
          </div>
        </div>
      </section>

      {/* 4. WHAT'S INSIDE SECTION */}
      <section id="features" className="py-14 sm:py-18 px-4 max-w-6xl mx-auto font-sans">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-50 px-3 py-1 rounded-full">
            Tudo o que você precisa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-3 leading-tight">
            Tudo o que você precisa para <span className="text-yellow-500">criar e vender</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Pare de perder precioso tempo desenhando do zero ou remendando vetores quebrados. Garanta um pacote profissional testado, formatado por especialistas e compatível com todas as máquinas.
          </p>
        </div>

        {/* 9 Product Images Display Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-14 max-w-4xl mx-auto">
          {INSIDE_GRID_IMAGES.map((imgUrl, index) => (
            <div 
              key={index}
              onClick={() => setLightbox({ url: imgUrl, title: `Amostra Ilustrativa de Recorte #${index + 1}` })}
              className="relative aspect-square rounded-lg sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/50 shadow-2xs hover:shadow-md cursor-zoom-in group transition-all"
              title="Clique para Visualizar em Tamanho Maior"
            >
              <img 
                src={imgUrl} 
                alt={`Amostra de gravação vector n${index}`} 
                className="w-full h-full object-cover group-hover:scale-103 transition-all duration-300 pointer-events-none select-none"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          ))}
        </div>

        {/* 6 Key Feature Cards Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl space-y-3 hover:border-yellow-400/50 shadow-2xs transition-all duration-200">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg border border-blue-100">
              📁
            </div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">700.000+ Arquivos Prontos</h3>
            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">
              Vetores confeccionados por projetistas e testados em oficinas reais. Caminhos bem traçados com encaixes perfeitamente calculados, livres de nós duplicados.
            </p>
          </div>

          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl space-y-3 hover:border-yellow-400/50 shadow-2xs transition-all duration-200">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold text-lg border border-purple-100">
              🗂️
            </div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">40+ Categorias Organizadas</h3>
            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">
              Descubra qualquer vetor em minutos. Os arquivos estão subdivididos em diretórios limpos para cada nicho comercial, eliminando garimpos confusos.
            </p>
          </div>

          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl space-y-3 hover:border-yellow-400/50 shadow-2xs transition-all duration-200">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center font-bold text-lg border border-teal-100">
              ⚡
            </div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">Acesso Imediato ao Google Drive</h3>
            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">
              Seu acesso privilegiado é emitido na mesma hora após comprovação do pagamento. Receba as chaves no e-mail, podendo sincronizar ou baixar imediatamente.
            </p>
          </div>

          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl space-y-3 hover:border-yellow-400/50 shadow-2xs transition-all duration-200">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-bold text-lg border border-orange-100">
              💼
            </div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">Licença Comercial Inclusa</h3>
            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">
              Venda seus produtos finais em madeira, acrílico ou couro em grandes lojas como Etsy, Shopee, ou para clientes locais de móveis planejados.
            </p>
          </div>

          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl space-y-3 hover:border-yellow-400/50 shadow-2xs transition-all duration-200">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg border border-emerald-100">
              🏭
            </div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">Todas as Máquinas Suportadas</h3>
            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">
              Seja CO₂, Fibra Óptica, Fresadora CNC, Cortadores de Diodo ou Jato d'Água. Os arquivos contam com camadas ajustadas a potência variada de lentes.
            </p>
          </div>

          <div className="bg-white border border-slate-200/60 p-6 rounded-2xl space-y-3 hover:border-yellow-400/50 shadow-2xs transition-all duration-200">
            <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center font-bold text-lg border border-yellow-100">
              ♾️
            </div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">Acesso Vitalício + Livre de Custos</h3>
            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">
              Pague uma única vez. Sempre que nossa oficina interna disponibilizar novas coleções digitais, adicionaremos na sua pasta sem cobrar mais nada.
            </p>
          </div>
        </div>

        {/* 7 supported Formats Pill summary */}
        <div className="mt-10 p-5 bg-slate-50 border border-slate-200/50 rounded-2xl text-center space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center justify-center gap-1">
            <span>Todos os 7 formatos premium incluídos no lote</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-yellow-400 text-slate-900 border border-yellow-400/50 font-black text-xs sm:text-sm px-4 py-1.5 rounded-xl shadow-2xs">SVG</span>
            <span className="bg-yellow-300 text-slate-950 border border-yellow-300/40 font-black text-xs sm:text-sm px-4 py-1.5 rounded-xl shadow-2xs">DXF</span>
            <span className="bg-white text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm px-4 py-1.5 rounded-xl">AI</span>
            <span className="bg-white text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm px-4 py-1.5 rounded-xl">CDR</span>
            <span className="bg-white text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm px-4 py-1.5 rounded-xl">PNG</span>
            <span className="bg-white text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm px-4 py-1.5 rounded-xl">PDF</span>
            <span className="bg-white text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm px-4 py-1.5 rounded-xl">EPS</span>
          </div>
        </div>

      </section>

      {/* 5. CATEGORIES BROWSER MODULE */}
      <CategoryExplorer 
        onSelectBuy={handleScrollToPricing}
        onImageClick={(url, title) => setLightbox({ url, title })}
      />

      {/* 6. REAL CLIENTS TESTIMONIALS MODULE */}
      <ReviewsSection />

      {/* 7. COMPARATIVE VALUE TABLE SECTION */}
      <section className="py-14 bg-slate-50 border-t border-slate-200/40 font-sans">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Por que escolher este pacote?</span>
            <h2 className="text-3xl font-extrabold text-slate-800 mt-2">Compare suas <span className="text-yellow-500">opções</span></h2>
            <p className="text-slate-500 text-xs mt-2">Veja por que milhares de artesãos, marceneiros e criadores preferem investir apenas R$ 10 neste pacote consolidado.</p>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden scrollbar-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-bold tracking-widest uppercase">
                    <th className="p-4 border-r border-slate-800">Recurso Clave</th>
                    <th className="p-4 border-r border-slate-800 text-slate-300">Arquivos Gratuitos</th>
                    <th className="p-4 border-r border-slate-800 text-yellow-300 bg-slate-800 font-black">🏆 Este Pacote</th>
                    <th className="p-4">Contratar um Designer</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-medium text-slate-600 divide-y divide-slate-100">
                  {COMPARE_ROWS.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/40' : 'bg-white'}>
                      <td className="p-4 font-bold text-slate-800 border-r border-slate-100">{row.feature}</td>
                      <td className="p-4 border-r border-slate-100 flex items-center gap-1.5 text-slate-500">
                        {row.freeCheck === true ? <span className="text-emerald-600">✔ {row.free}</span> : row.freeCheck === false ? <span className="text-red-500">✗ {row.free}</span> : <span>{row.free}</span>}
                      </td>
                      <td className="p-4 border-r border-slate-200 bg-yellow-50/20 font-bold text-slate-900">
                        <span className="flex items-center gap-1 text-emerald-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{row.thisBundle}</span>
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">
                        {row.designerCheck === false ? <span className="text-red-500">✗ {row.designer}</span> : <span>{row.designer}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 8. WHO WE ARE & TRUST EMBLEMS */}
      <section className="py-16 px-4 max-w-4xl mx-auto font-sans">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-50 px-3 py-1 rounded-full">
            Compre Com Total Confiança
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 mt-3 leading-tight">
            Por que mais de <span className="text-yellow-500">2.000 fabricantes</span> confiam em nós?
          </h2>
        </div>

        {/* 8 Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center sm:text-left mb-10 max-w-3xl mx-auto">
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col sm:flex-row items-center gap-2">
            <span className="text-xl">🔒</span>
            <div className="text-[11px] font-bold text-slate-700">Garantia Reembolso 7 Dias</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col sm:flex-row items-center gap-2">
            <span className="text-xl">⚡</span>
            <div className="text-[11px] font-bold text-slate-700">Acesso Instantâneo Drive</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col sm:flex-row items-center gap-2">
            <span className="text-xl">♾️</span>
            <div className="text-[11px] font-bold text-slate-700">Acesso Vitalício Único</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col sm:flex-row items-center gap-2">
            <span className="text-xl">✅</span>
            <div className="text-[11px] font-bold text-slate-700">Arquivos Testados Máquinas</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col sm:flex-row items-center gap-2">
            <span className="text-xl">💼</span>
            <div className="text-[11px] font-bold text-slate-700">Licença Comercial Inclusa</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col sm:flex-row items-center gap-2">
            <span className="text-xl">🔄</span>
            <div className="text-[11px] font-bold text-slate-700">Atualizações para Sempre</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col sm:flex-row items-center gap-2">
            <span className="text-xl">📧</span>
            <div className="text-[11px] font-bold text-slate-700">Suporte Dedicado E-mail</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col sm:flex-row items-center gap-2">
            <span className="text-xl">🛠️</span>
            <div className="text-[11px] font-bold text-slate-700">Funciona Qualquer Software</div>
          </div>
        </div>

        {/* Google Drive Folder Desktop Preview Mockup image */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md max-w-2xl mx-auto bg-slate-950">
          <img 
            src="https://thelaserdesign.store/wp-content/uploads/2026/05/screngoogledrivecnc.png" 
            alt="Google Drive Pasta Demonstracao Organizada"
            className="w-full h-auto select-none pointer-events-none opacity-90"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 text-center text-white">
            <p className="text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Conexão Compartilhada Privada via Google Workspace</span>
            </p>
          </div>
        </div>

        {/* Highlighted Buy Box */}
        <div id="pricing-card" className="mt-12 bg-white border-2 border-yellow-400 rounded-3xl p-6 sm:p-8 shadow-xl max-w-sm sm:max-w-md mx-auto text-center space-y-4">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-[10px] md:text-xs font-black tracking-widest px-4 py-1 rounded-full uppercase">
            ⚡ Garanta Já o Seu Desconto!
          </span>
          
          <div>
            <span className="text-xs line-through text-slate-400 font-bold block">Preço de tabela: R$ 97,00</span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1">R$ 10,00</div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1 inline-block mt-1">
              Economize R$ 87 hoje mesmo
            </span>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 text-xs font-semibold text-slate-600 flex items-center justify-center gap-2">
            <span className="animate-pulse w-2 h-2 rounded-full bg-red-400" />
            <span>A oferta terminará em: <strong className="text-red-500 font-mono text-sm">{timerStr}</strong></span>
          </div>

          {/* Advantages list */}
          <div className="text-left bg-slate-50 border border-slate-100/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-semibold leading-tight">
              <Check className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>+ 700.000 Arquivos Prontos</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-semibold leading-tight">
              <Check className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Mais de 100 GB em SVG, DXF, AI, PNG, EPS, PDF e CDR</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-semibold leading-tight">
              <Check className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>40+ Categorias Organizadas</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-semibold leading-tight">
              <Check className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Acesso Imediato ao Google Drive</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-semibold leading-tight">
              <Check className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Todas as Máquinas Suportadas</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-semibold leading-tight">
              <Check className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Licença Comercial Inclusa</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-semibold leading-tight">
              <Check className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Acesso Vitalício</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-semibold leading-tight">
              <Check className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>7 Dias de Garantia</span>
            </div>
          </div>

          <button
            onClick={handleOpenCheckout}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black py-4 px-6 rounded-xl shadow-xs hover:shadow-md transform active:scale-97 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Obtenha acesso instantâneo — R$ 10 →</span>
          </button>

          <img 
            src="https://res.cloudinary.com/dm2glkkcv/image/upload/e_trim/v1780970759/ChatGPT_Image_8_de_jun._de_2026_23_05_19_l5xojq.png" 
            alt="Segurança Metodos"
            className="w-full max-w-[290px] h-auto mx-auto object-contain select-none !mt-[5px]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          <div className="flex justify-center gap-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider !mt-[5px]">
            <span>🔒 Seguro</span>
            <span>·</span>
            <span>⚡ Instantâneo</span>
            <span>·</span>
            <span>↩️ 7 Dias Garantidos</span>
          </div>

        </div>

      </section>

      {/* 9. FAQ ACCORDION */}
      <section id="faq" className="py-14 sm:py-18 bg-slate-50 border-t border-slate-200/50 font-sans">
        <div className="max-w-3xl mx-auto px-4">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Dúvidas Frequentes</span>
            <h2 className="text-3xl font-extrabold text-slate-800 mt-2">Perguntas <span className="text-yellow-500">frequentes</span></h2>
          </div>

          {/* FAQ Accordion container */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="transition-colors duration-200">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-5 py-4.5 text-left font-bold text-slate-800 text-sm sm:text-base flex justify-between items-center gap-4 hover:bg-slate-50/60 focus:outline-hidden transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transform transition-transform duration-250 ${
                      isOpen ? 'rotate-180 text-yellow-500' : ''
                    }`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-500 text-xs sm:text-[13.5px] leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. BOTTOM BIG BANNER CTA */}
      <section className="bg-slate-900 border-t-2 border-yellow-400 py-20 text-white text-center font-sans">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <span className="text-yellow-400 text-xs font-black tracking-widest uppercase bg-slate-800 px-4 py-1.5 rounded-full">
            NÃO PERCA ESTA OPORTUNIDADE!
          </span>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Pronto para desbloquear <span className="text-yellow-400">mais de 700.000 arquivos</span> por apenas <span className="text-yellow-400">R$ 10</span>?
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Acesso vitalício imediato · Licença comercial para revenda de peças físicas inclusa · Garantia incondicional de reembolso por 7 dias. Seu workshop agradece.
          </p>

          <div className="max-w-md mx-auto aspect-video rounded-2xl overflow-hidden border-2 border-slate-800 shadow-lg">
            <img 
              src="https://thelaserdesign.store/wp-content/uploads/2025/06/ChatGPT-Image-May-8-2025-12_22_04-PM-1.png" 
              alt="Mockup Colecao Completa de Designs Laser"
              className="w-full h-full object-cover select-none pointer-events-none shadow"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="pt-4">
            <button
              onClick={handleScrollToPricing}
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black px-10 py-4 sm:py-5 rounded-2xl text-sm sm:text-base md:text-lg shadow-xs hover:shadow-xl transform active:scale-97 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <span>🛒 Obtenha acesso instantâneo — Apenas R$ 10 →</span>
            </button>
            <p className="text-[10px] text-slate-400 mt-2">Aumento de preços após o término desta oferta limitada · Transação 100% Criptografada</p>
          </div>

          {/* Secure seals footer trust */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-500 font-bold tracking-widest uppercase pt-6">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Pagamento Seguro</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> Avaliação 4.9/5</span>
            <span>·</span>
            <span>↩️ Reembolso em 7 dias</span>
            <span>·</span>
            <span>⚡ Acesso Instantâneo</span>
            <span>·</span>
            <span>Licença Vitalícia</span>
          </div>

        </div>
      </section>

      {/* 11. EXTRAVAGANT FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900 text-center text-xs space-y-4 font-sans">
        <div className="max-w-4xl mx-auto px-4 divide-y divide-slate-900 space-y-4">
          <div className="space-y-1">
            <p className="font-extrabold text-sm text-slate-300">The Laser Design Store</p>
            <p className="text-slate-500">London, United Kingdom</p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4 text-[11px] text-slate-500">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 underline">Política de Privacidade</a>
            <span>·</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 underline">Política de Reembolso</a>
            <span>·</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 underline">Termos de Serviço</a>
          </div>

          <div className="pt-4 text-[10px] text-slate-600 space-y-1.5 leading-relaxed">
            <p>Este site não faz parte do site do Facebook ou Facebook Inc. Além disso, este site NÃO é endossado pelo Facebook de nenhuma maneira. FACEBOOK é uma marca comercial da FACEBOOK, Inc.</p>
            <p>© 2026 The Laser Design Store. Todos os direitos reservados. Imagens e vetores adicionais sob licença de simulação.</p>
          </div>
        </div>
      </footer>

      {/* 12. CHECKOUT MODAL WINDOW COMPONENT */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        initialStep={initialCheckoutStep}
        initialName={prefilledName}
        initialEmail={prefilledEmail}
      />

      {/* 13. FULL EXPANDED PORTRAIT LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-950 p-2 rounded-2xl shadow-2xl flex flex-col">
            <button 
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white cursor-pointer transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-square sm:aspect-4/3 w-full bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src={lightbox.url} 
                alt={lightbox.title} 
                className="max-h-[80vh] max-w-full object-contain pointer-events-none select-none"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-white font-black text-sm sm:text-base">{lightbox.title}</p>
              <p className="text-slate-400 text-xs mt-1">Design de precisão limpo em alta definição — Compatível com LightBurn e AutoCAD</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
