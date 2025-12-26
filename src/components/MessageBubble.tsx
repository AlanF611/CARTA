import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MessageBubbleProps {
  text: string;
  delay: number;
  isFromAlan?: boolean;
  typingSpeed?: number;
}

export function MessageBubble({ 
  text, 
  delay, 
  isFromAlan = true, 
  typingSpeed = 40 
}: MessageBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

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
  }, [text, delay, typingSpeed]);

  return (
    <motion.div
      className={`message-bubble ${isFromAlan ? 'from-alan' : 'from-keybeth'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        alignSelf: isFromAlan ? 'flex-start' : 'flex-end',
      }}
    >
      <div className="message-text">
        {displayedText}
        {isTyping && (
          <motion.span
            className="typing-cursor"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            |
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
