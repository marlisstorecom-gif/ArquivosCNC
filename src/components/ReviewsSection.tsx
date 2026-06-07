import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, Check, Sparkles, Filter } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS } from '../data';

export default function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterMachine, setFilterMachine] = useState<string>('All');
  
  // Form input states
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [machine, setMachine] = useState('CO₂ Laser');
  const [material, setMaterial] = useState('Madeira');
  const [stars, setStars] = useState(5);
  const [tag, setTag] = useState('Hobbista');
  const [successMsg, setSuccessMsg] = useState(false);

  // Pre-load from localStorage or standard list
  useEffect(() => {
    const cached = localStorage.getItem('laser_bundle_reviews');
    if (cached) {
      try {
        setReviewsList(JSON.parse(cached));
      } catch (e) {
        setReviewsList(REVIEWS);
      }
    } else {
      setReviewsList(REVIEWS);
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const initials = name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U';

    const newReview: Review = {
      id: `custom-rev-${Date.now()}`,
      name: `${name} `,
      initials,
      machine,
      material,
      stars,
      text: `"${text}"`,
      tag,
      verified: true,
      image: REVIEWS[Math.floor(Math.random() * REVIEWS.length)].image // Select a nice mock work image
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem('laser_bundle_reviews', JSON.stringify(updated));

    // Reset inputs
    setName('');
    setText('');
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setShowAddForm(false);
    }, 2000);
  };

  // Unique machines for filtering
  const allMachines = ['All', ...Array.from(new Set(reviewsList.map(r => r.machine.split(' ')[0])))];

  const filteredReviews = filterMachine === 'All'
    ? reviewsList
    : reviewsList.filter(r => r.machine.toLowerCase().includes(filterMachine.toLowerCase()));

  return (
    <section id="reviews" className="py-14 px-4 max-w-6xl mx-auto font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-50 px-3 py-1 rounded-full">
          Depoimentos Reais
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-3 leading-tight">
          Amado por <span className="text-yellow-500">mais de 2.000 criadores</span> em todo o mundo
        </h2>
        <p className="text-slate-500 text-sm mt-3">
          Makers profissionais, vendedores do Etsy, hobbistas e carpinteiros de todo o mundo contam como o Mega Pacote transformou seus cortes.
        </p>
      </div>

      {/* Aggregate Score Bar */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 mb-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-4">
          <div className="bg-yellow-400 text-slate-950 font-black text-5xl px-5 py-3 rounded-2xl shadow-xs">
            4.9
          </div>
          <div>
            <div className="flex gap-1 justify-center md:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-500 stroke-yellow-500" />
              ))}
            </div>
            <p className="text-[14px] font-bold text-slate-700 mt-1">Pontuação baseado em 2.845 avaliações</p>
            <p className="text-[12px] text-slate-400">93% de avaliações de 5 estrelas</p>
          </div>
        </div>

        {/* Filters and CTA bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
          {/* Quick Filter */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterMachine}
              onChange={(e) => setFilterMachine(e.target.value)}
              className="text-xs font-semibold text-slate-600 bg-transparent border-none focus:outline-hidden"
            >
              <option value="All">Todas as Máquinas</option>
              <option value="CO₂">Lasers CO₂</option>
              <option value="LightBurn">LightBurn</option>
              <option value="fibra">Lasers de Fibra</option>
              <option value="CNC">Fresadoras CNC</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-xs active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-yellow-400" />
            <span>Escrever Avaliação</span>
          </button>
        </div>
      </div>

      {/* Review creation form */}
      {showAddForm && (
        <div className="bg-white border-2 border-yellow-400/50 rounded-2xl p-6 mb-10 max-w-xl mx-auto shadow-md animate-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-slate-800 text-lg mb-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span>Envie sua opinião sobre o pacote!</span>
          </h3>
          <p className="text-xs text-slate-400 mb-4 font-normal">Sua opinião é extremamente valiosa para nós e ajuda outros makers das redes.</p>

          <form onSubmit={handleAddReview} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: João Silva"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sua Máquina</label>
                <select
                  value={machine}
                  onChange={(e) => setMachine(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-700"
                >
                  <option value="CO₂ Laser">CO₂ Laser</option>
                  <option value="Laser de fibra">Laser de Fibra</option>
                  <option value="LightBurn Setup">Setup LightBurn</option>
                  <option value="Fresadora CNC">Fresadora CNC</option>
                  <option value="Laser Portátil Diodo">Laser Portátil Diodo</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Material Predileto</label>
                <input
                  type="text"
                  required
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="Ex: MDF de 3mm, Acrílico"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Carimbo de Perfil</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-700"
                >
                  <option value="Etsy Seller">Vendedor Etsy</option>
                  <option value="Hobbista Criativo">Hobbista Criativo</option>
                  <option value="Loja de Brindes">Loja de Brindes de Casamento</option>
                  <option value="Marceneiro">Marceneiro Profissional</option>
                  <option value="Estúdio de Gravação">Estúdio de Gravação</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">Classificação</label>
                <span className="text-yellow-500 font-extrabold text-xs">{stars} Estrelas</span>
              </div>
              <div className="flex gap-2 p-1.5 border border-slate-100 rounded-lg max-w-xs bg-slate-50">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setStars(num)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star 
                      className={`w-6 h-6 ${
                        num <= stars ? 'fill-yellow-400 stroke-yellow-500' : 'stroke-slate-300 fill-transparent'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Texto do Depoimento</label>
              <textarea
                required
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ex e dicas: Comprei o pacote e cortou de primeira no MDF, sem nenhum remendo. Salvou dias de trabalho..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="py-1.5 px-4 text-xs font-bold text-slate-500 hover:text-slate-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="py-1.5 px-5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enviar Avaliação</span>
              </button>
            </div>

            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-center justify-center gap-2 text-emerald-800 text-xs font-bold animate-pulse">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Avaliação cadastrada com sucesso! Veja no topo da feed.</span>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Reviews Cards List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.length === 0 ? (
          <div className="col-span-full py-10 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            Nenhuma avaliação encontrada com o filtro de máquina selecionado.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div 
              key={rev.id} 
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-yellow-400/50 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Photo of client project */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-950">
                  <img
                    src={rev.image}
                    alt={`Projeto de ${rev.name}`}
                    loading="lazy"
                    className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-[10px] font-black text-yellow-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {rev.tag}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  {/* Persona profile */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center font-black text-sm border-2 border-white shadow-xs">
                      {rev.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{rev.name}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-1.5 py-0.2 md:py-0.5 font-bold">
                            ✔ Verificado
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {rev.machine} · <span className="font-medium text-slate-500">{rev.material}</span>
                      </p>
                    </div>
                  </div>

                  {/* Rating stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star 
                        key={idx} 
                        className={`w-4 h-4 ${
                          idx < rev.stars ? 'fill-yellow-400 stroke-yellow-500' : 'stroke-slate-200 fill-none'
                        }`} 
                      />
                    ))}
                  </div>

                  <p className="text-slate-600 font-medium text-xs sm:text-[13px] leading-relaxed italic">
                    {rev.text}
                  </p>
                </div>
              </div>

              {/* Status footer inside review */}
              <div className="bg-slate-50/50 px-5 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Avaliação Verificada</span>
                <span>ID: {rev.id.split('-').pop()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
