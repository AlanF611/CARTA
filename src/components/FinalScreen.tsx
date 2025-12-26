import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function FinalScreen() {
  const hearts = Array.from({ length: 12 });

  return (
    <motion.div
      className="screen final-screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hearts-container">
        {hearts.map((_, index) => (
          <motion.div
            key={index}
            className="floating-heart"
            initial={{
              y: '100vh',
              x: Math.random() * window.innerWidth,
              opacity: 0,
            }}
            animate={{
              y: '-20vh',
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: index * 0.8,
              ease: 'linear',
            }}
          >
            <Heart size={16 + Math.random() * 12} fill="rgba(255, 192, 203, 0.3)" stroke="rgba(255, 192, 203, 0.6)" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="final-content"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.h1
          className="final-title"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Gracias por llegar a mi vida
        </motion.h1>

        <motion.h2
          className="final-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Quiero que estés conmigo siempre
        </motion.h2>

        <motion.button
          className="ios-button final-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Siempre contigo 🤍
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
