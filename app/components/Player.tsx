'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, Heart, Volume2 } from 'lucide-react';

export default function Player({ track, isLiked, onLike, onNext, onEnded }: any) {
  if (!track) return null;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Auto-play and reset when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Playback blocked:", err));
      setIsPlaying(true);
    }
  }, [track]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  // Helper to format time (e.g., 125s -> 2:05)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-zinc-800 p-4 z-50">
      <audio 
        ref={audioRef} 
        src={track.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded} 
        autoPlay
      />

      {/* THE SCRUBBER BAR */}
      <div className="absolute top-0 left-0 right-0 px-4 -translate-y-1/2 group">
        <input 
          type="range" 
          min="0" 
          max={duration || 0} 
          value={progress}
          onChange={handleSeek}
          className="w-full h-1 bg-zinc-600 appearance-none cursor-pointer accent-green-500 hover:h-1.5 transition-all"
        />
      </div>

      <div className="flex items-center justify-between max-w-7xl mx-auto mt-2">
        {/* Track Info */}
        <div className="flex items-center gap-4 w-1/3">
          <img src={track.image} className="w-14 h-14 rounded shadow-lg object-cover" alt={track.name} />
          <div className="overflow-hidden">
            <p className="text-white text-sm font-bold truncate">{track.name}</p>
            <p className="text-zinc-400 text-xs truncate">{track.artist}</p>
          </div>
          <Heart 
            size={18} 
            className={`cursor-pointer ml-2 transition-colors ${isLiked ? "fill-green-500 text-green-500" : "text-zinc-400 hover:text-white"}`}
            onClick={onLike}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-1 w-1/3">
          <div className="flex items-center gap-6">
            <button 
              onClick={togglePlay} 
              className="bg-white rounded-full p-2 hover:scale-105 transition active:scale-95"
            >
              {isPlaying ? (
                <Pause size={24} fill="black" className="text-black" />
              ) : (
                <Play size={24} fill="black" className="text-black" />
              )}
            </button>
            <button 
              onClick={onNext} 
              className="text-zinc-400 hover:text-white transition active:scale-90"
            >
              <SkipForward size={24} fill="currentColor" />
            </button>
          </div>
          <div className="flex gap-2 text-[10px] text-zinc-500">
            <span>{formatTime(progress)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume / Extra Space */}
        <div className="w-1/3 flex justify-end items-center gap-3 text-zinc-400">
          <Volume2 size={20} />
          <div className="w-24 h-1 bg-zinc-600 rounded-full overflow-hidden">
            <div className="bg-white h-full w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}