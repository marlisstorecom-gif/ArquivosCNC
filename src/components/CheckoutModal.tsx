import React, { useState, useEffect } from 'react';
import { X, Check, Lock, Loader2, CreditCard, ArrowRight, Download, CheckCircle, ExternalLink } from 'lucide-react';
import { DOWNLOADABLE_SAMPLES } from '../data';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: 'form' | 'success';
  initialName?: string;
  initialEmail?: string;
}

export default function CheckoutModal({ 
  isOpen, 
  onClose,
  initialStep = 'form',
  initialName = '',
  initialEmail = ''
}: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'external_pending' | 'success'>('form');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [driveUnlocked, setDriveUnlocked] = useState(false);
  const [externalCheckoutUrl, setExternalCheckoutUrl] = useState('');
  
  // Secure Transaction State
  const [paymentId, setPaymentId] = useState('');

  // Error/validation
  const [errors, setErrors] = useState<{ name?: string; email?: string; general?: string }>({});

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setDriveUnlocked(false);
      setErrors({});
      setName(initialName);
      setEmail(initialEmail);
      setCpf('');
      setPhone('');
      setPaymentId('');
      setExternalCheckoutUrl('');
    }
  }, [isOpen, initialStep, initialName, initialEmail]);

  if (!isOpen) return null;

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; general?: string } = {};
    if (!name.trim()) newErrors.name = 'Por favor, insira seu nome completo.';
    if (!validateEmail(email)) newErrors.email = 'Insira um e-mail válido para receber o acesso.';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep('processing');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          cpf,
          phone,
          paymentMethod: 'card' // default standard hosted checkout
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrors({ general: data.error || 'Erro no processamento seguro da transação.' });
        setStep('form');
        return;
      }

      setPaymentId(data.transactionId);

      if (data.checkoutUrl) {
        window.open(data.checkoutUrl, '_blank');
        setExternalCheckoutUrl(data.checkoutUrl);
        setStep('external_pending');
        return;
      }

      // Fallback or instant approval simulation
      setTimeout(() => {
        setStep('success');
      }, 800);
    } catch (err: any) {
      setErrors({ general: 'Falha de rede ao conectar com a central de pagamentos: ' + err.message });
      setStep('form');
    }
  };

  // Helper to trigger file download of samples
  const triggerDownload = (sample: typeof DOWNLOADABLE_SAMPLES[0]) => {
    const element = document.createElement("a");
    const file = new Blob([sample.svgCode], {type: 'image/svg+xml'});
    element.href = URL.createObjectURL(file);
    element.download = `${sample.title.toLowerCase().replace(/\s+/g, "_")}.svg`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header bar */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white font-sans">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-sm tracking-wide uppercase">Plataforma de Pagamento · Compra 100% Segura</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price Tag header */}
        <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-100 flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Produto Selecionado</span>
            <h4 className="font-bold text-slate-800 text-sm">Mega Pacote 700.000+ Vetores Laser</h4>
          </div>
          <div className="text-right">
            <span className="text-xs line-through text-slate-400">De R$ 197,00</span>
            <div className="font-black text-xl text-emerald-600">US$ 20,00</div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {step === 'form' && (
            <form onSubmit={handleStartPayment} className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">Cadastro de Liberação Comercial</h3>
              <p className="text-xs text-slate-500">Seu pacote de designs laser original e o link de acesso vitalício do Google Drive serão enviados para o endereço de e-mail informado abaixo.</p>

              <div className="space-y-3">
                {/* General Error banner */}
                {errors.general && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg font-medium border border-red-100">
                    {errors.general}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 font-mono">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Carlos Eduardo de Souza"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 font-mono">E-mail de Cadastro</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="carlos@exemplo.com"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* CPF & Phone fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 font-mono">CPF (opcional)</label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      placeholder="Ex: 123.456.789-10"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 font-mono">WhatsApp (DDD + Número)</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: 11999999999"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* High Trust Callout Area */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50 text-left animate-in fade-in duration-150">
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    🔒 <strong>SSL Integrado de Segurança:</strong> Ao clicar abaixo, nós garantiremos o registro do seu faturamento e você será direcionado para o checkout seguro da nossa plataforma de vendas parceira para concluir seu pagamento (por Pix, Cartão ou Boleto) de forma blindada de ponta a ponta. Seus dados estarão 100% protegidos.
                  </p>
                </div>
              </div>

              {/* Secure guarantee text */}
              <div className="flex items-center gap-2 justify-center text-[11px] text-slate-400 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Garantia de 7 dias incondicional</span>
                <span className="text-slate-300">|</span>
                <span className="font-semibold text-slate-500">Garantia de Satisfação</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Avançar para Plataforma de Pagamento</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 font-sans">
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
              <div>
                <h3 className="font-bold text-lg text-slate-800">Criptografando Transação...</h3>
                <p className="text-sm text-slate-500 mt-1">Sincronizando faturamento de forma restrita e segura com a plataforma de pagamentos comercial...</p>
              </div>
            </div>
          )}

          {step === 'external_pending' && (
            <div className="text-center space-y-4 py-6 animate-in fade-in duration-200">
              <div className="inline-block bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold animate-pulse">
                Checkout de Vendas Externo Oficial
              </div>
              <h3 className="font-extrabold text-xl text-slate-800">Finalizar Compra na Plataforma</h3>
              
              <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                Abriremos a guia oficial segura da nossa plataforma de faturamento para conclusão imediata do seu Pix, cartão de crédito ou boleto.
              </p>

              <div className="py-2 flex justify-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200">
                  <Lock className="w-8 h-8 text-emerald-600 animate-pulse" />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={externalCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs mx-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 text-xs uppercase"
                >
                  <span>Ir para Checkout da Plataforma</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <p className="text-[10px] text-slate-400">
                  Se a página de pagamento não abriu automaticamente no seu navegador, clique no botão acima para concluir com segurança.
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-150 flex justify-center gap-3 max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="py-2.5 px-4 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 cursor-pointer text-center"
                >
                  Alterar Cadastro
                </button>
                <button
                  type="button"
                  onClick={() => setStep('success')}
                  className="py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black shadow-xs flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-200" />
                  <span>Confirmar Acesso!</span>
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-4 text-center py-2 animate-in fade-in duration-200">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-300 text-emerald-600 shadow-sm animate-bounce">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-extrabold text-2xl text-slate-800">Acesso Liberado! 🎉</h3>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Muito obrigado, {name || 'Cliente'}! Sua compra comercial foi autenticada.</p>
                <p className="text-xs text-slate-500 mt-1">O seu link com todos os arquivos está disponível abaixo e credenciais extras foram enviadas para <strong>{email}</strong>.</p>
              </div>

              {/* Direct Downloader Zone */}
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-850 uppercase tracking-wider">📁 Pasta de Amostras para Download</h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">4 Vetores Reais</span>
                </div>
                <p className="text-xs text-slate-600">
                  Faça o download de 4 designs de teste limpos para provar instantaneamente que os arquivos abrem com precisão perfeita no seu programa de corte:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
                  {DOWNLOADABLE_SAMPLES.map((sample, idx) => (
                    <div key={idx} className="bg-white border border-slate-150 p-2.5 rounded-lg flex items-center justify-between shadow-xs hover:border-emerald-300 transition-colors">
                      <div className="truncate pr-1">
                        <p className="text-xs font-bold text-slate-800 truncate">{sample.title}</p>
                        <p className="text-[10px] text-slate-400">Formato: {sample.format} · <span className="text-slate-500 uppercase font-semibold text-[9px]">{sample.complexity}</span></p>
                      </div>
                      <button
                        onClick={() => triggerDownload(sample)}
                        className="p-1.5 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-md transition-colors"
                        title="Baixar Design Real"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Link block to Google Drive */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center space-y-3 text-white">
                <p className="text-xs text-slate-350 font-medium">Pasta dos 700.000+ arquivos com Licença Vitalícia:</p>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setDriveUnlocked(true);
                      window.open('https://drive.google.com/drive/folders/mock-laser-bundle-700k', '_blank');
                    }}
                    className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer shadow-sm"
                  >
                    <span>Acessar Google Drive Oficial</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                  {driveUnlocked && (
                    <p className="text-[10px] text-emerald-400 font-bold">✓ Guia do Google Drive aberta com sucesso!</p>
                  )}
                </div>
              </div>

              {/* Closing simulator instructions */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline transition-all"
                >
                  Fechar Janela de Compra
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
