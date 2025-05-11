import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full"
      aria-label="Toggle theme"
    >
      <motion.div 
        className="relative h-5 w-5"
        animate={{ rotate: theme === "dark" ? 360 : 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <motion.div
          animate={{ 
            opacity: theme === "dark" ? 0 : 1,
            scale: theme === "dark" ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
        <motion.div
          animate={{ 
            opacity: theme === "dark" ? 1 : 0,
            scale: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </Button>
  );
}
