import { useState } from "react";
import { 
  CheckCircle, 
  Download, 
  MessageSquare, 
  Mail, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  FolderOpen,
  HelpCircle,
  Copy,
  Check
} from "lucide-react";

export default function ThankYouPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("suporte.marlisstore@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Google Drive custom link containing vector bundles
  const ACCESS_URL = "https://drive.google.com/drive/folders/17YfM-XwI3Iun9IOn2k2U0_8oG0LpxHia?usp=sharing";

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans antialiased selection:bg-yellow-500 selection:text-slate-950 pb-20 relative">
      {/* Top Emerald Banner */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-400"></div>

      <div className="max-w-3xl mx-auto px-4 pt-12 sm:pt-20">
        {/* Animated Checkmark Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-400 rounded-full flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_30px_rgba(52,211,153,0.15)] animate-bounce">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>

          <p className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-emerald-400 bg-emerald-500/5 px-4 py-1.5 rounded-full border border-emerald-500/15 mb-3">
            Pagamento Confirmado • Acesso Liberado
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
            OBRIGADO PELA COMPRA!
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed">
            Seu pedido foi processado com sucesso. Prepare-se para acelerar sua produção de corte a laser com a melhor coleção do mercado!
          </p>
        </div>

        {/* ACCESS THE PRODUCT - PRIMARY CONTAINER */}
        <div className="mt-10 sm:mt-12 bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all hover:border-emerald-500/50">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8 mb-8">
            <div className="text-center sm:text-left">
              <span className="text-[10px] sm:text-xs text-yellow-400 font-extrabold tracking-widest uppercase flex items-center justify-center sm:justify-start gap-1 mb-1">
                <FolderOpen className="w-4 h-4 text-yellow-400" />
                Seu produto digital
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Mega Coleção Premium de Vetores
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Acesso vitalício com mais de 5.000 designs profissionais.
              </p>
            </div>
            <div className="bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 text-center shrink-0">
              <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">Status do Envio</span>
              <span className="text-xs text-emerald-400 font-black tracking-wide flex items-center gap-1 mt-0.5">
                ● Pronto para Download
              </span>
            </div>
          </div>

          {/* MASTER DOWNLOAD BUTTON */}
          <div className="space-y-4">
            <a 
              href={ACCESS_URL} 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4.5 px-6 rounded-2xl shadow-[0_8px_25px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.4)] transition-all text-sm sm:text-base flex items-center justify-center gap-3 decoration-neutral-100 group cursor-pointer border-0 active:scale-97 select-none"
            >
              <Download className="w-5.5 h-5.5 text-slate-950 stroke-[2.5] group-hover:scale-110 transition-transform" />
              <span>👉 CLIQUE AQUI PARA ACESSAR E BAIXAR SEUS VETORES</span>
              <ExternalLink className="w-4 h-4 opacity-75" />
            </a>
            
            <p className="text-slate-500 text-[11px] text-center">
              *Você também receberá um link de cópia no seu e-mail cadastrado na plataforma de pagamento.
            </p>
          </div>
        </div>

        {/* STEP-BY-STEP ACCESS GUIDE */}
        <div className="mt-10">
          <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase mb-5 flex items-center gap-2">
            <Clock className="w-4.5 h-4.5 text-yellow-400" />
            Como acessar seu pack (Passo a Passo)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 relative">
              <span className="absolute top-4 right-4 text-3xl font-black text-slate-800 selection:bg-transparent">01</span>
              <h4 className="text-white font-extrabold text-sm mb-2 uppercase">Passo Principal</h4>
              <p className="text-slate-400 text-xs leading-normal">
                Clique no botão verde acima para abrir a pasta compartilhada no Google Drive.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 relative">
              <span className="absolute top-4 right-4 text-3xl font-black text-slate-800 selection:bg-transparent">02</span>
              <h4 className="text-white font-extrabold text-sm mb-2 uppercase">Salve no seu Drive</h4>
              <p className="text-slate-400 text-xs leading-normal">
                Você pode baixar os arquivos compactados inteiros ou salvar na sua própria nuvem para usá-los quando quiser.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 relative">
              <span className="absolute top-4 right-4 text-3xl font-black text-slate-800 selection:bg-transparent">03</span>
              <h4 className="text-white font-extrabold text-sm mb-2 uppercase">Corte e Produza</h4>
              <p className="text-slate-400 text-xs leading-normal">
                Abra os arquivos em CDR, DXF, SVG ou PDF no seu software preferido e inicie seus cortes e lucros imediatamente!
              </p>
            </div>
          </div>
        </div>

        {/* CUSTOM TRANSACTION RECEIPT DETAILS CARDS */}
        <div className="mt-10 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xs sm:text-sm font-black tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-1.5">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
            Recibo Detalhado do Pedido
          </h3>

          <div className="space-y-3.5 border-b border-slate-800 pb-5 mb-5 text-xs sm:text-sm">
            <div className="flex justify-between items-center text-slate-400">
              <span>Produto</span>
              <span className="text-white font-semibold">Mega Coleção 5.000+ Vetores Premium</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Status do pagamento</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                Aprovado
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Tipo de Acesso</span>
              <span className="text-white font-semibold">Vitalício &amp; Sem Mensalidades</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Método</span>
              <span className="text-white font-semibold">Pix / Cartão de Crédito</span>
            </div>
          </div>

          <div className="text-slate-400 text-xs leading-relaxed flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>Estamos à sua disposição! Caso precise de suporte técnico ou tenha alguma dúvida, fale conosco.</span>
          </div>
        </div>

        {/* SUPPORT CONTACT BOX */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email Support Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4">
            <div className="bg-sky-500/10 p-2.5 rounded-xl border border-sky-500/20 text-sky-400">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-xs sm:text-sm font-black uppercase mb-1">Contato por E-mail</h4>
              <p className="text-slate-400 text-[11px] mb-2 leading-relaxed">Respondemos em até 24 horas úteis:</p>
              <button 
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold text-sky-400 hover:text-sky-300 pointer group bg-transparent border-0 cursor-pointer p-0"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 group-hover:scale-105 transition-transform" />
                    <span className="truncate">suporte.marlisstore@gmail.com</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* WhatsApp Support Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4">
            <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-xs sm:text-sm font-black uppercase mb-1">Atendimento WhatsApp</h4>
              <p className="text-slate-400 text-[11px] mb-2 leading-relaxed">Disponível de Seg. a Sex. comercial:</p>
              <a 
                href="https://wa.me/5598991234567" 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 hover:underline"
              >
                <span>Falar Conosco no WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Small Home Redirect */}
        <div className="mt-12 text-center">
          <a 
            href="/"
            className="text-slate-500 hover:text-white transition-colors text-xs font-semibold underline"
          >
            Voltar para o site principal
          </a>
        </div>
      </div>
    </div>
  );
}
