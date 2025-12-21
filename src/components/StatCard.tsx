import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";

interface StatCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  trend?: number;
  color: string;
  delay?: number;
}

const AnimatedNumber = ({ value, delay }: { value: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const spring = useSpring(0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });

  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        spring.set(value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, spring, value, delay]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const StatCard = ({ title, value, unit, icon: Icon, trend, color, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="stat-card group p-3 sm:p-4 md:p-6"
    >
      <div className="flex items-start justify-between mb-2 sm:mb-4">
        <div
          className="p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color }} />
        </div>
      </div>

      <p className="text-muted-foreground text-xs sm:text-sm mb-1 line-clamp-2">{title}</p>

      <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
          <AnimatedNumber value={value} delay={delay + 0.3} />
        </span>
        <span className="text-muted-foreground text-xs sm:text-sm">{unit}</span>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.4 }}
        className="mt-4 h-1 rounded-full origin-left"
        style={{ backgroundColor: `${color}40` }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.7 }}
          transition={{ duration: 1, delay: delay + 0.6 }}
          className="h-full rounded-full origin-left"
          style={{ backgroundColor: color }}
        />
      </motion.div>
    </motion.div>
  );
};

export default StatCard;
