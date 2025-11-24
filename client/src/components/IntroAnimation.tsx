import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),     // Fade in logo
      setTimeout(() => setStage(2), 2000),    // Scale animation
      setTimeout(() => setStage(3), 3000),    // Start fade out
      setTimeout(() => onComplete(), 3800),   // Complete
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: stage >= 3 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <motion.div
            className="flex items-center gap-2"
          >
            <motion.img
              src="/YSlime_Logo.png"
              alt="YSlime Logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: stage >= 1 ? 1 : 0, 
                scale: stage >= 1 ? 1 : 0.8,
                rotate: stage >= 2 ? [0, 5, -5, 0] : 0,
              }}
              transition={{ 
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                rotate: { duration: 0.6, delay: 0.2 }
              }}
              className="w-32 h-32 object-contain"
              data-testid="logo-intro"
            />

            <motion.img
              src="/Yoshino_Slime.png"
              alt="Slime"
              initial={{ opacity: 0, y: -2-0 }}
              animate={{ opacity: stage >= 1 ? 1 : 0, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-48 h-48 object-contain -ml-6 mt-8"
              data-testid="text-slime"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
