
import React from 'react';
import { OSEvent } from '../types';

interface TimelineItemProps {
  event: OSEvent;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, isActive, onClick, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex items-center w-full mb-8 lg:mb-12 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
      <div className="hidden lg:block lg:w-5/12"></div>
      
      <div className="z-20 flex items-center order-1 bg-blue-600 shadow-xl w-8 h-8 rounded-full border-4 border-slate-900 shrink-0">
        <h1 className="mx-auto font-semibold text-xs text-white">{event.year.toString().slice(-2)}</h1>
      </div>

      <button
        onClick={onClick}
        className={`order-1 rounded-xl shadow-xl w-full lg:w-5/12 px-6 py-4 transition-all duration-300 text-left border
          ${isActive 
            ? 'bg-blue-600/20 border-blue-500 scale-105' 
            : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'}`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-blue-400 font-bold text-sm tracking-widest uppercase mono">{event.year}</span>
          <span className="text-xl">{event.icon}</span>
        </div>
        <h3 className="font-bold text-white text-lg mb-1">{event.name}</h3>
        <p className="text-slate-400 text-xs font-medium uppercase tracking-tighter mb-2">{event.company}</p>
        <p className="text-sm text-slate-300 leading-snug line-clamp-2">{event.description}</p>
        
        <div className="mt-3 flex items-center text-blue-400 text-xs font-semibold group">
          Részletek betöltése AI-val
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default TimelineItem;
