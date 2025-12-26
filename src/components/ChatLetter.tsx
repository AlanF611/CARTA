import { motion } from 'framer-motion';
import { MessageBubble } from './MessageBubble';
import { useEffect, useRef, useState } from 'react';

interface ChatLetterProps {
  onComplete: () => void;
}

const messages = [
  "Hola cariño 🤍",
  "Nunca fui bueno para decir lo que siento",
  "Pero contigo… todo es diferente",
  "Llegaste a mi vida cuando menos lo esperaba",
  "Y sin darme cuenta, te volviste parte de mi día",
  "Empezamos a hablar un 16 de noviembre",
  "Y siento como si llevara mucho más tiempo contigo",
  "Hay personas que llegan despacio",
  "Pero se quedan profundo",
  "y quiero que te quedes siempre",
  "por que",
  "Contigo siento paz",
  "Siento emoción",
  "Siento hogar",
  "Siento que puedo ser yo mismo",
  "No sé cómo explicarlo",
  "Pero siento demasiado por ti",
  "Y no quiero que esto sea solo un momento",
  "Quiero que seas mi siempre",
  "Quiero caminar contigo",
  "Elegirte todos los días",
  "Y que sepas que aquí tienes a alguien que te cuida",
  "Que te piensa",
  "Y que te quiere de verdad 🤍",
];

export function ChatLetter({ onComplete }: ChatLetterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  // Mostrar mensajes progresivamente
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    messages.forEach((_, index) => {
      const interval = setTimeout(() => {
        setVisibleMessages(prev => prev + 1);
        
        // Scroll automático después de cada mensaje
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        }, 100);
      }, index * 1200); // 1.2 segundos entre mensajes (más lento para iPhone)
      
      intervals.push(interval);
    });

    // Tiempo total + 3 segundos extra para el mensaje final
    const totalTime = messages.length * 1200 + 3000;
    const completionTimeout = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, totalTime);

    return () => {
      intervals.forEach(clearTimeout);
      clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  // Scroll inicial al fondo
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="screen chat-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Header para iPhone */}
      <div className="chat-header">
        <div className="header-content">
          <div className="avatar">
            <div className="avatar-circle">💌</div>
          </div>
          <div className="header-text">
            <h3>Para Keybeth 💝</h3>
            <p>De Alan</p>
          </div>
        </div>
        <div className="header-status">
          <span className="status-dot"></span>
          <span className="status-text">Ahora</span>
        </div>
      </div>

      {/* Contenedor de mensajes optimizado para iPhone */}
      <div 
        className="chat-container" 
        ref={containerRef}
      >
        <div className="messages">
          {/* Los primeros mensajes aparecen aquí */}
          {messages.slice(0, visibleMessages).map((message, index) => {
            // Determinar si es un mensaje especial (los de Alan van a la izquierda, los especiales a la derecha)
            const isFromAlan = !message.includes('🤍') && !message.includes('💝');
            
            return (
              <MessageBubble
                key={index}
                text={message}
                delay={0} // Controlamos el timing con visibleMessages
                isFromAlan={isFromAlan}
              />
            );
          })}

          {/* Mensaje final */}
          {isComplete && (
            <motion.div 
              className="message-complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="complete-content">
                <div className="complete-icon">💝</div>
                <p className="complete-message">Con todo mi amor, Alan</p>
                <p className="complete-date">16 de Noviembre</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer minimalista */}
      <div className="chat-footer">
        <div className="footer-content">
          <span className="footer-heart">❤️</span>
          <span className="footer-text">Una carta especial para ti</span>
          <span className="footer-heart">❤️</span>
        </div>
      </div>
    </motion.div>
  );
}