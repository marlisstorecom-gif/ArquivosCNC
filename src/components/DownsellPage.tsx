import { useState, useEffect } from "react";
import { 
  Flame, 
  Clock, 
  Check, 
  Sparkles, 
  Lock, 
  ShieldCheck, 
  Award, 
  AlertTriangle,
  XCircle,
  HelpCircle
} from "lucide-react";

export default function DownsellPage() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 9, seconds: 59 });
  const [loading, setLoading] = useState(false);

  // Precision countdown for high conversions
  useEffect(() => {
    const DURATION_MS = 10 * 60 * 1000; // 10 minutes
    
    let targetStr = sessionStorage.getItem("marlis_downsell_timer_target");
    let targetTime: number;

    if (!targetStr) {
      targetTime = Date.now() + DURATION_MS;
      sessionStorage.setItem("marlis_downsell_timer_target", String(targetTime));
    } else {
      targetTime = parseInt(targetStr, 10);
      if (isNaN(targetTime) || Date.now() > targetTime || targetTime - Date.now() > DURATION_MS) {
        targetTime = Date.now() + DURATION_MS;
        sessionStorage.setItem("marlis_downsell_timer_target", String(targetTime));
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

    calculateTimeLeft();

    const intervalRef = setInterval(() => {
      const active = calculateTimeLeft();
      if (!active) {
        clearInterval(intervalRef);
      }
    }, 500);

    return () => clearInterval(intervalRef);
  }, []);

  // Dynamically load the Pepper Downsell script and set up approval redirects
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://go.pepperpay.com.br/js/pepper-upsell-embed.js";
    script.setAttribute("data-upsell-hash", "736lks3hzv");
    script.setAttribute("data-upsell-text", "👉 SIM! QUERO ADICIONAR O KIT ESSENCIAL POR APENAS R$ 14,90");
    script.async = true;

    const container = document.getElementById("pepper-downsell-container");
    if (container) {
      container.appendChild(script);
    }

    const handleSuccess = (e: any) => {
      console.log("Downsell approved!", e.detail?.transactionHash);
      window.history.pushState(null, "", "/obrigado");
      window.dispatchEvent(new PopStateEvent("popstate"));
    };

    window.addEventListener("pepperUpsellSuccess", handleSuccess);

    return () => {
      window.removeEventListener("pepperUpsellSuccess", handleSuccess);
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const handleDeclineDownsell = () => {
    // Redirect cleanly to the external thank you page slug, preserving query parameters
    const searchParams = window.location.search;
    window.location.href = `https://pack-arquivos-laser.netlify.app/obrigadoprincipal${searchParams}`;
  };

  const handleBuyDownsell = () => {
    setLoading(true);
    // Custom checkout redirect for the Downsell price point (R$ 14,90)
    // Adjusting redirect URL accordingly
    window.location.href = "https://go.pepperpay.com.br/d85ef";
  };

  const benefits = [
    "Vetores Religiosos",
    "Chaveiros Personalizados",
    "Tábuas Gourmet",
    "Caixas Organizadoras MDF",
    "Troféus e Medalhas",
    "Dia das Mães",
    "Dia dos Pais",
    "Natal",
    "Arquivos testados e prontos para corte",
    "Pastas organizadas para acesso rápido",
    "Compatível com CO₂, Diodo, Fibra e CNC"
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans antialiased selection:bg-yellow-500 selection:text-slate-950 pb-24 relative">
      {/* Top Urgent Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-400 animate-pulse z-50"></div>
      
      {/* Header Warning Bar */}
      <div className="bg-amber-950 border-b border-amber-900 text-white py-3 px-4 text-center sticky top-0 z-45 backdrop-blur-md shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-1.5 text-xs font-black tracking-tight">
          <span className="inline-flex items-center gap-1 text-yellow-400">
            <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
            🚨 ESPERE! ANTES DE IR...
          </span>
          <span className="text-amber-100 font-semibold">Sua compra principal já está garantida.</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 sm:mt-12 text-center">
        {/* Confirmed Banner */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold px-4 py-2 rounded-full mb-6 select-none">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> COMPRA PRINCIPAL GARANTIDA COM SUCESSO!
        </div>

        {/* Catchy Header */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white mb-4">
          OFERTA DE ÚLTIMA CHANCE
        </h1>
        <h2 className="text-lg sm:text-2xl font-bold text-yellow-400 mb-6 uppercase tracking-wider">
          Kit Essencial de Alta Venda
        </h2>
        
        <div className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 mb-8">
          <p>
            Talvez você tenha achado que não precisa de todos os 5.000 vetores da Mega Coleção Premium neste momento.
          </p>
          <p className="font-extrabold text-white text-base">
            Tudo bem.
          </p>
          <p>
            Por isso liberamos uma condição exclusiva que não será oferecida novamente.
          </p>
          <p className="text-slate-400 text-sm">
            Receba uma seleção especial com <span className="text-yellow-400 font-bold">mais de 1.500 vetores</span> dos nichos mais lucrativos do mercado de corte a laser. Selecionamos apenas os modelos com maior potencial comercial para você começar a produzir e vender imediatamente.
          </p>
        </div>

        {/* Dynamic Countdown */}
        <div className="max-w-xs sm:max-w-sm mx-auto bg-slate-900 border border-yellow-500/30 rounded-xl p-3.5 mb-10 flex items-center justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full filter blur-xl pointer-events-none"></div>
          <div className="flex items-center gap-2 text-left">
            <div className="bg-yellow-400/10 p-2 rounded-lg border border-yellow-400/20">
              <Clock className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-[9px] text-yellow-400 font-black tracking-wider uppercase">Válido apenas agora</p>
              <p className="text-[10px] text-slate-400 leading-tight">Oportunidade expira em:</p>
            </div>
          </div>
          <div className="bg-yellow-400 text-slate-950 px-3 py-1 rounded-lg font-mono text-base sm:text-lg font-black tracking-widest shadow-md">
            {formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
          </div>
        </div>

        {/* Checklist of What's Included */}
        <div className="text-left mb-10 max-w-2xl mx-auto bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-xs sm:text-sm font-black tracking-widest uppercase text-yellow-400 mb-6 flex items-center gap-1.5 border-b border-slate-800 pb-3">
            <Sparkles className="w-4 h-4" /> O que você recebe:
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-2.5 text-slate-200 text-xs sm:text-sm font-semibold group"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0 select-none">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Reason block */}
        <div className="max-w-2xl mx-auto bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 mb-10 text-left">
          <div className="flex items-center gap-2 text-yellow-400 font-black text-xs uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-yellow-400" />
            <span>Por que estamos fazendo isso?</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Porque sabemos que muitos clientes querem começar com um investimento menor. Em vez de perder esta oportunidade completamente, queremos garantir que você tenha acesso aos nichos que mais geram vendas.
          </p>
        </div>

        {/* PRICING CARD */}
        <div className="bg-slate-900/95 border-2 border-yellow-400 rounded-2xl p-6 sm:p-8 max-w-md mx-auto text-center shadow-[0_12px_30px_rgba(250,204,21,0.12)] relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-950 text-[10px] sm:text-xs font-black tracking-widest px-4 py-1 rounded-full uppercase shadow-sm">
            CONDIÇÃO ACESSÍVEL
          </div>

          <h3 className="text-slate-400 text-[10px] font-black tracking-widest uppercase mt-2 mb-1">OFERTA ESPECIAL DE ÚLTIMA CHANCE</h3>
          <h2 className="text-lg sm:text-xl font-black text-white">Adicionar o "Kit Essencial" ao Pedido</h2>

          <div className="my-5 border-y border-slate-800/80 py-3">
            <span className="text-slate-500 line-through text-xs">De R$ 97,00</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span className="text-slate-400 text-xs font-medium">Por Apenas</span>
              <span className="text-3xl sm:text-4xl font-black text-yellow-400 tracking-tight">R$ 14,90</span>
            </div>
            <span className="text-[9px] text-emerald-400 font-black tracking-widest uppercase mt-1 block">UM SÓ PAGAMENTO • SEM MENSALIDADE</span>
          </div>

          <p className="text-slate-300 text-xs mb-5 leading-normal">
            Acesso imediato após a confirmação do pagamento.
          </p>

          <style dangerouslySetInnerHTML={{__html: `
            #pepper-downsell-container {
              width: 100% !important;
              max-width: 100% !important;
              display: block !important;
              position: relative !important;
              z-index: 10;
            }
            #pepper-downsell-container iframe {
              width: 100% !important;
              max-width: 100% !important;
              min-width: 100% !important;
              border: none !important;
              display: block !important;
              margin: 0 auto !important;
            }
          `}} />

          <div className="relative w-full min-h-[120px] my-4">
            {/* Absolute background loader - won't interfere with iframe layout */}
            <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 animate-pulse pointer-events-none text-center p-4 z-0">
              Carregando formulário seguro de pagamento Pepper...
            </div>
            
            <div id="pepper-downsell-container" className="overflow-hidden w-full bg-transparent">
              {/* O iframe do Pepper Downsell será injetado automaticamente aqui */}
            </div>
          </div>

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

        {/* Warning notification footer */}
        <div className="max-w-xl mx-auto mt-8 bg-red-950/20 border border-red-900/40 rounded-xl p-4 text-left">
          <p className="text-xs text-red-300 leading-relaxed font-semibold">
            <span className="text-red-400 font-black">⚠️ IMPORTANTE:</span> Ao recusar esta página, esta condição será removida permanentemente e você continuará apenas com sua compra principal.
          </p>
        </div>

        {/* Final decline link */}
        <div className="mt-8 max-w-sm mx-auto">
          <button
            onClick={handleDeclineDownsell}
            className="text-slate-500 hover:text-red-400 underline text-xs tracking-wide font-semibold transition-colors bg-transparent border-0 cursor-pointer p-2 inline-block leading-relaxed"
          >
            ❌ Não, prefiro continuar somente com minha compra principal.
          </button>
        </div>
      </div>
    </div>
  );
}
