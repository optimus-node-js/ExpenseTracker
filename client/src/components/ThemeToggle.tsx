import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeToggle();
  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full flex items-center justify-center focus:outline-none border-2 border-gray-200 dark:border-gray-700"
      aria-label="Toggle theme"
    >
      {/* Animated Background Circle */}
      <motion.div 
        className={cn(
          "absolute w-full h-full rounded-full",
          isDark ? "bg-blue-600" : "bg-amber-500"
        )}
        initial={false}
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 200
        }}
      />
      
      {/* Sun Icon */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{ 
          opacity: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0,
          scale: isDark ? 0 : 1
        }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100
        }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sun className="h-5 w-5 text-white" />
        </motion.div>
      </motion.div>
      
      {/* Moon Icon */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{ 
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
          scale: isDark ? 1 : 0
        }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100
        }}
      >
        <Moon className="h-5 w-5 text-white" />
      </motion.div>
      
      {/* Stars Animation (only in dark mode) */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              style={{
                top: `${15 + (i * 18)}%`,
                left: `${15 + (i * 18)}%`,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
      
      {/* Sun Rays Animation (only in light mode) */}
      {!isDark && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              className="absolute h-0.5 bg-yellow-100 origin-center"
              style={{
                left: "50%",
                top: "50%",
                width: "40%",
                transform: `rotate(${i * 45}deg) translateX(50%)`,
              }}
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scaleX: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}
