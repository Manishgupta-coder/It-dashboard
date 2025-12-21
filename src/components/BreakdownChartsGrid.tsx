import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
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

const COLORS = [
  "hsl(160, 84%, 39%)",
  "hsl(340, 82%, 52%)",
  "hsl(45, 93%, 58%)",
  "hsl(199, 89%, 48%)",
  "hsl(280, 65%, 60%)",
  "hsl(120, 60%, 45%)",
];

const BreakdownChartsGrid = () => {
  const { wasteData } = useWasteData();
  const plasticData = getPlasticBreakdown(wasteData);
  const paperData = getPaperBreakdown(wasteData);
  const glassData = getGlassBreakdown(wasteData);
  const metalData = getMetalBreakdown(wasteData);
  const ewasteData = getEwasteBreakdown(wasteData);
  const othersData = getOthersBreakdown(wasteData);

  const charts = [
    { title: "Plastic", subtitle: "Bags, Bottles & Polythene", data: plasticData },
    { title: "Paper", subtitle: "Paper sub-categories", data: paperData },
    { title: "Glass", subtitle: "Glass grades", data: glassData },
    { title: "Metal", subtitle: "Aluminum & Containers", data: metalData },
    { title: "E-waste", subtitle: "Electronic waste", data: ewasteData },
    { title: "Others", subtitle: "Medicines & Thermometers", data: othersData },
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
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-3 sm:mb-4 md:mb-6">
        Dry Waste Breakdown
      </h3>
      
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
              <p className="text-[10px] sm:text-xs text-muted-foreground">{chart.subtitle}</p>
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
                  >
                    {chart.data.map((_, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1 max-h-24 sm:max-h-32 overflow-y-auto">
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