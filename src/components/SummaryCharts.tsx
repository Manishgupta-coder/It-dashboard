import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useWasteData } from "@/context/WasteDataContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Factory, Trash, Flame } from "lucide-react";

type TimePeriod = "day" | "week" | "month" | "quarter" | "year";

const SummaryCharts = () => {
  const { wasteData } = useWasteData();
  const [period1, setPeriod1] = useState<TimePeriod>("day");
  const [period2, setPeriod2] = useState<TimePeriod>("day");
  const [period3, setPeriod3] = useState<TimePeriod>("day");

  const calculateMethaneReduction = (totalWaste: number) => {
    return Math.round(((totalWaste / 1000) * (0.6 * 0.5)) * 28);
  };

  const groupDataByPeriod = (period: TimePeriod) => {
    if (period === "day") {
      return wasteData.map((row) => ({
        date: row.date.split("-")[0] + " " + row.date.split("-")[1],
        totalWaste: row.totalWaste,
        recycling: row.recycling,
        composted: row.composted,
        diverted: row.divertedFromLandfill,
        residual: row.residualToLandfill,
        landfillDiversionRate: row.landfillDiversionRate,
        methaneReduction: calculateMethaneReduction(row.totalWaste),
      }));
    }

    const groupedData: { [key: string]: any } = {};

    wasteData.forEach((row) => {
      const dateParts = row.date.split("-");
      const day = parseInt(dateParts[0]);
      const month = dateParts[1];
      const year = dateParts[2] || "2024";

      let groupKey = "";
      if (period === "week") {
        const weekNum = Math.ceil(day / 7);
        groupKey = `W${weekNum} ${month}`;
      } else if (period === "month") {
        groupKey = `${month} ${year}`;
      } else if (period === "quarter") {
        const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month);
        const quarter = Math.floor(monthIndex / 3) + 1;
        groupKey = `Q${quarter} ${year}`;
      } else if (period === "year") {
        groupKey = year;
      }

      if (!groupedData[groupKey]) {
        groupedData[groupKey] = {
          date: groupKey,
          totalWaste: 0,
          recycling: 0,
          composted: 0,
          diverted: 0,
          residual: 0,
          landfillDiversionRate: 0,
          methaneReduction: 0,
          count: 0,
        };
      }

      groupedData[groupKey].totalWaste += row.totalWaste;
      groupedData[groupKey].recycling += row.recycling;
      groupedData[groupKey].composted += row.composted;
      groupedData[groupKey].diverted += row.divertedFromLandfill;
      groupedData[groupKey].residual += row.residualToLandfill;
      groupedData[groupKey].landfillDiversionRate += row.landfillDiversionRate;
      groupedData[groupKey].count += 1;
    });

    return Object.values(groupedData).map((group: any) => ({
      ...group,
      landfillDiversionRate: Math.round(group.landfillDiversionRate / group.count),
      methaneReduction: calculateMethaneReduction(group.totalWaste),
    }));
  };

  const chartData1 = groupDataByPeriod(period1);
  const chartData2 = groupDataByPeriod(period2);
  const chartData3 = groupDataByPeriod(period3);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.value} {entry.name.includes("Rate") ? "%" : "kg"}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const TimePeriodDropdown = ({ value, onChange }: { value: TimePeriod; onChange: (val: TimePeriod) => void }) => (
    <Select value={value} onValueChange={onChange}>
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
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 space-y-6"
    >
      {/* Chart 1: Total Waste, Recycling, Composted - Full Width */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="chart-container w-full p-3 sm:p-4 md:p-6"
      >
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
            <Factory className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            Waste Collection & Processing
          </h3>
          <TimePeriodDropdown value={period1} onChange={setPeriod1} />
        </div>
        <div className="h-48 sm:h-60 md:h-72 bar-chart-shadow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData1} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="totalWasteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160, 84%, 50%)" />
                  <stop offset="100%" stopColor="hsl(160, 84%, 30%)" />
                </linearGradient>
                <linearGradient id="recyclingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(340, 82%, 60%)" />
                  <stop offset="100%" stopColor="hsl(340, 82%, 40%)" />
                </linearGradient>
                <linearGradient id="compostedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(45, 93%, 65%)" />
                  <stop offset="100%" stopColor="hsl(45, 93%, 45%)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="date"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
                interval="preserveStartEnd"
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
                width={45}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }}
                iconType="rect"
                iconSize={8}
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
              />
              <Bar
                dataKey="totalWaste"
                name="Total Waste"
                fill="url(#totalWasteGrad)"
                radius={[4, 4, 0, 0]}
                animationDuration={800}
              />
              <Bar
                dataKey="recycling"
                name="Recycling"
                fill="url(#recyclingGrad)"
                radius={[4, 4, 0, 0]}
                animationDuration={800}
                animationBegin={200}
              />
              <Bar
                dataKey="composted"
                name="Composted"
                fill="url(#compostedGrad)"
                radius={[4, 4, 0, 0]}
                animationDuration={800}
                animationBegin={400}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Chart 2: Landfill Metrics - Full Width */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="chart-container w-full p-3 sm:p-4 md:p-6"
      >
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
            <Trash className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            Landfill Metrics
          </h3>
          <TimePeriodDropdown value={period2} onChange={setPeriod2} />
        </div>
        <div className="h-48 sm:h-60 md:h-72 bar-chart-shadow overflow-x-auto">
          <div className="min-w-[400px] h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData2} margin={{ top: 5, right: 35, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="divertedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(220, 70%, 65%)" />
                  <stop offset="100%" stopColor="hsl(220, 70%, 45%)" />
                </linearGradient>
                <linearGradient id="residualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0, 65%, 60%)" />
                  <stop offset="100%" stopColor="hsl(0, 65%, 40%)" />
                </linearGradient>
                <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(170, 70%, 55%)" />
                  <stop offset="100%" stopColor="hsl(170, 70%, 35%)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="date"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
                interval="preserveStartEnd"
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
                width={45}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
                domain={[0, 100]}
                width={35}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }}
                iconType="rect"
                iconSize={8}
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
              />
              <Bar
                dataKey="diverted"
                name="Diverted"
                fill="url(#divertedGrad)"
                yAxisId="left"
                radius={[4, 4, 0, 0]}
                animationDuration={800}
              />
              <Bar
                dataKey="residual"
                name="Residual"
                fill="url(#residualGrad)"
                yAxisId="left"
                radius={[4, 4, 0, 0]}
                animationDuration={800}
                animationBegin={200}
              />
              <Bar
                dataKey="landfillDiversionRate"
                name="Diversion Rate (%)"
                fill="url(#rateGrad)"
                yAxisId="right"
                radius={[4, 4, 0, 0]}
                animationDuration={800}
                animationBegin={400}
              />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Chart 3: Methane Emission Reduction - Full Width */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="chart-container w-full p-3 sm:p-4 md:p-6"
      >
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            Methane Emission Reduction
          </h3>
          <TimePeriodDropdown value={period3} onChange={setPeriod3} />
        </div>
        <div className="h-48 sm:h-60 md:h-72 bar-chart-shadow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData3} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="methaneGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(199, 89%, 58%)" />
                  <stop offset="100%" stopColor="hsl(199, 89%, 38%)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="date"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
                interval="preserveStartEnd"
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }}
                iconType="rect"
                iconSize={8}
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
              />
              <Bar
                dataKey="methaneReduction"
                name="Methane Reduction (kg CO₂e)"
                fill="url(#methaneGrad)"
                radius={[4, 4, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SummaryCharts;