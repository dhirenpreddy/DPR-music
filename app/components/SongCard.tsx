'use client';
import { Heart, PlusCircle, Play } from 'lucide-react';

export default function SongCard({ track, isLiked, onPlay, onLike, onQueue }: any) {
  return (
    <div className="group relative bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 transition">
      <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
        {/* CHANGED: track.image is now a direct string */}
        <img src={track.image} className="object-cover w-full h-full" alt={track.name} />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <button onClick={onPlay} className="bg-green-500 p-3 rounded-full text-black">
             <Play fill="black" size={20}/>
          </button>
        </div>
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <Heart 
            className={`cursor-pointer ${isLiked ? "fill-green-500 text-green-500" : "text-white"}`} 
            onClick={(e) => { e.stopPropagation(); onLike(); }} 
          />
          <PlusCircle 
            className="text-white cursor-pointer" 
            onClick={(e) => { e.stopPropagation(); onQueue(); }} 
          />
        </div>
      </div>
      <p className="text-white font-bold truncate text-sm">{track.name}</p>
      {/* CHANGED: track.artist is the new key from api.ts */}
      <p className="text-zinc-500 truncate text-xs">{track.artist}</p>
    </div>
  );
}