import React, { useState } from 'react';
import { Search, Compass, CheckCircle2, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { CATEGORIES, REAL_PROJECTS_IMAGES } from '../data';

interface CategoryExplorerProps {
  onSelectBuy: () => void;
  onImageClick: (url: string, title: string) => void;
}

export default function CategoryExplorer({ onSelectBuy, onImageClick }: CategoryExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="categories" className="py-16 px-4 bg-slate-50 border-y border-slate-200/50 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header content and search */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
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

          {/* Quick search input */}
          <div className="relative w-full md:w-80 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar categoria (Ex: Cozinha, Brinco, Natal...)"
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 bg-white rounded-xl shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-yellow-500/40 text-slate-700"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 underline font-medium"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid layout */}
        {filteredCategories.length === 0 ? (
          <div className="py-12 bg-white rounded-2xl border border-slate-200 text-center max-w-md mx-auto p-6 space-y-3">
            <Compass className="w-10 h-10 text-slate-300 mx-auto animate-bounce" />
            <p className="text-slate-500 font-semibold text-sm">Nenhuma categoria encontrada com "{searchQuery}"</p>
            <p className="text-slate-400 text-xs">Por favor, tente buscar termos aproximados como "casa", "modelo", "mandalas" ou "festa".</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-yellow-600 font-bold bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-lg active:scale-95 transition-all cursor-pointer"
            >
              Exibir Tudo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {filteredCategories.map((cat) => (
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
        )}

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
            <span>👉 Obter Acesso Completo aos Vetores — $20 →</span>
          </button>
          <p className="text-xs text-slate-400">Uma única licença vitalícia · Entrega instantânea via Google Drive · Garantia Completa de Reembolso</p>
        </div>

      </div>
    </section>
  );
}
