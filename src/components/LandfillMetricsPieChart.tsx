import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useWasteData } from "@/context/WasteDataContext";
import { calculateTotals } from "@/data/wasteData";
import { Trash, ArrowRightFromLine, TrendingUp } from "lucide-react";

const COLORS = [
  "hsl(0, 65%, 50%)",
  "hsl(220, 70%, 55%)",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
        <p className="text-foreground font-medium">{payload[0].name}</p>
        <p className="text-muted-foreground text-sm">
          {payload[0].value.toLocaleString()} kg
        </p>
      </div>
    );
  }
  return null;
};

const LandfillMetricsPieChart = () => {
  const { wasteData } = useWasteData();
  const totals = calculateTotals(wasteData);

  const chartData = [
    { name: "To Landfill", value: totals.residualToLandfill, color: COLORS[0], icon: Trash },
    { name: "Diverted", value: totals.diverted, color: COLORS[1], icon: ArrowRightFromLine },
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="chart-container p-4 flex-1"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Landfill Metrics
        </h3>
        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
          <span className="text-xs font-medium text-primary">
            {totals.landfillDiversionRate}% Diverted
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-32 h-32 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2">
          {chartData.map((item, index) => {
            const Icon = item.icon;
            const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
            return (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <Icon className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">
                    {item.value.toLocaleString()} kg
                  </span>
                  <span className="text-muted-foreground">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default LandfillMetricsPieChart;
