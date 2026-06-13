import { useState, useEffect } from "react";
import { 
  Flame, 
  Clock, 
  Check, 
  Sparkles, 
  Heart, 
  Lock, 
  ShieldCheck, 
  Trophy, 
  Gift, 
  Box, 
  Car, 
  Award, 
  Baby, 
  Zap,
  XCircle
} from "lucide-react";

interface NicheItem {
  id: string;
  title: string;
  count: string;
  badge?: string;
}

export default function UpsellPage() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 9, seconds: 59 });
  const [loading, setLoading] = useState(false);

  // Robust Mobile-safe Countdown using precise timestamp delta
  useEffect(() => {
    const DURATION_MS = 10 * 60 * 1000; // 10 minutes
    
    // Retrieve or initialize the target timestamp from sessionStorage
    let targetStr = sessionStorage.getItem("marlis_upsell_timer_target");
    let targetTime: number;

    if (!targetStr) {
      targetTime = Date.now() + DURATION_MS;
      sessionStorage.setItem("marlis_upsell_timer_target", String(targetTime));
    } else {
      targetTime = parseInt(targetStr, 10);
      // If the timer expired in a previous session or is corrupted, reset it
      if (isNaN(targetTime) || Date.now() > targetTime || targetTime - Date.now() > DURATION_MS) {
        targetTime = Date.now() + DURATION_MS;
        sessionStorage.setItem("marlis_upsell_timer_target", String(targetTime));
      }
    }

    const calculateTimeLeft = () => {
      const difference = targetTime - Date.now();
      if (difference <= 0) {
        setTimeLeft({ minutes: 0, seconds: 0 });
        return false;
      }
      
      const totalSeconds = Math.floor(difference / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      setTimeLeft({ minutes, seconds });
      return true;
    };

    // Run once immediately
    calculateTimeLeft();

    // Use a 500ms heartbeat interval for high precision on mobile screens
    const intervalRef = setInterval(() => {
      const active = calculateTimeLeft();
      if (!active) {
        clearInterval(intervalRef);
      }
    }, 500);

    return () => clearInterval(intervalRef);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  // Streamlined Niches list with counts exactly summing to 5.000 files!
  const niches: NicheItem[] = [
    { id: "religiosos", title: "Vetores Religiosos (Pinturas, passagens e cruzes)", count: "500 Arquivos", badge: "Alta Venda" },
    { id: "chaveiros", title: "Vetores de Chaveiros (Brindes rápidos e logos)", count: "900 Arquivos", badge: "Consumo Zero" },
    { id: "tabua", title: "Vetores de Tábua de Cortar (Gourmet, churrasco)", count: "250 Arquivos", badge: "Gourmet" },
    { id: "caixas", title: "Modelos Variados de Caixas Organizadoras MDF", count: "1.100 Arquivos", badge: "Sem Cola" },
    { id: "miniaturas", title: "Vetores Miniaturas de Carros (Encaixes 3D)", count: "150 Arquivos" },
    { id: "times", title: "Times de Todo o Mundo (Brasões e logos vazados)", count: "350 Arquivos", badge: "Esportes" },
    { id: "higiene", title: "Kit Higiene Bebê (Farmacinhas e decorativo)", count: "150 Arquivos", badge: "Maternidade" },
    { id: "trofeus", title: "Vetores para Troféus e Medalhas de Honra", count: "150 Arquivos" },
    { id: "pascoa", title: "Kit Páscoa (Cestas e decorações temáticas)", count: "200 Arquivos" },
    { id: "maes", title: "Dia das Mães (Portas-joias, mandalas emotivas)", count: "250 Arquivos", badge: "Recorde" },
    { id: "pais", title: "Dia dos Pais (Abridores de MDF, quadros rústicos)", count: "200 Arquivos" },
    { id: "namorados", title: "Dia dos Namorados (Mecanismos e caixas amorosas)", count: "150 Arquivos", badge: "Viral" },
    { id: "natal", title: "Especial de Natal (Presépios 3D e guirlandas)", count: "650 Arquivos" }
  ];

  const handleDeclineUpsell = () => {
    // Redirect back to main page or access point
    window.location.search = "status=success&checkout_success=true";
  };

  const handleBuyUpsell = () => {
    setLoading(true);
    // Secure purchase funnel redirect
    window.location.href = "https://go.pepperpay.com.br/d85ef";
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans antialiased selection:bg-yellow-500 selection:text-slate-950 pb-24 relative">
      {/* Top Urgent Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-400 animate-pulse z-50"></div>
      
      {/* Header Warning Bar */}
      <div className="bg-red-950 border-b border-red-800 text-white py-3 px-4 text-center sticky top-0 z-45 backdrop-blur-md shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-1 text-xs font-black tracking-tight">
          <span className="inline-flex items-center gap-1.5 text-yellow-400">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            🚨 ATENÇÃO: NÃO FECHE ESTA PÁGINA!
          </span>
          <span className="text-amber-100 font-semibold">Sua compra principal está garantida. Esta oferta de nichos premium expira em segundos.</span>
        </div>
      </div>

      {/* STRATEGIC AND RESPONSIVE PROGRESS MAP (Single Line / Uma Única Linha) */}
      <div className="max-w-xl mx-auto px-4 mt-6 sm:mt-10">
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-xl p-2.5 sm:p-3.5 flex items-center justify-between text-[9px] min-[360px]:text-[10px] xs:text-xs sm:text-sm font-bold shadow-xl">
          {/* Step 1 */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-emerald-400 shrink-0 select-none">
            <div className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-[8px] font-black shrink-0">✓</div>
            <span className="whitespace-nowrap font-extrabold">Pedido Confirmado</span>
          </div>

          {/* Connector */}
          <div className="h-[1px] flex-1 bg-emerald-500/30 mx-1.5 sm:mx-3"></div>

          {/* Step 2 */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-yellow-400 shrink-0 font-extrabold select-none">
            <div className="w-4.5 h-4.5 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center text-[8px] shadow-[0_0_8px_rgba(250,204,21,0.5)] animate-pulse shrink-0">2</div>
            <span className="whitespace-nowrap font-black">Upgrade Ativado</span>
          </div>

          {/* Connector */}
          <div className="h-[1px] flex-1 bg-slate-800 mx-1.5 sm:mx-3"></div>

          {/* Step 3 */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-slate-500 shrink-0 font-semibold select-none">
            <div className="w-4.5 h-4.5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[8px] shrink-0">3</div>
            <span className="whitespace-nowrap">Material</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 sm:mt-12 text-center">
        {/* Confirmed Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold px-4 py-2 rounded-full mb-6">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> COMPRA PRINCIPAL SALVA COM SUCESSO!
        </div>

        {/* Catchy Main Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white mb-4">
          Multiplique Seus Ganhos! Adicione a <span className="text-yellow-400 underline decoration-yellow-400/40">Mega Coleção com 5.000 Vetores Organizados</span> de Sucesso
        </h1>
        
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto mb-8 leading-relaxed">
          Nós já organizamos e separamos os filetes de ouro do mercado de corte a laser. Em vez de perder semanas baixando arquivos repetidos ou desatualizados, adicione de uma única vez <span className="text-yellow-300 font-bold">os 13 nichos que respondem por 95% do faturamento</span> com mais de <span className="text-yellow-300 font-bold">5.000 modelos testados</span>.
        </p>

        {/* Dynamic Mobile-Friendly Timer Box */}
        <div className="max-w-xs sm:max-w-sm mx-auto bg-slate-900 border border-yellow-500/30 rounded-xl p-3.5 mb-10 flex items-center justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full filter blur-xl pointer-events-none"></div>
          <div className="flex items-center gap-2 text-left">
            <div className="bg-yellow-400/10 p-2 rounded-lg border border-yellow-400/20">
              <Clock className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-[9px] text-yellow-400 font-black tracking-wider uppercase">Oportunidade única</p>
              <p className="text-[10px] text-slate-400 leading-tight">O desconto encerra em:</p>
            </div>
          </div>
          <div className="bg-yellow-400 text-slate-950 px-3 py-1 rounded-lg font-mono text-base sm:text-lg font-black tracking-widest shadow-md">
            {formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
          </div>
        </div>

        {/* Pure Checklist style block for high scannability */}
        <div className="text-left mb-12">
          <h2 className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-slate-400 text-center mb-6 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> ACESSO VIP EXCLUSIVO: 5.000 MODELOS TESTADOS & SELECIONADOS
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {niches.map((niche) => (
              <div 
                key={niche.id}
                className="bg-slate-900/30 border border-slate-800/75 rounded-xl p-3 flex items-center gap-3 hover:border-yellow-400/30 hover:bg-slate-900 transition-all text-left group"
              >
                {/* Emerald Green Checked Circle */}
                <div className="w-5.5 h-5.5 rounded-full bg-emerald-500/10 border border-emerald-500/80 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-slate-200 text-xs font-bold tracking-tight truncate group-hover:text-white transition-colors">
                      {niche.title}
                    </span>
                    {niche.badge && (
                      <span className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 text-[7px] font-black tracking-wider px-1.5 py-0.2 rounded uppercase shrink-0">
                        {niche.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="font-mono text-emerald-400 font-bold">{niche.count}</span>
                    <span className="text-slate-500">Prontos p/ Corte</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-[10px] sm:text-xs text-slate-500 mt-4 italic">
            * Compatível e editável em Corel, Illustrator, LightBurn, AutoCAD e outros programas.
          </p>
        </div>

        {/* COMPARATIVE ADVANTAGE CARD - Strategic, Clean & Responsive */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 text-left mb-12 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full filter blur-2xl pointer-events-none"></div>
          
          <div className="border-b border-slate-800/80 pb-3 mb-5">
            <span className="bg-yellow-400/10 text-yellow-400 text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded-full uppercase">
              ANÁLISE ESTRATÉGICA
            </span>
            <h3 className="text-base sm:text-lg font-black text-white mt-1.5">
              Por que esta MEGA COLEÇÃO é indispensável agora?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dark Side: buying individual or messy items */}
            <div className="space-y-3 bg-red-950/10 border border-red-900/20 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs sm:text-sm">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Sem o Upgrade de Nichos</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Você terá que procurar mídias avulsas gasta-tempo e pagar mais de <strong>R$ 15,00 por vetor</strong> de nicho individual.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Perda de nichos lucrativos</strong> como religiosos e tábuas gourmet, deixando dinheiro na mesa.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Arquivos bagunçados que demandam correções de junção e geram desperdício de MDF no laser.</span>
                </li>
              </ul>
            </div>

            {/* Bright Side: The full bundle today */}
            <div className="space-y-3 bg-emerald-950/10 border border-emerald-900/20 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3] shrink-0" />
                <span>Com o Upgrade Completo Hoje</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-black">✓</span>
                  <span>Mais de <strong>5.000 vetores profissionais</strong> prontificados para faturamento constante por apenas R$ 29,90.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-black">✓</span>
                  <span>Garantia de <strong>tamanhos e juntas testadas em máquinas reais</strong> (MDF e acrílico sintonizados).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-black">✓</span>
                  <span>Pastas organizadas que poupam meses de pesquisa tediosa. Chegará tudo no seu e-mail em segundos.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* PRICING OFFER - Responsive & Non-polluted (Sem Poluição) */}
        <div className="bg-slate-900/90 border-2 border-yellow-400 rounded-2xl p-6 sm:p-8 max-w-md mx-auto text-center shadow-[0_12px_30px_rgba(250,204,21,0.12)] relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-950 text-[10px] sm:text-xs font-black tracking-widest px-4 py-1 rounded-full uppercase shadow-sm">
            UPGRADE RECOMENDADO
          </div>

          <h3 className="text-slate-400 text-[10px] font-black tracking-widest uppercase mt-2 mb-1">PROMOÇÃO ESPECIAL</h3>
          <h2 className="text-lg sm:text-xl font-black text-white">Adicionar a "Mega Coleção" ao Pedido</h2>

          <div className="my-5 border-y border-slate-800/80 py-3">
            <span className="text-slate-500 line-through text-xs">P preço original era R$ 197,00</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span className="text-slate-400 text-xs font-medium">Por Apenas</span>
              <span className="text-3xl sm:text-4xl font-black text-yellow-400 tracking-tight">R$ 29,90</span>
            </div>
            <span className="text-[9px] text-emerald-400 font-black tracking-widest uppercase mt-1 block">UM SÓ PAGAMENTO • SEM ASSINATURA</span>
          </div>

          <p className="text-slate-300 text-xs mb-5 leading-normal">
            Satisfação Total Garantida. Adicione a biblioteca ao seu pedido principal e comece a lucrar hoje mesmo.
          </p>

          <button
            onClick={handleBuyUpsell}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-3 px-5 rounded-xl shadow-lg transition-all text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 cursor-pointer border-0 active:scale-97"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span>👉 QUERO ADICIONAR AGORA MESMO POR R$ 29,90!</span>
            )}
          </button>

          {/* Secure elements */}
          <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-800/50 text-[9px] text-slate-500 font-medium">
            <div className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Criptografado</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Entrega imediata</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-yellow-500" />
              <span>Qualidade testada</span>
            </div>
          </div>
        </div>

        {/* Downsell Link */}
        <div className="mt-8 max-w-md mx-auto">
          <button
            onClick={handleDeclineUpsell}
            className="text-slate-500 hover:text-red-400 underline text-xs tracking-wide font-medium transition-colors bg-transparent border-0 cursor-pointer p-2 inline-block leading-relaxed text-center"
          >
            ❌ Não quero essa super vantagem de R$ 29,90. Prefiro continuar apenas com o pacote de R$ 10,00 e perder as atualizações automáticas de nicho para sempre.
          </button>
        </div>
      </div>
    </div>
  );
}
