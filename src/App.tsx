import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AudioProvider, useAudio } from './components/AudioProvider';
import { IntroScreen } from './components/IntroScreen';
import { ChatLetter } from './components/ChatLetter';
import { FinalScreen } from './components/FinalScreen';

type Screen = 'intro' | 'chat' | 'final';

function LoveLetterApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const { playMusic } = useAudio();

  const handleStart = () => {
    playMusic();
    setCurrentScreen('chat');
  };

  const handleChatComplete = () => {
    setCurrentScreen('final');
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {currentScreen === 'intro' && (
          <IntroScreen key="intro" onStart={handleStart} />
        )}
        {currentScreen === 'chat' && (
          <ChatLetter key="chat" onComplete={handleChatComplete} />
        )}
        {currentScreen === 'final' && (
          <FinalScreen key="final" />
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <AudioProvider>
      <LoveLetterApp />
    </AudioProvider>
  );
}

export default App;
