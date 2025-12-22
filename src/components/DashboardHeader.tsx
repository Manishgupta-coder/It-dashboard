import { motion } from "framer-motion";
import { Recycle, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import SBIFoundation from "@/assets/images/SBI-Foundation.png";
import SBIConserw from "@/assets/images/Sbi-CONSERW.png";
import Ayodhya from "@/assets/images/Ayodhya.png";
import Chintan from "@/assets/images/Chintan.png";

const DashboardHeader = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >

      {/* Partner Logos - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center mb-6 sm:mb-6 w-full"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 items-center justify-items-center gap-3 sm:gap-4 md:gap-6 w-full bg-white/90 dark:bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5">
          <div className="flex items-center justify-center h-12 sm:h-12 md:h-16 lg:h-20 w-[60%]">
            <img src={SBIFoundation} alt="SBI Foundation" className="h-full w-auto object-contain" />
          </div>
          <div className="flex items-center justify-center h-12 sm:h-12 md:h-16 lg:h-20 w-full">
            <img src={SBIConserw} alt="SBI CONSERW" className="h-full w-auto object-contain" />
          </div>
          <div className="flex items-center justify-center h-12 sm:h-12 md:h-16 lg:h-20 w-full">
            <img src={Ayodhya} alt="Ayodhya" className="h-full w-auto object-contain" />
          </div>
          <div className="flex items-center justify-center h-12 sm:h-12 md:h-16 lg:h-20 w-full">
            <img src={Chintan} alt="Chintan" className="h-full w-auto object-contain" />
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-primary/20 animate-pulse-glow flex-shrink-0"
          >
            <Recycle className="w-5 h-5 sm:w-8 sm:h-8 text-primary" />
          </motion.div>
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground leading-tight mb-2">
              SBIF CONSERW: Waste No More in Ayodhya
            </h1>
            <p >IT Dashboard</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-secondary/50 border border-border/50 self-end lg:self-auto"
        >
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-xs sm:text-sm text-muted-foreground">
            {format(currentDate, "dd MMM yyyy, HH:mm:ss")}
          </span>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;