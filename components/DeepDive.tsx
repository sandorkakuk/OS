
import React from 'react';
import { DeepDiveResult } from '../types';

interface DeepDiveProps {
  result: DeepDiveResult | null;
  isLoading: boolean;
  onClose: () => void;
}

const DeepDive: React.FC<DeepDiveProps> = ({ result, isLoading, onClose }) => {
  if (!result && !isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header Image or Loader */}
        <div className="relative h-64 md:h-80 bg-slate-800 overflow-hidden">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-blue-400 font-medium animate-pulse">Vizuális rekonstrukció generálása...</p>
            </div>
          ) : result?.imageUrl ? (
            <>
              <img src={result.imageUrl} alt={result.detail.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <span className="px-3 py-1 bg-blue-600/80 backdrop-blur rounded text-[10px] font-bold uppercase tracking-widest text-white mb-2 inline-block">
                  AI Rekonstrukció
                </span>
                <h2 className="text-4xl font-black text-white drop-shadow-lg">{result.detail.title}</h2>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl font-black text-white">{result?.detail.title}</h2>
            </div>
          )}
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-slate-900/50 hover:bg-slate-800 rounded-full backdrop-blur transition-colors text-white z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          {isLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-32 bg-slate-800 rounded"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-slate-800 rounded"></div>
                <div className="h-20 bg-slate-800 rounded"></div>
              </div>
            </div>
          ) : result ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-blue-400 font-bold mb-4 flex items-center uppercase tracking-widest text-sm">
                      <span className="mr-2">📜</span> Történet
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      {result.detail.history}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-blue-400 font-bold mb-4 flex items-center uppercase tracking-widest text-sm">
                      <span className="mr-2">🛠️</span> Technikai Újítások
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {result.detail.innovations.map((item, idx) => (
                        <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-slate-200 text-sm flex items-start">
                          <span className="text-blue-500 mr-2">➜</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-8">
                  <div className="bg-blue-600/10 border border-blue-500/30 p-6 rounded-2xl">
                    <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2 text-sm uppercase">
                      💡 Tudtad-e?
                    </h3>
                    <p className="text-slate-200 text-sm italic leading-relaxed">
                      "{result.detail.funFact}"
                    </p>
                  </div>

                  {result.sources.length > 0 && (
                    <section>
                      <h3 className="text-slate-400 font-bold mb-4 flex items-center uppercase tracking-widest text-xs">
                        🔗 Eredeti Felvételek és Források
                      </h3>
                      <div className="space-y-2">
                        {result.sources.slice(0, 4).map((source, idx) => (
                          <a 
                            key={idx} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-blue-400 truncate transition-colors border border-slate-700 hover:border-blue-500/50"
                          >
                            🖼️ {source.title}
                          </a>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>

              <section className="pt-6 border-t border-slate-800">
                <h3 className="text-blue-400 font-bold mb-4 flex items-center uppercase tracking-widest text-sm">
                  🌍 Piaci és Kulturális Hatás
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {result.detail.impact}
                </p>
              </section>
            </>
          ) : null}
        </div>
        
        <div className="p-8 border-t border-slate-800 bg-slate-900/50 flex justify-center">
          <button 
            onClick={onClose}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95"
          >
            Vissza az idővonalhoz
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeepDive;
