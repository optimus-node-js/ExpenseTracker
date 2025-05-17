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
      className={cn(
        "relative w-12 h-6 rounded-full px-1 transition-colors duration-300 ease-in-out focus:outline-none", 
        isDark 
          ? "bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600" 
          : "bg-gradient-to-r from-orange-300 via-amber-400 to-yellow-300"
      )}
      aria-label="Toggle theme"
    >
      <motion.div 
        className={cn(
          "absolute top-1 w-4 h-4 rounded-full shadow-lg flex items-center justify-center",
          isDark ? "bg-slate-900" : "bg-white"
        )}
        animate={{ 
          x: isDark ? 24 : 0,
          rotate: isDark ? 360 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 20,
          duration: 0.3
        }}
      >
        <motion.div
          initial={false}
          animate={{ 
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="h-3 w-3 text-amber-500" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ 
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0 
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Moon className="h-3 w-3 text-blue-300" />
        </motion.div>
      </motion.div>
      
      {/* Stars/Sun rays animation */}
      {isDark ? (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-blue-200 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                x: Math.random() * 40,
                y: Math.random() * 6 
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              className="absolute h-0.5 bg-yellow-200 origin-left"
              style={{
                left: "25%",
                top: "50%",
                width: "30%",
                rotate: i * 72
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scaleX: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}
