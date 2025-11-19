import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

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
          className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-primary/20"
          data-testid="header"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/YSlime_Logo.png"
                  alt="YSlime Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span className="text-2xl font-bold text-primary tracking-wide">Slime</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
