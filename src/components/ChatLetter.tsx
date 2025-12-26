import { motion } from 'framer-motion';
import { MessageBubble } from './MessageBubble';
import { useEffect, useRef, useState, useCallback } from 'react';

interface ChatLetterProps {
  onComplete: () => void;
}

const messages = [
  { text: "Hola mi amor 💖", isFromAlan: false, delay: 800 },
  { text: "Nunca fui bueno para decir lo que siento...", isFromAlan: true, delay: 1500 },
  { text: "Pero contigo todo es diferente ✨", isFromAlan: true, delay: 1200 },
  { text: "Llegaste a mi vida cuando menos lo esperaba", isFromAlan: true, delay: 1600 },
  { text: "Y sin darme cuenta, te volviste parte de mi día ☀️", isFromAlan: true, delay: 1800 },
  { text: "Empezamos a hablar un 16 de noviembre", isFromAlan: true, delay: 1400 },
  { text: "Y siento como si llevara toda la vida contigo 💫", isFromAlan: true, delay: 2000 },
  { text: "Hay personas que llegan despacio...", isFromAlan: true, delay: 1200 },
  { text: "Pero se quedan para siempre en el corazón ❤️", isFromAlan: true, delay: 1600 },
  { text: "Y tú eres esa persona para mí", isFromAlan: true, delay: 1200 },
  { text: "Contigo siento paz 🕊️", isFromAlan: true, delay: 1000 },
  { text: "Siento emoción 🎉", isFromAlan: true, delay: 1000 },
  { text: "Siento hogar 🏡", isFromAlan: true, delay: 1000 },
  { text: "Siento que puedo ser yo mismo", isFromAlan: true, delay: 1200 },
  { text: "No sé cómo explicarlo...", isFromAlan: true, delay: 1200 },
  { text: "Pero siento demasiado por ti 💕", isFromAlan: true, delay: 1400 },
  { text: "Y no quiero que esto sea solo un momento", isFromAlan: true, delay: 1500 },
  { text: "Quiero que seas mi siempre 🌙", isFromAlan: true, delay: 1200 },
  { text: "Quiero caminar contigo cada día", isFromAlan: true, delay: 1400 },
  { text: "Elegirte todas las mañanas ☕", isFromAlan: true, delay: 1200 },
  { text: "Y que sepas que aquí tienes a alguien que te cuida", isFromAlan: true, delay: 2000 },
  { text: "Que te piensa en cada momento 💭", isFromAlan: true, delay: 1400 },
  { text: "Que te admira cada día 🌟", isFromAlan: true, delay: 1300 },
  { text: "Y que te quiere con todo su corazón 🤍", isFromAlan: false, delay: 1800 },
];

export function ChatLetter({ onComplete }: ChatLetterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showTyping, setShowTyping] = useState(true);

  // Función para hacer scroll automático
  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight;
      const clientHeight = containerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      
      containerRef.current.scrollTo({
        top: maxScrollTop,
        behavior: 'smooth'
      });
    }
  }, []);

  // Función para hacer scroll al final
  const scrollToBottomInstant = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  // Mostrar mensajes progresivamente
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    let accumulatedDelay = 500; // Espera inicial

    messages.forEach((message, index) => {
      timeouts.push(
        setTimeout(() => {
          setVisibleMessages(prev => [...prev, index]);
          
          // Scroll automático después de un pequeño delay
          setTimeout(() => {
            scrollToBottom();
          }, 300);
          
          // Si es el último mensaje, ocultar typing
          if (index === messages.length - 1) {
            setTimeout(() => {
              setShowTyping(false);
            }, message.delay + 1000);
          }
        }, accumulatedDelay)
      );
      
      accumulatedDelay += message.delay;
    });

    // Completar después de todos los mensajes
    const totalTime = accumulatedDelay + 3000;
    const completionTimeout = setTimeout(() => {
      setIsComplete(true);
      scrollToBottom();
      
      setTimeout(() => {
        onComplete();
      }, 4000);
    }, totalTime);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      clearTimeout(completionTimeout);
    };
  }, [scrollToBottom, onComplete]);

  // Scroll inicial al fondo
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottomInstant();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [scrollToBottomInstant]);

  // Scroll adicional cuando se añaden mensajes
  useEffect(() => {
    if (visibleMessages.length > 0) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [visibleMessages, scrollToBottom]);

  return (
    <motion.div
      className="screen chat-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header iOS Messages */}
      <div className="chat-header">
        <div className="header-content">
          <div className="avatar-circle">KB</div>
          <div className="header-text">
            <h3>Keybeth 💝</h3>
            <p>{showTyping ? "Alan está escribiendo..." : "En línea • Ahora"}</p>
          </div>
        </div>
        <div className="header-icons">
          <span className="header-icon">📞</span>
          <span className="header-icon">📷</span>
        </div>
      </div>

      {/* Contenedor de mensajes CON SCROLL */}
      <div 
        className="chat-container" 
        ref={containerRef}
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 120px)'
        }}
      >
        <div className="messages-wrapper">
          <div className="messages">
            {/* Mensaje de bienvenida */}
            <div className="welcome-bubble">
              <div className="welcome-icon">💌</div>
              <p className="welcome-text">Carta de amor para Keybeth</p>
              <p className="welcome-subtext">De Alan • 16 de Noviembre</p>
            </div>

            {/* Mensajes */}
            {messages.map((message, index) => {
              if (!visibleMessages.includes(index)) return null;
              
              return (
                <MessageBubble
                  key={index}
                  text={message.text}
                  delay={0}
                  isFromAlan={message.isFromAlan}
                  typingSpeed={message.isFromAlan ? 40 : 35}
                />
              );
            })}

            {/* Indicador de typing (solo cuando hay mensajes por venir) */}
            {showTyping && visibleMessages.length < messages.length && (
              <div className="typing-indicator">
                <div className="typing-bubble">
                  <div className="typing-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <span className="typing-text">Alan está escribiendo...</span>
                </div>
              </div>
            )}

            {/* Mensaje final */}
            {isComplete && (
              <motion.div 
                className="final-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="final-content">
                  <div className="final-hearts">
                    <span className="heart">💖</span>
                    <span className="heart">💝</span>
                    <span className="heart">🤍</span>
                  </div>
                  <h2 className="final-title">Con todo mi amor</h2>
                  <p className="final-author">Alan</p>
                  <p className="final-date">16 de Noviembre 2024</p>
                </div>
              </motion.div>
            )}

            {/* Elemento invisible para scroll automático */}
            <div ref={messagesEndRef} style={{ height: '1px' }} />
          </div>
        </div>
      </div>

      {/* Footer iOS */}
      <div className="chat-footer">
        <div className="footer-content">
          <div className="message-input">
            <button className="input-button">➕</button>
            <div className="input-field">
              <span className="placeholder">iMessage</span>
            </div>
            <button className="input-button">🎤</button>
          </div>
          <button className="send-button">
            <span className="send-icon">↑</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
