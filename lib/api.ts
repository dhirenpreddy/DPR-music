// Checks for the env variable first, falls back to sumit.co if missing
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jiosaavn-api-sigma-sandy.vercel.app';

const cleanName = (name: string) => {
  return name
    .replace(/\(From.*?\)/gi, '') 
    .replace(/\(.*?\)/gi, '')     
    .replace(/From\s+".*?"/gi, '') 
    .trim();                       
};

export async function searchSongs(query: string) {
  try {
    const response = await fetch(`${BASE_URL}/search/songs?query=${encodeURIComponent(query)}&limit=50`);
    const res = await response.json();
    
    if (!res.data || !res.data.results) return [];

    return res.data.results.map((song: any) => ({
      id: song.id,
      name: cleanName(song.name),
      artist: song.primaryArtists || song.artists?.primary?.[0]?.name || 'Unknown Artist',
      // This is the CRITICAL part - finding the actual audio file
      url: song.downloadUrl?.[4]?.link || song.downloadUrl?.[4]?.url || 
           song.downloadUrl?.[0]?.link || '/fallback-audio.mp3', 
      image: song.image?.[2]?.link || song.image?.[2]?.url || '/placeholder.png',
      duration: song.duration
    }));
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}