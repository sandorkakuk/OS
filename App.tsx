
import React, { useState, useCallback } from 'react';
import { OS_TIMELINE_DATA } from './constants';
import { OSEvent, DeepDiveResult } from './types';
import TimelineItem from './components/TimelineItem';
import DeepDive from './components/DeepDive';
import { getOSDeepDive } from './services/geminiService';

const App: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<OSEvent | null>(null);
  const [deepDiveResult, setDeepDiveResult] = useState<DeepDiveResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEventClick = useCallback(async (event: OSEvent) => {
    setSelectedEvent(event);
    setIsLoading(true);
    setError(null);
    setDeepDiveResult(null);

    try {
      const result = await getOSDeepDive(event.name);
      setDeepDiveResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Váratlan hiba történt az adatok lekérésekor.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const closeDeepDive = () => {
    setDeepDiveResult(null);
    setSelectedEvent(null);
    setIsLoading(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] selection:bg-blue-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full"></div>
      </div>

      <header className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-pulse">
            Digital Evolution Archive
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            OS <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400">KRÓNIKÁK</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Fedezze fel az operációs rendszerek vizuális és technikai evolúcióját az AI segítségével generált rekonstrukciókkal és hiteles forrásokkal.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-40 relative">
        <div className="absolute left-10 lg:left-1/2 transform lg:-translate-x-1/2 h-[calc(100%-100px)] w-px bg-gradient-to-b from-blue-500/50 via-slate-700 to-transparent"></div>

        <div className="relative pt-10">
          {OS_TIMELINE_DATA.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              index={index}
              isActive={selectedEvent?.id === event.id}
              onClick={() => handleEventClick(event)}
            />
          ))}
        </div>
      </main>

      <DeepDive 
        result={deepDiveResult} 
        isLoading={isLoading} 
        onClose={closeDeepDive} 
      />

      {error && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-red-500/90 backdrop-blur text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 border border-red-400/50">
          <span className="text-xl">⚠️</span>
          <span className="font-bold">{error}</span>
          <button onClick={() => setError(null)} className="ml-4 hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      <footer className="py-20 border-t border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-slate-500 text-sm font-medium mb-6">
            Az alkalmazás a Gemini 3.0 Pro és 2.5 Flash modelleket használja a történelmi hűség és vizualitás érdekében.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
              Live Data Grounding
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              AI Visual Reconstruction
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
