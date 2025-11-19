import { motion } from "framer-motion";

interface BrandMarkProps {
  size?: "large" | "small";
  className?: string;
}

export function BrandMark({ size = "large", className = "" }: BrandMarkProps) {
  const isLarge = size === "large";

  return (
    <motion.div layoutId="brand-mark" className={`flex items-center gap-2 ${className}`}>
      <motion.div layoutId="brand-logo">
        <svg
          width={isLarge ? "120" : "32"}
          height={isLarge ? "120" : "32"}
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
        layoutId="brand-text"
        className={`font-bold text-primary tracking-wide ${isLarge ? "text-6xl" : "text-2xl"}`}
      >
        Slime
      </motion.span>
    </motion.div>
  );
}
