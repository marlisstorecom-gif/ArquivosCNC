import React from 'react';
import { Compass, CheckCircle2, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { CATEGORIES, REAL_PROJECTS_IMAGES } from '../data';

interface CategoryExplorerProps {
  onSelectBuy: () => void;
  onImageClick: (url: string, title: string) => void;
}

export default function CategoryExplorer({ onSelectBuy, onImageClick }: CategoryExplorerProps) {
  return (
    <section id="categories" className="py-16 px-4 bg-slate-50 border-y border-slate-200/50 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header content */}
        <div className="mb-10 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-50 px-3 py-1 rounded-full">
              Explore o Acervo de Vetores
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-3 leading-tight">
              40+ Categorias — <span className="text-yellow-500">Um design para cada projeto</span>
            </h2>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              De artes de parede a modelos de engrenagens 3D funcionais. Tudo o que sua oficina ou loja de presentes precisa, organizado milimetricamente.
            </p>
          </div>
        </div>

        {/* Categories Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md hover:border-yellow-400/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Card Header Image */}
                <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className="bg-yellow-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center shadow-md font-bold text-lg">
                      {cat.emoji}
                    </div>
                    <h3 className="font-extrabold text-white text-base drop-shadow-xs">{cat.title}</h3>
                  </div>
                </div>

                {/* Body description */}
                <div className="p-4">
                  <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={onSelectBuy}
                  className="w-full bg-slate-50 hover:bg-yellow-50 border border-slate-100 text-slate-700 hover:text-slate-900 font-bold py-2 text-xs rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Ver Vetores Correlatos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Real Projects Section */}
        <div className="mt-14 pt-10 border-t border-slate-200/65">
          <div className="text-center md:text-left mb-6">
            <h4 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest">
              Fabricações Reais Realizadas com Esses Vetores
            </h4>
            <p className="text-xs text-slate-400 mt-1">Clique nas imagens abaixo para ampliar os detalhes de montagem física das amostras.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {REAL_PROJECTS_IMAGES.map((proj, idx) => (
              <div 
                key={idx} 
                onClick={() => onImageClick(proj.url, proj.title)}
                className="group relative aspect-square rounded-xl bg-slate-950 overflow-hidden border border-slate-200/60 shadow-2xs hover:border-yellow-400 cursor-zoom-in transition-all"
                title="Ampliar Detalhe"
              >
                <img 
                  src={proj.url} 
                  alt={proj.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                    <p className="text-white font-bold text-[11px] leading-tight select-none">{proj.title}</p>
                    <span className="text-[9px] text-yellow-300 font-semibold select-none">Clique para Ampliar</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button CTA row */}
        <div className="mt-12 text-center space-y-3">
          <button
            onClick={onSelectBuy}
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-extrabold px-8 py-3.5 rounded-xl shadow-xs hover:shadow-md transform active:scale-97 transition-all text-sm cursor-pointer"
          >
            <span>👉 Obter Acesso Completo aos Vetores — R$ 10 →</span>
          </button>
          <p className="text-xs text-slate-400">Uma única licença vitalícia · Entrega instantânea via Google Drive · Garantia Completa de Reembolso</p>
        </div>

      </div>
    </section>
  );
}
