import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MessageBubbleProps {
  text: string;
  delay: number;
  isFromAlan?: boolean; // Agrega esta línea
}

export function MessageBubble({ text, delay, isFromAlan = true }: MessageBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typingSpeed = 30;

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  const isSpecialMessage = text.includes('🤍') || text.includes('💖');

  return (
    <motion.div
      className={`message-bubble ${isFromAlan ? 'from-alan' : 'from-keybeth'} ${isSpecialMessage ? 'special-message' : ''}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        alignSelf: isFromAlan ? 'flex-start' : 'flex-end',
      }}
    >
      <div className="message-content">
        {isFromAlan && (
          <div className="message-sender">
            <span className="sender-name">Alan</span>
          </div>
        )}
        
        <motion.div 
          className="message-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {displayedText}
          {isTyping && (
            <motion.span
              className="typing-cursor"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              ▋
            </motion.span>
          )}
        </motion.div>
        
        <div className="message-time">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
}