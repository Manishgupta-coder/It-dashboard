import { motion } from "framer-motion";
import { Calendar, FileText, Download, X, Info } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import SBIFoundation from "@/assets/images/SBI-Foundation.png";
import SBIConserw from "@/assets/images/Sbi-CONSERW.png";
import Ayodhya from "@/assets/images/Ayodhya.png";
import Chintan from "@/assets/images/Chintan.png";
import AyodhyaBanner from "@/assets/images/ayodhya.webp";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      {/* Partner Logos - Matching reference image layout */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center mb-4 w-full"
      >
        <div className="flex items-center justify-between w-full bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6">
          <div className="flex items-center justify-center h-10 sm:h-14 md:h-16 lg:h-20">
            <img src={SBIFoundation} alt="SBI Foundation" className="h-full w-auto object-contain" />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-14 md:h-16 lg:h-20">
            <img src={SBIConserw} alt="SBI CONSERW" className="h-full w-auto object-contain" />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-14 md:h-16 lg:h-20">
            <img src={Ayodhya} alt="Ayodhya" className="h-full w-auto object-contain" />
          </div>
          <div className="flex items-center justify-center h-10 sm:h-14 md:h-16 lg:h-20">
            <img src={Chintan} alt="Chintan" className="h-full w-auto object-contain" />
          </div>
        </div>
      </motion.div>

      {/* Ayodhya Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 mb-6 w-full overflow-hidden rounded-lg sm:rounded-xl relative"
      >
        <img 
          src={AyodhyaBanner} 
          alt="SBIF CONSERW: Waste No More in Ayodhya" 
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600/70 via-sky-500/60 to-teal-500/70 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-lg tracking-wide mb-2 sm:mb-3 text-center">
            SBIF CONSERW: WASTE NO MORE IN AYODHYA
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/90 italic max-w-4xl mx-auto leading-relaxed text-center">
            Supported by Ayodhya Nagar Nigam, Chintan Environmental Research and Action Group, and SBI Foundation under their Conservation through Sustainable Engagements, Restoration and Wildlife Protection (CONSERW) program
          </p>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">
            Waste Management Dashboard - Ayodhya
          </h1>
          
          {/* Project Details and Report Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Project Details Button */}
            <Dialog>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-xs sm:text-sm font-medium transition-colors"
                >
                  <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Project Details</span>
                </motion.button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Project Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Project Name</h4>
                    <p className="text-muted-foreground text-sm">SBI CONSERW - Waste Management Initiative</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Location</h4>
                    <p className="text-muted-foreground text-sm">Ayodhya, Uttar Pradesh</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Partners</h4>
                    <ul className="text-muted-foreground text-sm list-disc list-inside">
                      <li>SBI Foundation</li>
                      <li>SBI CONSERW</li>
                      <li>Chintan Environmental Research and Action Group</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Description</h4>
                    <p className="text-muted-foreground text-sm">
                      This initiative focuses on sustainable waste management practices including collection, 
                      segregation, and recycling of various waste categories such as plastic, paper, glass, 
                      metal, and e-waste in the Ayodhya region.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const content = `SBI CONSERW - Waste Management Initiative
Location: Ayodhya, Uttar Pradesh

Partners:
- SBI Foundation
- SBI CONSERW
- Chintan Environmental Research and Action Group

Description:
This initiative focuses on sustainable waste management practices including collection, 
segregation, and recycling of various waste categories such as plastic, paper, glass, 
metal, and e-waste in the Ayodhya region.`;
                      const blob = new Blob([content], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'project-details.txt';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors w-full justify-center"
                  >
                    <Download className="w-4 h-4" />
                    Download Project Details
                  </motion.button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Report Download Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const reportContent = `Waste Management Report - Ayodhya
Generated: ${format(new Date(), "dd MMM yyyy, HH:mm")}

Summary Report:
This report contains the waste collection and segregation data for the Ayodhya region 
under the SBI CONSERW initiative.

Categories Tracked:
- Plastic Waste
- Paper Waste
- Glass Waste
- Metal Waste
- E-Waste
- Others (Medicines, Thermometers, etc.)

For detailed data, please refer to the dashboard.`;
                const blob = new Blob([reportContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'waste-management-report.txt';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent-foreground text-xs sm:text-sm font-medium transition-colors"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Report</span>
              <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </motion.button>
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