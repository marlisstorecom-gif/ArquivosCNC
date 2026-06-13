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
  TrendingUp,
  XCircle,
  TrendingDown,
  ChevronRight
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

  // Countdown timer for 10 minutes (Urgency)
  useEffect(() => {
    let totalSeconds = 10 * 60;
    const interval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(interval);
      } else {
        totalSeconds -= 1;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setTimeLeft({ minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  // Streamlined niches as a direct checklist
  const niches: NicheItem[] = [
    { id: "religiosos", title: "Vetores Religiosos (Imagens sacras e quadros)", count: "180+ Modelos", badge: "Alta Venda" },
    { id: "chaveiros", title: "Vetores de Chaveiros & Lembrancinhas", count: "500+ Modelos", badge: "Consumo Zero" },
    { id: "tabua", title: "Vetores de Tábua de Cortar & Churrasco", count: "120+ Modelos", badge: "Gourmet" },
    { id: "caixas", title: "Mais de 1.000 Modelos de Caixas MDF", count: "1.000+ Caixas", badge: "Sem Cola" },
    { id: "miniaturas", title: "Vetores Miniaturas de Carros (Projetos 3D)", count: "70+ Projetos" },
    { id: "times", title: "Escudos & Quadros de Times do Mundo", count: "250+ Brasões", badge: "Esportes" },
    { id: "higiene", title: "Kits Higiene Bebê & Farmacinhas", count: "80+ Unidades", badge: "Maternidade" },
    { id: "trofeus", title: "Vetores de Troféus e Medalhas", count: "150+ Modelos" },
    { id: "pascoa", title: "Coleção Completa de Páscoa Sazonal", count: "130+ Designs" },
    { id: "maes", title: "Especial Dia das Mães (Porta-joias, quadros)", count: "160+ Vetores", badge: "Recorde" },
    { id: "pais", title: "Especial Dia dos Pais (Rústicos e Chaveiros)", count: "140+ Vetores" },
    { id: "namorados", title: "Especial Dia dos Namorados (Caixas surpresa)", count: "120+ Vetores", badge: "Viral" },
    { id: "natal", title: "Mega Pack Natalino (Presépios, Enfeites, Guirlandas)", count: "300+ Modelos" }
  ];

  const handleDeclineUpsell = () => {
    // Redirect back to main page with success parameter
    window.location.search = "status=success&checkout_success=true";
  };

  const handleBuyUpsell = () => {
    setLoading(true);
    // Dynamic integration with checkout link of the upgrade
    window.location.href = "https://go.pepperpay.com.br/d85ef";
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans antialiased selection:bg-yellow-500 selection:text-slate-950 pb-24 relative">
      {/* Top Urgent Bar Indicator */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-400 animate-pulse z-50"></div>
      
      {/* Dynamic Header Guard */}
      <div className="bg-red-950/90 border-b border-red-850 text-white py-3 px-4 text-center sticky top-0 z-40 backdrop-blur-md shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-1.5 text-xs sm:text-sm font-black tracking-tight">
          <span className="inline-flex items-center gap-1.5 text-yellow-400">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
            🚨 ATENÇÃO: NÃO ATUALIZE OU FECHE ESTA PÁGINA!
          </span>
          <span className="text-amber-100 sm:font-semibold">Seu pedido principal já foi confirmado. Esta é uma oportunidade única e imperdível.</span>
        </div>
      </div>

      {/* Modern Progress Tracker - Highly Responsive */}
      <div className="max-w-4xl mx-auto px-4 mt-8 sm:mt-12">
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex justify-between items-center text-xs sm:text-sm shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold shrink-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-[10px] sm:text-xs">✓</div>
            <span>Pedido Confirmado</span>
          </div>
          <div className="h-[2px] flex-1 bg-emerald-500/20 mx-3 sm:mx-6"></div>
          <div className="flex items-center gap-2 text-yellow-400 font-bold shrink-0 animate-pulse">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center text-[10px] sm:text-xs shadow-[0_0_8px_rgba(250,204,21,0.5)]">2</div>
            <span>Upgrade Ativado</span>
          </div>
          <div className="h-[2px] flex-1 bg-slate-800 mx-3 sm:mx-6 hidden xs:block"></div>
          <div className="hidden xs:flex items-center gap-2 text-slate-500 font-medium shrink-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-800 border border-slate-705 flex items-center justify-center text-[10px] sm:text-xs">3</div>
            <span>Acesso Liberado</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 sm:mt-12 text-center">
        {/* Confirmed Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold px-4 py-2 rounded-full mb-6">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> COMPRA PRINCIPAL SALVA COM SUCESSO!
        </div>

        {/* Big Strategic Title heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white mb-4">
          Multiplique Seus Ganhos! Adicione a <span className="text-yellow-400 underline underline-offset-4 decoration-yellow-400/40">Mega Coleção Organizada por Nichos</span> de Sucesso
        </h1>
        
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
          Nós já organizamos e separamos os filetes de ouro do mercado de corte a laser. Em vez de perder semanas baixando arquivos repetidos ou desatualizados, adicione de uma única vez <span className="text-yellow-300 font-bold">os 13 nichos que respondem por 95% do faturamento</span> do setor.
        </p>

        {/* Floating Urgency Countdown banner - Centered & Crisp */}
        <div className="max-w-md mx-auto bg-slate-900/90 border border-yellow-500/30 rounded-2xl p-4 mb-10 flex items-center justify-between shadow-2xl relative overflow-hidden backdrop-blur-xs">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full filter blur-xl pointer-events-none"></div>
          <div className="flex items-center gap-2.5 text-left">
            <div className="bg-yellow-400/10 p-2 rounded-lg border border-yellow-400/20 shrink-0">
              <Clock className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-yellow-400 font-black tracking-widest uppercase">Oferta de Upgrade Exclusiva</p>
              <p className="text-[11px] text-slate-400 leading-none mt-0.5">Seu desconto expira em:</p>
            </div>
          </div>
          <div className="bg-yellow-400 text-slate-950 px-3.5 py-1.5 rounded-lg font-mono text-lg sm:text-xl font-black tracking-wider shadow-sm shrink-0">
            {formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
          </div>
        </div>

        {/* Interactive Compact Checklist Grid instead of Cards with long texts */}
        <div className="text-left mb-12">
          <h2 className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-slate-400 text-center mb-6">
            ✨ O QUE ENTRARÁ AGORA NO SEU DRIVE DE ACESSOS:
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {niches.map((niche) => (
              <div 
                key={niche.id}
                className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3 sm:p-3.5 flex items-center gap-3 hover:border-emerald-500/40 hover:bg-slate-905 transition-all text-left relative group overflow-hidden"
              >
                {/* Clean beautiful green check circle */}
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_8px_rgba(16,185,129,0.15)]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-slate-100 text-xs sm:text-sm font-bold tracking-tight truncate group-hover:text-white transition-colors">
                      {niche.title}
                    </span>
                    {niche.badge && (
                      <span className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 text-[8px] font-black tracking-wider px-1.5 py-0.2 rounded-md uppercase shrink-0">
                        {niche.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">{niche.count}</span>
                    <span className="text-[9px] text-slate-500">• Testados & Prontos</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-xs text-slate-500 mt-4 italic">
            *Todos os arquivos em formatos editáveis universais: `.CDR`, `.DXF`, `.AI`, `.SVG`, `.LBRN` para abertura imediata.
          </p>
        </div>

        {/* COMPARATIVE ADVANTAGE CARD - Strategic, Clean & Responsive */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-left mb-12 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full filter blur-2xl pointer-events-none"></div>
          
          <div className="border-b border-slate-800/70 pb-4 mb-6">
            <div className="inline-flex items-center gap-1.5 bg-yellow-400/15 text-yellow-400 text-[10px] md:text-xs font-black tracking-widest px-3 py-1 rounded-full uppercase mb-2">
              <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> ANÁLISE ESTRATÉGICA
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">Por que esta MEGA COLEÇÃO é indispensável agora?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Dark Side: buying individual or messy items */}
            <div className="space-y-3 bg-red-950/10 border border-red-900/20 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs sm:text-sm">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Sem o Upgrade de Nichos</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-xs">•</span>
                  <span>Você terá que procurar mídias avulsas gasta-tempo e pagar mais de <strong>R$ 15,00 por vetor</strong> de nicho individual.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-xs">•</span>
                  <span><strong>Perda de nichos lucrativos</strong> como religiosos e tábuas gourmet, deixando dinheiro na mesa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-xs">•</span>
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
              <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 text-xs font-bold">✓</span>
                  <span>Mais de <strong>2.900+ vetores profissionais</strong> prontificados para faturamento constante por apenas R$ 29,90.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 text-xs font-bold">✓</span>
                  <span>Garantia de <strong>tamanhos e juntas testadas em máquinas reais</strong> (MDF e acrílico sintonizados).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 text-xs font-bold">✓</span>
                  <span>Pastas organizadas que poupam meses de pesquisa tediosa. Chegará tudo no seu e-mail em segundos.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* PRICING OFFER - Responsive & Non-polluted (Sem Poluição) */}
        <div className="bg-slate-900/90 border-2 border-yellow-400/90 rounded-3xl p-6 sm:p-10 max-w-lg mx-auto text-center shadow-[0_15px_40px_rgba(250,204,21,0.15)] relative">
          
          <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-950 text-[10px] sm:text-xs font-black tracking-widest px-5 py-1 rounded-full uppercase shadow-md shrink-0">
            OPÇÃO RECOMENDADA
          </div>

          <h3 className="text-slate-400 text-xs font-bold tracking-widest uppercase mt-2 mb-1">PROMOÇÃO DE ADESÃO</h3>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">Adicionar a "Mega Coleção" ao Meu Drive</h2>

          <div className="my-6 border-y border-slate-800/80 py-4 flex flex-col items-center justify-center">
            <span className="text-slate-500 line-through text-xs sm:text-sm">De R$ 197,00</span>
            <div className="flex items-center gap-1.5 mt-0.5 justify-center">
              <span className="text-slate-400 text-xs sm:text-sm font-medium">Por Apenas</span>
              <span className="text-4xl sm:text-5xl font-black text-yellow-400 tracking-tight">R$ 29,90</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-extrabold tracking-widest uppercase mt-1">PAGAMENTO ÚNICO • SEM ASSINATURA</span>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed max-w-md mx-auto">
            Garantia total de satisfação: Adicione agora ao seu pedido. Seus acessos aos novos nichos serão enviados imediatamente junto com a sua primeira compra.
          </p>

          <button
            onClick={handleBuyUpsell}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-white font-black py-4 sm:py-5 px-6 rounded-2xl shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.5)] transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 cursor-pointer border-0"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>👉 SIM, QUERO ATIVAR ESSE UPGRADE POR R$ 29,90!</span>
              </>
            )}
          </button>

          {/* High Trust indicators underneath */}
          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-800/60 max-w-sm mx-auto">
            <div className="flex flex-col items-center justify-center text-[9px] sm:text-[10px] text-slate-500">
              <Lock className="w-3.5 h-3.5 text-slate-500 mb-1" />
              <span>Conexão Segura</span>
            </div>
            <div className="flex flex-col items-center justify-center text-[9px] sm:text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 mb-1" />
              <span>Entrega Imediata</span>
            </div>
            <div className="flex flex-col items-center justify-center text-[9px] sm:text-[10px] text-slate-500">
              <Award className="w-3.5 h-3.5 text-yellow-500 mb-1" />
              <span>Qualidade 3D</span>
            </div>
          </div>
        </div>

        {/* Downsell Link - Clean and clear */}
        <div className="mt-10 max-w-md mx-auto">
          <button
            onClick={handleDeclineUpsell}
            className="text-slate-500 hover:text-red-400 underline text-xs tracking-wide font-medium transition-colors bg-transparent border-0 cursor-pointer p-2 inline-block max-w-[90%] sm:max-w-none text-center"
          >
            ❌ Não quero essa super vantagem de R$ 29,90. Prefiro continuar apenas com o pacote de R$ 10,00 e perder as atualizações automáticas de nicho para sempre.
          </button>
        </div>
      </div>
    </div>
  );
}
