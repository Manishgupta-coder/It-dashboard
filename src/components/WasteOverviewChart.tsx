import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { getChartData } from "@/data/wasteData";
import { useWasteData } from "@/context/WasteDataContext";

const categories = [
  { key: "plastic", label: "Plastic", color: "hsl(340, 82%, 52%)", gradient: "plasticGradient" },
  { key: "paper", label: "Paper", color: "hsl(45, 93%, 58%)", gradient: "paperGradient" },
  { key: "glass", label: "Glass", color: "hsl(199, 89%, 48%)", gradient: "glassGradient" },
  { key: "metal", label: "Metal", color: "hsl(220, 70%, 55%)", gradient: "metalGradient" },
  { key: "ewaste", label: "E-Waste", color: "hsl(280, 65%, 60%)", gradient: "ewasteGradient" },
  { key: "others", label: "Others", color: "hsl(15, 80%, 55%)", gradient: "othersGradient" },
];

const timePeriods = [
  { key: "day", label: "Day" },
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "quarter", label: "Quarter" },
  { key: "year", label: "Year" },
];

const WasteOverviewChart = () => {
  const { wasteData } = useWasteData();
  const [activeCategories, setActiveCategories] = useState<string[]>(
    categories.map((c) => c.key)
  );
  const [timePeriod, setTimePeriod] = useState("day");
  const [showDropdown, setShowDropdown] = useState(false);

  const chartData = useMemo(() => {
    const data = getChartData(wasteData);
    
    if (timePeriod === "day") {
      return data;
    }
    
    // Group data based on time period
    const groupedData: { [key: string]: any } = {};
    
    data.forEach((row, index) => {
      let groupKey = "";
      
      if (timePeriod === "week") {
        groupKey = `Week ${Math.floor(index / 7) + 1}`;
      } else if (timePeriod === "month") {
        groupKey = "Nov 2025";
      } else if (timePeriod === "quarter") {
        groupKey = "Q4 2025";
      } else if (timePeriod === "year") {
        groupKey = "2025";
      }
      
      if (!groupedData[groupKey]) {
        groupedData[groupKey] = { date: groupKey, plastic: 0, paper: 0, glass: 0, metal: 0, ewaste: 0, others: 0, count: 0 };
      }
      
      groupedData[groupKey].plastic += row.plastic;
      groupedData[groupKey].paper += row.paper;
      groupedData[groupKey].glass += row.glass;
      groupedData[groupKey].metal += row.metal;
      groupedData[groupKey].ewaste += row.ewaste;
      groupedData[groupKey].others += row.others;
      groupedData[groupKey].count += 1;
    });
    
    return Object.values(groupedData);
  }, [timePeriod, wasteData]);

  const toggleCategory = (key: string) => {
    setActiveCategories((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-4 border border-border rounded-xl shadow-xl z-50">
          <p className="text-foreground font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="text-foreground font-medium">{entry.value} kg</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="chart-container p-3 sm:p-4 md:p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 md:mb-6 gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <div>
            <h3 className="text-sm sm:text-base md:text-xl font-semibold text-foreground">Waste Category Trends</h3>
            <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 sm:mt-1">
              Click categories to filter
            </p>
          </div>
          
          {/* Time Period Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-secondary border border-border hover:bg-secondary/80 transition-colors"
            >
              {timePeriods.find((t) => t.key === timePeriod)?.label}
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            {showDropdown && (
              <div className="absolute top-full mt-1 left-0 bg-card border border-border rounded-lg shadow-xl z-50 min-w-[100px]">
                {timePeriods.map((period) => (
                  <button
                    key={period.key}
                    onClick={() => {
                      setTimePeriod(period.key);
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary/50 first:rounded-t-lg last:rounded-b-lg ${
                      timePeriod === period.key ? "bg-primary/20 text-primary" : ""
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => toggleCategory(cat.key)}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${
                activeCategories.includes(cat.key)
                  ? "border-transparent"
                  : "border-border bg-transparent opacity-50"
              }`}
              style={{
                backgroundColor: activeCategories.includes(cat.key)
                  ? `${cat.color}20`
                  : undefined,
                color: activeCategories.includes(cat.key) ? cat.color : undefined,
              }}
            >
              <div
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="hidden xs:inline">{cat.label}</span>
              <span className="xs:hidden">{cat.label.slice(0, 3)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-[280px] sm:h-[300px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 30 }}>
            <defs>
              {categories.map((cat) => (
                <linearGradient key={cat.gradient} id={cat.gradient} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={cat.color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={cat.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 18%)" />
            <XAxis
              dataKey="date"
              stroke="hsl(215, 20%, 55%)"
              fontSize={9}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis
              stroke="hsl(215, 20%, 55%)"
              fontSize={9}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}kg`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            {categories.map((cat) =>
              activeCategories.includes(cat.key) ? (
                <Area
                  key={cat.key}
                  type="monotone"
                  dataKey={cat.key}
                  name={cat.label}
                  stroke={cat.color}
                  strokeWidth={2}
                  fill={`url(#${cat.gradient})`}
                  animationDuration={800}
                />
              ) : null
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default WasteOverviewChart;