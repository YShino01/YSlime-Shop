import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),    // Show text
      setTimeout(() => setStage(2), 2500),    // Connect
      setTimeout(() => setStage(3), 3500),    // Move up
      setTimeout(() => onComplete(), 5000),   // Complete (increased delay to let header fade in properly)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 4 && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <motion.div
            className="flex items-center gap-4"
            animate={{
              y: stage >= 3 ? "-45vh" : 0,
              scale: stage >= 3 ? 0.4 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              data-testid="logo-y"
            >
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M30 20 L60 70 L60 110 M60 70 L90 20"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: stage >= 1 ? 1 : 0, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-bold text-primary tracking-wide whitespace-nowrap"
              data-testid="text-slime"
            >
              Slime
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
