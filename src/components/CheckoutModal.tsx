import React, { useState, useEffect } from 'react';
import { X, Check, Lock, Loader2, CreditCard, Copy, ArrowRight, Download, CheckCircle, ExternalLink } from 'lucide-react';
import { DOWNLOADABLE_SAMPLES } from '../data';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'pix_pending' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'paypal'>('pix');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);
  const [driveUnlocked, setDriveUnlocked] = useState(false);

  // Error/validation
  const [errors, setErrors] = useState<{ name?: string; email?: string; card?: string }>({});

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setDriveUnlocked(false);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; card?: string } = {};
    if (!name.trim()) newErrors.name = 'Por favor, insira seu nome completo.';
    if (!validateEmail(email)) newErrors.email = 'Insira um e-mail válido para receber o acesso.';
    
    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s+/g, '').length < 16) {
        newErrors.card = 'Número do cartão inválido.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep('processing');

    setTimeout(() => {
      if (paymentMethod === 'pix') {
        setStep('pix_pending');
      } else {
        setStep('success');
      }
    }, 1800);
  };

  const simulatePixConfirm = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 1200);
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText('00020101021126750014br.gov.bcb.pix0136691a3c8d-df98-11de-b209-005056c00008520400005303986540520.005802BR5924The Laser Design Store6009Sao Paulo62070503***6304CA1F');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
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
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold text-sm tracking-wide uppercase">Compra Segura Garantida</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price Tag header */}
        <div className="bg-amber-100/60 px-6 py-3 border-b border-amber-200/50 flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Produto Selecionado</span>
            <h4 className="font-bold text-slate-800 text-sm">Mega Pacote 700.000+ Vetores Laser</h4>
          </div>
          <div className="text-right">
            <span className="text-xs line-through text-slate-400">De $97,00</span>
            <div className="font-black text-xl text-yellow-600">US$ 20,00</div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {step === 'form' && (
            <form onSubmit={handleStartPayment} className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">Insira seus dados para liberação imediata</h3>
              <p className="text-xs text-slate-500">O acesso ao Google Drive com 100GB será enviado para o e-mail informado abaixo.</p>

              <div className="space-y-3">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Carlos Eduardo de Souza"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-500"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">E-mail para Receber os Arquivos</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="carlos@exemplo.com"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-500"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Payment Selector tabs */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Forma de Pagamento</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`py-2 px-3 border rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'pix' 
                          ? 'border-teal-500 bg-teal-50 text-teal-800 font-bold shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <span className="text-xs font-bold font-mono">PIX</span>
                      <span className="text-[10px] text-teal-600 font-medium">Liberação Segundos</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2 px-3 border rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'card' 
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-800 font-bold shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-yellow-600" />
                      <span className="text-[10px] font-medium">Cartão de Crédito</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`py-2 px-3 border rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'paypal' 
                          ? 'border-blue-500 bg-blue-50 text-blue-800 font-bold shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <span className="text-xs font-extrabold italic text-blue-800">PayPal</span>
                      <span className="text-[10px] text-blue-500 font-medium font-sans">Sem Taxas</span>
                    </button>
                  </div>
                </div>

                {/* Card Fields Conditional */}
                {paymentMethod === 'card' && (
                  <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100 animate-in fade-in duration-150">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase mb-0.5">Número do Cartão</label>
                      <input
                        type="text"
                        placeholder="4444 5555 6666 7777"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 uppercase mb-0.5">Validade (MM/AA)</label>
                        <input
                          type="text"
                          placeholder="12/31"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                          className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 uppercase mb-0.5">Código CVV</label>
                        <input
                          type="password"
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white text-center"
                        />
                      </div>
                    </div>
                    {errors.card && <p className="text-xs text-red-500 mt-1">{errors.card}</p>}
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-center animate-in fade-in duration-150">
                    <p className="text-xs text-blue-800 font-medium">Após clicar no botão, você simulará o ambiente do PayPal de forma totalmente protegida.</p>
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 text-center animate-in fade-in duration-150">
                    <p className="text-xs text-teal-800 font-medium">Será gerado um código PIX do tipo "Copia e Cola" e QR Code para simulação instantânea.</p>
                  </div>
                )}
              </div>

              {/* Secure guarantee text */}
              <div className="flex items-center gap-2 justify-center text-[11px] text-slate-400 pt-1">
                <Check className="w-3.5 h-3.5 text-green-500" />
                <span>Garantia de 7 dias incondicional</span>
                <span className="text-slate-300">|</span>
                <span className="font-semibold">SSL 256-bit</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-extrabold py-3.5 px-4 rounded-xl shadow-xs hover:shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Avançar para Pagamento Seguro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
              <div>
                <h3 className="font-bold text-lg text-slate-800">Criptografando Transação...</h3>
                <p className="text-sm text-slate-500 mt-1">Conectando ao gateway de pagamento seguro da The Laser Design Store...</p>
              </div>
            </div>
          )}

          {step === 'pix_pending' && (
            <div className="text-center space-y-4 animate-in fade-in duration-200">
              <div className="inline-block bg-teal-50 text-teal-800 px-4 py-1.5 rounded-full text-xs font-bold">
                Aguardando Pagamento Simulado
              </div>
              <h3 className="font-black text-xl text-slate-800">Escaneie o QR Code ou Copie o Código</h3>
              
              {/* Fake QR Code */}
              <div className="mx-auto w-40 h-40 bg-slate-100 border-4 border-slate-200 rounded-xl flex items-center justify-center p-2">
                <div className="grid grid-cols-4 gap-1 w-full h-full opacity-70">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-xs ${
                        (i * 3 + 7) % 5 === 0 || i % 4 === 0 ? 'bg-slate-800' : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Clique abaixo para copiar o código PIX Copia e Cola. Em seguida, clique em "Confirmar Pagamento" para simular a liquidação imediata da transação.
                </p>

                <div className="flex items-center gap-2 max-w-xs mx-auto">
                  <input
                    type="text"
                    readOnly
                    value="00020101021126750014br.gov.bcb.pix0136..."
                    className="bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg flex-1 text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={copyPixCode}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1 text-xs"
                    title="Copiar Código"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* Activating actions */}
              <div className="pt-4 grid grid-cols-2 gap-3 max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="py-2.5 px-4 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 cursor-pointer"
                >
                  Voltar e Alterar
                </button>
                <button
                  type="button"
                  onClick={simulatePixConfirm}
                  className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirmar Crédito</span>
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-4 text-center py-2 animate-in fade-in duration-200">
              <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-200 text-green-500 shadow-sm animate-bounce">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-extrabold text-2xl text-slate-800">Acesso Liberado! 🎉</h3>
                <p className="text-xs text-green-600 font-semibold mt-1">Parabéns {name}! Sua licença vitalícia comercial foi emitida.</p>
                <p className="text-xs text-slate-500 mt-1">Acabamos de simular o envio das credenciais para <strong>{email}</strong>.</p>
              </div>

              {/* Direct Downloader Zone */}
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200/50 space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">📁 Pasta Reservada de Amostras</h4>
                  <span className="text-[10px] font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">4 Modelos Prontos</span>
                </div>
                <p className="text-xs text-slate-600">
                  Para demonstrar que o sistema funciona e provar a qualidade impecável dos vetores, você pode fazer o download real de 4 designs teste abaixo:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
                  {DOWNLOADABLE_SAMPLES.map((sample, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 p-2.5 rounded-lg flex items-center justify-between shadow-xs hover:border-yellow-300 transition-colors">
                      <div className="truncate pr-1">
                        <p className="text-xs font-bold text-slate-800 truncate">{sample.title}</p>
                        <p className="text-[10px] text-slate-400">Formato: {sample.format} · <span className="text-yellow-600 uppercase font-semibold text-[9px]">{sample.complexity}</span></p>
                      </div>
                      <button
                        onClick={() => triggerDownload(sample)}
                        className="p-1.5 hover:bg-yellow-50 text-slate-700 hover:text-yellow-700 rounded-md transition-colors"
                        title="Baixar Design Real"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Link block to Google Drive */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center space-y-3">
                <p className="text-xs text-slate-600 font-medium">Link Completo dos 700.000+ arquivos:</p>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setDriveUnlocked(true);
                      window.open('https://drive.google.com/drive/folders/mock-laser-bundle-700k', '_blank');
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer"
                  >
                    <span>Abrir Google Drive Oficial da Pasta (Amostra Simulação)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-yellow-400" />
                  </button>
                  {driveUnlocked && (
                    <p className="text-[10px] text-emerald-600 font-bold">✓ Link aberto na sua guia do navegador!</p>
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
                  Fechar Janela de Checkout
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
