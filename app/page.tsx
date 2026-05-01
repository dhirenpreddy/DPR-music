'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import SongCard from './components/SongCard';
import { searchSongs } from '../lib/api'; 

export default function HomeScreenPage() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [likedSongs, setLikedSongs] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [activeView, setActiveView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const loadMusic = async (query: string, append = false) => {
    try {
      const results = await searchSongs(query);
      if (append) {
        setTracks(prev => {
          const combined = [...prev, ...results];
          return combined.filter((t: any, i: number, s: any[]) => 
            i === s.findIndex((x: any) => x.id === t.id)
          );
        });
      } else {
        setTracks(results);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  // EFFECT 1: This handles the tab switching logic
  
   // EFFECT 1: Initial Load & Tab Switching
  useEffect(() => {
    const fetchByView = async () => {
      // Clear tracks when switching tabs to show loading state
      if (activeView !== 'search' && activeView !== 'library') {
        setTracks([]); 
      }

      // Load music based on the active tab topic
      if (activeView === 'home') {
        await loadMusic('kannada hits 2026');
      } else if (activeView === 'charts') {
        await loadMusic('kannada top charts'); // Topic: Top Charts
      } else if (activeView === 'melodies') {
        await loadMusic('telugu trending songs'); // Topic: Melodies
      } else if (activeView === 'hindi') {
        await loadMusic('hindi trending hits'); // Topic: Hindi Trending
      }
    };
    
    fetchByView();
  }, [activeView]); 
    
    

  // Rest of your logic (Search, playNext, toggleLike) remains exactly the same
  useEffect(() => {
    if (activeView === 'search' && searchQuery) {
      const delay = setTimeout(() => {
        loadMusic(searchQuery);
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [searchQuery, activeView]);

  const playNext = () => {
    if (queue.length > 0) {
      const nextInQueue = queue[0];
      setCurrentTrack(nextInQueue);
      setQueue(prev => prev.slice(1));
    } else if (tracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrack(tracks[randomIndex]);
    }
  };

  const toggleLike = (track: any) => {
    setLikedSongs((prev: any[]) => 
      prev.some((t: any) => t.id === track.id) 
        ? prev.filter((t: any) => t.id !== track.id) 
        : [...prev, track]
    );
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden text-white font-sans">
      <Sidebar activeView={activeView} setView={setActiveView} />

      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-900 to-black p-8 pb-32">
        
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold capitalize">
            {activeView === 'home' && 'Happy Listening'}
            {activeView === 'charts' && 'Top Charts'}
            {activeView === 'melodies' && 'Telugu Melodies'}
            {activeView === 'hindi' && 'Hindi Trending'}
            {activeView === 'search' && 'Search'}
            {activeView === 'library' && 'Your Library'}
          </h1>

          {/* Refresh Button - Keep your existing logic */}
          {activeView !== 'library' && activeView !== 'search' && (
            <button 
              onClick={() => {
                setTracks([]); 
                const queries: { [key: string]: string[] } = {
                  home: ['kannada hits 2026', 'new kannada songs', 'kannada trending'],
                  charts: ['kannada trending', 'kannada weekly charts'],
                  melodies: ['telugu trending songs', 'old telugu melodies'],
                  hindi: ['latest hindi hits', 'bollywood 2026', 'hindi romantic']
                };
                const possibleQueries = queries[activeView];
                const randomQuery = possibleQueries[Math.floor(Math.random() * possibleQueries.length)];
                loadMusic(randomQuery);
              }}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold py-2 px-4 rounded-full transition-all active:scale-95 border border-zinc-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
              </svg>
              Refresh
            </button>
          )}
        </div>

        {activeView === 'search' && (
          <input 
            autoFocus
            placeholder="Search for songs or artists..."
            className="w-full max-w-xl bg-zinc-800 p-4 rounded-full mb-8 outline-none border-2 border-transparent focus:border-white transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-4">
          {(activeView === 'library' ? likedSongs : tracks).map((track: any) => (
            <SongCard 
              key={track.id} 
              track={track}
              isLiked={likedSongs.some((s: any) => s.id === track.id)}
              onPlay={() => setCurrentTrack(track)}
              onLike={() => toggleLike(track)}
              onQueue={() => setQueue(prev => [...prev, track])}
            />
          ))}
        </div>

        {activeView === 'library' && likedSongs.length === 0 && (
          <div className="text-zinc-500 text-center mt-20">Your liked songs will appear here.</div>
        )}
        {activeView !== 'library' && tracks.length === 0 && (
          <div className="text-zinc-500 animate-pulse text-center mt-20">Loading songs...</div>
        )}
      </main>

      {currentTrack && (
        <Player 
          track={currentTrack} 
          isLiked={likedSongs.some((t: any) => t.id === currentTrack.id)}
          onLike={() => toggleLike(currentTrack)}
          onNext={playNext}
          onEnded={playNext}
        />
      )}
    </div>
  );
}