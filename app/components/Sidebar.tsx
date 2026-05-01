'use client';
import React, { useState } from 'react';
import { Home, Search, Library, TrendingUp, Music2, Disc, Menu, X } from 'lucide-react';

interface SidebarProps {
  setView: (view: string) => void;
  activeView: string;
}

export default function Sidebar({ setView, activeView }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false); 

  const handleNav = (id: string) => {
    setView(id);
    setIsOpen(false); // Closes menu after selecting a tab
  };

  return (
    <>
      {/* MOBILE MENU BUTTON - Small and Subtle */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-3 left-3 z-[100] bg-zinc-800/80 hover:bg-zinc-700 backdrop-blur-md p-2 rounded-lg text-white border border-zinc-700 shadow-xl active:scale-90 transition-all"
      >
        <Menu size={18} />
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[110] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <div className={`
        fixed md:relative z-[120] h-screen w-64 bg-black p-6 flex flex-col gap-8 border-r border-zinc-800 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* LOGO AREA */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-green-500 font-bold text-xl">
            <div className="bg-green-500 p-1 rounded-sm text-black">DPR</div>
            <span className="text-white font-black tracking-tighter">MUSIC</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-zinc-400">
            <X size={20} />
          </button>
        </div>

        {/* MAIN NAV */}
        <nav className="flex flex-col gap-4">
          <button onClick={() => handleNav('home')} className={`flex items-center gap-4 p-2 rounded-md text-sm transition-all ${activeView === 'home' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}>
            <Home size={18} /> Home
          </button>
          <button onClick={() => handleNav('search')} className={`flex items-center gap-4 p-2 rounded-md text-sm transition-all ${activeView === 'search' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}>
            <Search size={18} /> Search
          </button>
          <button onClick={() => handleNav('library')} className={`flex items-center gap-4 p-2 rounded-md text-sm transition-all ${activeView === 'library' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}>
            <Library size={18} /> My Library
          </button>
        </nav>

        {/* BROWSE SECTION - REDUCED SIZE (Ref: image_815b6d.png) */}
        <div className="mt-4">
          <p className="text-zinc-500 uppercase text-[10px] font-bold mb-2 px-2 tracking-widest">Browse</p>
          <div className="flex flex-col gap-1">
            <button 
              onClick={() => handleNav('charts')} 
              className={`flex items-center gap-3 p-2 text-xs transition-all rounded-md ${activeView === 'charts' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              <TrendingUp size={16} /> Top Charts
            </button>
            <button 
              onClick={() => handleNav('melodies')} 
              className={`flex items-center gap-3 p-2 text-xs transition-all rounded-md ${activeView === 'melodies' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              <Music2 size={16} /> Kannada Melodies
            </button>
            <button 
              onClick={() => handleNav('hindi')} 
              className={`flex items-center gap-3 p-2 text-xs transition-all rounded-md ${activeView === 'hindi' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              <Disc size={16} /> Hindi Hits
            </button>
          </div>
        </div>
      </div>
    </>
  );
}