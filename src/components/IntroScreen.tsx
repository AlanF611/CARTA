import { motion } from 'framer-motion';

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <motion.div
      className="screen intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      {/* Fondo claro y romántico */}
      <div className="intro-background-light">
        <div className="heart-background"></div>
      </div>
      
      <motion.div
        className="intro-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.div 
          className="envelope-icon"
          initial={{ y: -20, rotate: -5 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ 
            delay: 0.5, 
            type: "spring", 
            stiffness: 150,
            damping: 10 
          }}
        >
          💌
        </motion.div>
        
        <h1 className="intro-title">
          Tengo algo que decirte… 🤍
        </h1>
        
        <p className="intro-subtitle">
          De Alan para Keybeth
        </p>

        <motion.button
          className="ios-button romantic-btn"
          onClick={onStart}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span className="btn-icon">❤️</span>
          <span className="btn-text">Abrir Carta de Amor</span>
        </motion.button>
        
        <motion.p 
          className="intro-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2 }}
        >
          Desde el 16 de Noviembre
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
