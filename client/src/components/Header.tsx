import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  show: boolean;
}

export function Header({ show }: HeaderProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.header
          key="header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-primary/20"
          data-testid="header"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center gap-2">
              <svg
                width="32"
                height="32"
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
              <span className="text-2xl font-bold text-primary tracking-wide">Slime</span>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
