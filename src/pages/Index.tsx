import {
  Trash2,
  Recycle,
  Leaf,
  Sprout,
  ArrowRightFromLine,
  Trash,
  TrendingUp,
  Loader2,
  Droplets,
  Package,
  Flame,
} from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import StatCard from "@/components/StatCard";
import SummaryCharts from "@/components/SummaryCharts";
import WasteOverviewChart from "@/components/WasteOverviewChart";
import BreakdownChartsGrid from "@/components/BreakdownChartsGrid";
import WasteDataTable from "@/components/WasteDataTable";
import Footer from "@/components/Footer";
import { calculateTotals } from "@/data/wasteData";
import { useWasteData } from "@/context/WasteDataContext";

const Index = () => {
  const { wasteData, isLoading } = useWasteData();
  const totals = calculateTotals(wasteData);

  // Calculate total dry and wet waste from data
  const totalDryWaste = wasteData.reduce((sum, row) => sum + row.dryWaste, 0);
  const totalWetWaste = wasteData.reduce((sum, row) => sum + row.wetWaste, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading waste data...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Waste Collected",
      value: totals.totalWaste,
      unit: "kg",
      icon: Trash2,
      color: "hsl(199, 89%, 48%)",
      trend: 8,
    },
    {
      title: "Total Dry Waste Collected",
      value: totalDryWaste,
      unit: "kg",
      icon: Package,
      color: "hsl(45, 93%, 58%)",
      trend: 5,
    },
    {
      title: "Total Wet Waste Collected",
      value: totalWetWaste,
      unit: "kg",
      icon: Droplets,
      color: "hsl(160, 84%, 39%)",
      trend: 6,
    },
    {
      title: "Dry Waste Sent for Recycling",
      value: totals.recycling,
      unit: "kg",
      icon: Recycle,
      color: "hsl(340, 82%, 52%)",
      trend: 5,
    },
    {
      title: "Wet Waste Composted",
      value: totals.composted,
      unit: "kg",
      icon: Leaf,
      color: "hsl(120, 60%, 45%)",
      trend: 12,
    },
    {
      title: "Residual Waste to Landfill",
      value: totals.residualToLandfill,
      unit: "kg",
      icon: Trash,
      color: "hsl(0, 65%, 50%)",
      trend: -3,
    },
    {
      title: "Waste Diverted from Landfill",
      value: totals.diverted,
      unit: "kg",
      icon: ArrowRightFromLine,
      color: "hsl(220, 70%, 55%)",
      trend: 7,
    },
    {
      title: "Landfill Diversion Rate",
      value: totals.landfillDiversionRate,
      unit: "%",
      icon: TrendingUp,
      color: "hsl(170, 70%, 45%)",
      trend: 6,
    },
    {
      title: "Compost Produced",
      value: totals.compostProduced,
      unit: "kg",
      icon: Sprout,
      color: "hsl(280, 65%, 60%)",
      trend: 10,
    },
    {
      title: "Methane Emission Reduction",
      value: totals.methaneReduction,
      unit: "kg CO₂e",
      icon: Flame,
      color: "hsl(25, 95%, 53%)",
      trend: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <DashboardHeader />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} delay={index * 0.1} />
          ))}
        </div>

        <SummaryCharts />

        <div className="mb-8">
          <WasteOverviewChart />
        </div>

        <div className="mb-8">
          <BreakdownChartsGrid />
        </div>

        <div className="mb-8">
          <WasteDataTable />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;