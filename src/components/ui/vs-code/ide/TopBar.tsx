import React from 'react';
import { ArrowLeft, Play, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TopBar() {
  const navigate = useNavigate();

  return (
    <div className="h-[40px] bg-[#151515] border-b border-[#242424] flex items-center px-4 shrink-0 shadow-sm relative text-[#cccccc]">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 hover:text-white transition-colors mr-4"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 bg-[#1e1e1e] border border-[#242424] px-3 py-1 rounded-md hover:border-[#3a3a3a] transition-colors">
        <span className="text-xs font-semibold">Sandbox</span>
        <span className="text-[#666666] text-xs">/</span>
        <span className="text-xs text-white">react-playground</span>
      </div>

      <div className="flex-1" />
      
      {/* Cụm menu ở giữa */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center h-full">
         <div className="flex items-center gap-2 bg-[#2a2d2e] rounded-md px-1 py-1 shadow-sm border border-[#3c3c3c]">
            <button className="px-3 py-1 hover:bg-[#3c3c3c] rounded text-[11px] font-medium transition-colors flex items-center gap-1">
               <Play className="w-3 h-3 text-green-400" /> Start
            </button>
            <div className="w-[1px] h-3 bg-[#4d4d4d]" />
            <button className="px-3 py-1 hover:bg-[#3c3c3c] rounded text-[11px] font-medium transition-colors flex items-center gap-1">
               <Download className="w-3 h-3" /> Export
            </button>
         </div>
      </div>

      <div className="flex items-center gap-3 relative z-10">
         <button className="bg-[#007acc] hover:bg-[#005f9e] text-white text-[11px] font-semibold px-3 py-1.5 rounded transition-colors hidden sm:block">
           Share
         </button>
         <button className="bg-[#1e1e1e] border border-[#3c3c3c] hover:bg-[#2a2a2a] text-white text-[11px] font-semibold px-3 py-1.5 rounded transition-colors hidden sm:block">
           Sign In
         </button>
      </div>
    </div>
  );
}
