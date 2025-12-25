import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  getPlasticBreakdown,
  getPaperBreakdown,
  getGlassBreakdown,
  getMetalBreakdown,
  getEwasteBreakdown,
  getOthersBreakdown,
} from "@/data/wasteData";
import { useWasteData } from "@/context/WasteDataContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PieChart as PieChartIcon } from "lucide-react";

const COLORS = [
  "hsl(160, 84%, 39%)",
  "hsl(340, 82%, 52%)",
  "hsl(45, 93%, 58%)",
  "hsl(199, 89%, 48%)",
  "hsl(280, 65%, 60%)",
  "hsl(120, 60%, 45%)",
  "hsl(15, 80%, 55%)",
];

type TimePeriod = "day" | "week" | "month" | "quarter" | "year";

const BreakdownChartsGrid = () => {
  const { wasteData } = useWasteData();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("day");

  const filteredData = useMemo(() => {
    if (!wasteData || wasteData.length === 0) return [];
    
    const now = new Date();
    const sortedData = [...wasteData].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    switch (timePeriod) {
      case "day":
        // Get the latest day's data
        return sortedData.slice(0, 1);
      case "week":
        // Get last 7 days
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return sortedData.filter(row => new Date(row.date) >= weekAgo);
      case "month":
        // Get last 30 days
        const monthAgo = new Date(now);
        monthAgo.setDate(monthAgo.getDate() - 30);
        return sortedData.filter(row => new Date(row.date) >= monthAgo);
      case "quarter":
        // Get last 90 days
        const quarterAgo = new Date(now);
        quarterAgo.setDate(quarterAgo.getDate() - 90);
        return sortedData.filter(row => new Date(row.date) >= quarterAgo);
      case "year":
        // Get all data (full year)
        return sortedData;
      default:
        return sortedData;
    }
  }, [wasteData, timePeriod]);

  const plasticData = getPlasticBreakdown(filteredData);
  const paperData = getPaperBreakdown(filteredData);
  const glassData = getGlassBreakdown(filteredData);
  const metalData = getMetalBreakdown(filteredData);
  const ewasteData = getEwasteBreakdown(filteredData);
  const othersData = getOthersBreakdown(filteredData);

  // Calculate Others total to add to each breakdown
  const othersTotal = filteredData.reduce((sum, row) => {
    return sum + row.others.expiredMedicines + row.others.medicinesPackaging + row.others.thermometers;
  }, 0);

  // Add Others to each breakdown except the Others chart itself
  const addOthersToData = (data: { name: string; value: number; color?: string }[]) => {
    return [
      ...data,
      { name: "Others", value: othersTotal, color: "hsl(25, 95%, 53%)" }
    ];
  };

  const charts = [
    { title: "Plastic", data: addOthersToData(plasticData) },
    { title: "Paper", data: addOthersToData(paperData) },
    { title: "Glass", data: addOthersToData(glassData) },
    { title: "Metal", data: addOthersToData(metalData) },
    { title: "E-waste", data: addOthersToData(ewasteData) },
    { title: "Others", data: othersData },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-foreground">
            {payload[0].name}: {payload[0].value} kg
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="chart-container p-3 sm:p-4 md:p-6"
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6 gap-2">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
          <PieChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Dry Waste Breakdown
        </h3>
        <Select value={timePeriod} onValueChange={(val) => setTimePeriod(val as TimePeriod)}>
          <SelectTrigger className="w-28 h-8 text-xs bg-secondary/50 border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="quarter">Quarter</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {charts.map((chart, index) => (
          <motion.div
            key={chart.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-secondary/30 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-border/50"
          >
            <div className="mb-1 sm:mb-2">
              <h4 className="text-xs sm:text-sm font-medium text-foreground">{chart.title}</h4>
            </div>
            <div className="h-28 sm:h-32 md:h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chart.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={800}
                    animationBegin={index * 100}
                  >
                    {chart.data.map((_, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
              {chart.data.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-muted-foreground truncate">{item.name}</span>
                  <span className="font-medium text-foreground ml-auto">{item.value}kg</span>
                </div>
              ))}
              {/* Total row */}
              <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs pt-1 sm:pt-2 mt-1 sm:mt-2 border-t border-border/50">
                <span className="text-foreground font-semibold">Total</span>
                <span className="font-bold text-foreground ml-auto">
                  {chart.data.reduce((sum, item) => sum + item.value, 0)}kg
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BreakdownChartsGrid;