import { createContext, useContext, useRef, ReactNode } from 'react';

interface AudioContextType {
  playMusic: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/love.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
    audioRef.current.play().catch(err => console.log('Audio play failed:', err));
  };

  return (
    <AudioContext.Provider value={{ playMusic }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
