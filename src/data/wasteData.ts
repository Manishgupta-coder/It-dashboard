export interface WasteDataRow {
  date: string;
  totalWaste: number;
  dryWaste: number;
  wetWaste: number;
  plastic: {
    bags: number;
    petBottles: number;
    hdpeBottles: number;
    polythene: number;
    thermocol: number;
  };
  paper: {
    newspaper: number;
    cartoon: number;
    normalPaper: number;
    cardboard: number;
  };
  glass: number;
  metal: {
    aluminumCans: number;
    foodPackingContainer: number;
  };
  textiles: number;
  ewaste: {
    batteries: number;
    charger: number;
    lighting: number;
  };
  others: {
    expiredMedicines: number;
    medicinesPackaging: number;
    thermometers: number;
  };
  recycling: number;
  composted: number;
  compostProduced: number;
  methaneReduction: number;
  divertedFromLandfill: number;
  residualToLandfill: number;
  recyclingEfficiency: number;
  landfillDiversionRate: number;
  segregationEfficiency: number;
  remarks: string;
}

export const wasteData: WasteDataRow[] = [
  {
    date: "01-Nov-2025",
    totalWaste: 112,
    dryWaste: 82,
    wetWaste: 30,
    plastic: { bags: 6, petBottles: 3, hdpeBottles: 2, polythene: 1, thermocol: 0 },
    paper: { newspaper: 8, cartoon: 6, normalPaper: 4, cardboard: 3 },
    glass: 3,
    metal: { aluminumCans: 3, foodPackingContainer: 2 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 2 },
    recycling: 61,
    composted: 26,
    compostProduced: 21,
    methaneReduction: 130,
    divertedFromLandfill: 87,
    residualToLandfill: 25,
    recyclingEfficiency: 74,
    landfillDiversionRate: 78,
    segregationEfficiency: 95,
    remarks: "Special collection event"
  },
  {
    date: "02-Nov-2025",
    totalWaste: 148,
    dryWaste: 101,
    wetWaste: 47,
    plastic: { bags: 8, petBottles: 5, hdpeBottles: 3, polythene: 2, thermocol: 0 },
    paper: { newspaper: 12, cartoon: 9, normalPaper: 7, cardboard: 5 },
    glass: 3,
    metal: { aluminumCans: 4, foodPackingContainer: 2 },
    textiles: 1,
    ewaste: { batteries: 1, charger: 1, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 2 },
    recycling: 65,
    composted: 42,
    compostProduced: 33,
    methaneReduction: 160,
    divertedFromLandfill: 107,
    residualToLandfill: 41,
    recyclingEfficiency: 64,
    landfillDiversionRate: 72,
    segregationEfficiency: 94,
    remarks: "Daily collection"
  },
  {
    date: "03-Nov-2025",
    totalWaste: 104,
    dryWaste: 70,
    wetWaste: 34,
    plastic: { bags: 5, petBottles: 3, hdpeBottles: 2, polythene: 1, thermocol: 0 },
    paper: { newspaper: 8, cartoon: 6, normalPaper: 4, cardboard: 3 },
    glass: 3,
    metal: { aluminumCans: 3, foodPackingContainer: 1 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 2 },
    recycling: 51,
    composted: 27,
    compostProduced: 21,
    methaneReduction: 117,
    divertedFromLandfill: 78,
    residualToLandfill: 26,
    recyclingEfficiency: 73,
    landfillDiversionRate: 75,
    segregationEfficiency: 74,
    remarks: "Daily collection"
  },
  {
    date: "04-Nov-2025",
    totalWaste: 98,
    dryWaste: 71,
    wetWaste: 27,
    plastic: { bags: 6, petBottles: 4, hdpeBottles: 2, polythene: 1, thermocol: 0 },
    paper: { newspaper: 9, cartoon: 6, normalPaper: 5, cardboard: 3 },
    glass: 3,
    metal: { aluminumCans: 1, foodPackingContainer: 2 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 2 },
    recycling: 43,
    composted: 24,
    compostProduced: 20,
    methaneReduction: 100,
    divertedFromLandfill: 67,
    residualToLandfill: 31,
    recyclingEfficiency: 61,
    landfillDiversionRate: 68,
    segregationEfficiency: 93,
    remarks: "Daily collection"
  },
  {
    date: "05-Nov-2025",
    totalWaste: 107,
    dryWaste: 77,
    wetWaste: 30,
    plastic: { bags: 7, petBottles: 4, hdpeBottles: 2, polythene: 2, thermocol: 0 },
    paper: { newspaper: 9, cartoon: 6, normalPaper: 5, cardboard: 4 },
    glass: 3,
    metal: { aluminumCans: 1, foodPackingContainer: 2 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 3 },
    recycling: 54,
    composted: 24,
    compostProduced: 18,
    methaneReduction: 117,
    divertedFromLandfill: 78,
    residualToLandfill: 29,
    recyclingEfficiency: 70,
    landfillDiversionRate: 73,
    segregationEfficiency: 71,
    remarks: "Daily collection"
  },
  {
    date: "06-Nov-2025",
    totalWaste: 145,
    dryWaste: 97,
    wetWaste: 48,
    plastic: { bags: 8, petBottles: 5, hdpeBottles: 3, polythene: 2, thermocol: 0 },
    paper: { newspaper: 10, cartoon: 7, normalPaper: 6, cardboard: 4 },
    glass: 3,
    metal: { aluminumCans: 4, foodPackingContainer: 2 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 3 },
    recycling: 68,
    composted: 36,
    compostProduced: 28,
    methaneReduction: 156,
    divertedFromLandfill: 104,
    residualToLandfill: 41,
    recyclingEfficiency: 70,
    landfillDiversionRate: 72,
    segregationEfficiency: 89,
    remarks: "Special collection event"
  },
  {
    date: "07-Nov-2025",
    totalWaste: 140,
    dryWaste: 93,
    wetWaste: 47,
    plastic: { bags: 7, petBottles: 4, hdpeBottles: 2, polythene: 2, thermocol: 0 },
    paper: { newspaper: 9, cartoon: 6, normalPaper: 5, cardboard: 4 },
    glass: 3,
    metal: { aluminumCans: 1, foodPackingContainer: 2 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 3 },
    recycling: 62,
    composted: 35,
    compostProduced: 25,
    methaneReduction: 145,
    divertedFromLandfill: 97,
    residualToLandfill: 43,
    recyclingEfficiency: 67,
    landfillDiversionRate: 69,
    segregationEfficiency: 82,
    remarks: "Daily collection"
  },
  {
    date: "08-Nov-2025",
    totalWaste: 131,
    dryWaste: 85,
    wetWaste: 46,
    plastic: { bags: 7, petBottles: 4, hdpeBottles: 2, polythene: 2, thermocol: 0 },
    paper: { newspaper: 9, cartoon: 6, normalPaper: 5, cardboard: 3 },
    glass: 3,
    metal: { aluminumCans: 2, foodPackingContainer: 2 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 2 },
    recycling: 62,
    composted: 35,
    compostProduced: 28,
    methaneReduction: 145,
    divertedFromLandfill: 97,
    residualToLandfill: 34,
    recyclingEfficiency: 73,
    landfillDiversionRate: 74,
    segregationEfficiency: 76,
    remarks: "Daily collection"
  },
  {
    date: "09-Nov-2025",
    totalWaste: 143,
    dryWaste: 92,
    wetWaste: 51,
    plastic: { bags: 6, petBottles: 4, hdpeBottles: 2, polythene: 1, thermocol: 0 },
    paper: { newspaper: 11, cartoon: 8, normalPaper: 6, cardboard: 4 },
    glass: 4,
    metal: { aluminumCans: 2, foodPackingContainer: 3 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 2 },
    recycling: 58,
    composted: 40,
    compostProduced: 30,
    methaneReduction: 147,
    divertedFromLandfill: 98,
    residualToLandfill: 45,
    recyclingEfficiency: 63,
    landfillDiversionRate: 69,
    segregationEfficiency: 91,
    remarks: "Daily collection"
  },
  {
    date: "10-Nov-2025",
    totalWaste: 104,
    dryWaste: 70,
    wetWaste: 34,
    plastic: { bags: 4, petBottles: 3, hdpeBottles: 1, polythene: 1, thermocol: 0 },
    paper: { newspaper: 7, cartoon: 5, normalPaper: 4, cardboard: 3 },
    glass: 2,
    metal: { aluminumCans: 3, foodPackingContainer: 2 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 3 },
    recycling: 43,
    composted: 27,
    compostProduced: 20,
    methaneReduction: 105,
    divertedFromLandfill: 70,
    residualToLandfill: 34,
    recyclingEfficiency: 61,
    landfillDiversionRate: 67,
    segregationEfficiency: 80,
    remarks: "Daily collection"
  },
  {
    date: "11-Nov-2025",
    totalWaste: 133,
    dryWaste: 95,
    wetWaste: 38,
    plastic: { bags: 7, petBottles: 4, hdpeBottles: 2, polythene: 2, thermocol: 0 },
    paper: { newspaper: 10, cartoon: 7, normalPaper: 5, cardboard: 4 },
    glass: 3,
    metal: { aluminumCans: 3, foodPackingContainer: 2 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 2 },
    recycling: 59,
    composted: 30,
    compostProduced: 23,
    methaneReduction: 133,
    divertedFromLandfill: 89,
    residualToLandfill: 44,
    recyclingEfficiency: 62,
    landfillDiversionRate: 67,
    segregationEfficiency: 81,
    remarks: "Special collection event"
  },
  {
    date: "12-Nov-2025",
    totalWaste: 88,
    dryWaste: 59,
    wetWaste: 29,
    plastic: { bags: 4, petBottles: 2, hdpeBottles: 1, polythene: 1, thermocol: 0 },
    paper: { newspaper: 6, cartoon: 4, normalPaper: 3, cardboard: 2 },
    glass: 4,
    metal: { aluminumCans: 2, foodPackingContainer: 1 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 2 },
    recycling: 43,
    composted: 22,
    compostProduced: 15,
    methaneReduction: 97,
    divertedFromLandfill: 65,
    residualToLandfill: 23,
    recyclingEfficiency: 73,
    landfillDiversionRate: 74,
    segregationEfficiency: 94,
    remarks: "Daily collection"
  },
  {
    date: "13-Nov-2025",
    totalWaste: 111,
    dryWaste: 81,
    wetWaste: 30,
    plastic: { bags: 6, petBottles: 3, hdpeBottles: 2, polythene: 1, thermocol: 0 },
    paper: { newspaper: 8, cartoon: 6, normalPaper: 4, cardboard: 3 },
    glass: 3,
    metal: { aluminumCans: 3, foodPackingContainer: 2 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 3 },
    recycling: 55,
    composted: 24,
    compostProduced: 17,
    methaneReduction: 118,
    divertedFromLandfill: 79,
    residualToLandfill: 32,
    recyclingEfficiency: 68,
    landfillDiversionRate: 71,
    segregationEfficiency: 70,
    remarks: "Daily collection"
  },
  {
    date: "14-Nov-2025",
    totalWaste: 141,
    dryWaste: 95,
    wetWaste: 46,
    plastic: { bags: 8, petBottles: 5, hdpeBottles: 3, polythene: 2, thermocol: 0 },
    paper: { newspaper: 10, cartoon: 7, normalPaper: 5, cardboard: 4 },
    glass: 3,
    metal: { aluminumCans: 2, foodPackingContainer: 3 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 3 },
    recycling: 58,
    composted: 40,
    compostProduced: 32,
    methaneReduction: 147,
    divertedFromLandfill: 98,
    residualToLandfill: 43,
    recyclingEfficiency: 61,
    landfillDiversionRate: 70,
    segregationEfficiency: 87,
    remarks: "Daily collection"
  },
  {
    date: "15-Nov-2025",
    totalWaste: 110,
    dryWaste: 77,
    wetWaste: 33,
    plastic: { bags: 5, petBottles: 3, hdpeBottles: 2, polythene: 1, thermocol: 0 },
    paper: { newspaper: 8, cartoon: 6, normalPaper: 5, cardboard: 3 },
    glass: 3,
    metal: { aluminumCans: 3, foodPackingContainer: 2 },
    textiles: 0,
    ewaste: { batteries: 0, charger: 0, lighting: 0 },
    others: { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 3 },
    recycling: 52,
    composted: 27,
    compostProduced: 22,
    methaneReduction: 118,
    divertedFromLandfill: 79,
    residualToLandfill: 31,
    recyclingEfficiency: 68,
    landfillDiversionRate: 72,
    segregationEfficiency: 85,
    remarks: "Daily collection"
  }
];

export const calculateTotals = (data: WasteDataRow[]) => {
  const totals = data.reduce(
    (acc, row) => ({
      recycling: acc.recycling + row.recycling,
      composted: acc.composted + row.composted,
      paper: acc.paper + Object.values(row.paper).reduce((a, b) => a + b, 0),
      glass: acc.glass + row.glass,
      plastic: acc.plastic + Object.values(row.plastic).reduce((a, b) => a + b, 0),
      metal: acc.metal + Object.values(row.metal).reduce((a, b) => a + b, 0),
      ewaste: acc.ewaste + Object.values(row.ewaste).reduce((a, b) => a + b, 0),
      others: acc.others + row.others.expiredMedicines + row.others.medicinesPackaging + row.others.thermometers,
      totalWasteSum: acc.totalWasteSum + row.totalWaste,
      dryWasteSum: acc.dryWasteSum + row.dryWaste,
      wetWasteSum: acc.wetWasteSum + row.wetWaste,
      count: acc.count + 1,
    }),
    { recycling: 0, composted: 0, paper: 0, glass: 0, plastic: 0, metal: 0, ewaste: 0, others: 0, totalWasteSum: 0, dryWasteSum: 0, wetWasteSum: 0, count: 0 }
  );

  // Total Waste Collected = Waste sent for Recycling (kg) + Waste Composted (kg)
  const totalWaste = totals.recycling + totals.composted;
  
  // Waste Diverted from Landfill (kg) = Total Waste Collected - (5% of Total Waste Collected)
  const diverted = Math.round(totalWaste - (totalWaste * 0.05));
  
  // Residual Waste to Landfill (kg) = Total Waste Collected - Waste Diverted from Landfill
  const residualToLandfill = totalWaste - diverted;
  
  // Compost Produced (kg) = 20% of Waste Composted (kg)
  const compostProduced = Math.round(totals.composted * 0.20);
  
  // Methane Emission Reduction (kg CO₂e) = ((Total Waste Collected (kg)/1000)*(0.6*0.5))*28
  const methaneReduction = Math.round(((totalWaste / 1000) * (0.6 * 0.5)) * 28);
  
  // Recycling Efficiency (%) = (Mass of usable recycled output / Waste sent for Recycling) × 100
  // Mass of Usable Recycled output = Waste sent for Recycling (kg)
  const recyclingEfficiency = totals.recycling > 0 ? Math.round((totals.recycling / totals.recycling) * 100) : 0;
  
  // Landfill Diversion Rate (%) = (Waste Diverted from Landfill / Total Waste) × 100
  const landfillDiversionRate = totalWaste > 0 ? Math.round((diverted / totalWaste) * 100) : 0;
  
  // Segregation Efficiency (%) = (Correctly Segregated Waste / Total Waste Generated) × 100
  // Correctly Segregated Waste (kg) = Total Waste Collected (kg)
  const segregationEfficiency = totals.totalWasteSum > 0 ? Math.round((totalWaste / totals.totalWasteSum) * 100) : 0;

  return {
    ...totals,
    totalWaste,
    diverted,
    residualToLandfill,
    compostProduced,
    methaneReduction,
    recyclingEfficiency,
    landfillDiversionRate,
    segregationEfficiency,
  };
};

export const getPlasticBreakdown = (data: WasteDataRow[]) => {
  const totals = data.reduce(
    (acc, row) => ({
      bags: acc.bags + row.plastic.bags,
      petBottles: acc.petBottles + row.plastic.petBottles,
      hdpeBottles: acc.hdpeBottles + row.plastic.hdpeBottles,
      polythene: acc.polythene + row.plastic.polythene,
      thermocol: acc.thermocol + row.plastic.thermocol,
    }),
    { bags: 0, petBottles: 0, hdpeBottles: 0, polythene: 0, thermocol: 0 }
  );
  
  return [
    { name: "Bags/Sacks", value: totals.bags, color: "hsl(340, 82%, 52%)" },
    { name: "Pet Bottles", value: totals.petBottles, color: "hsl(350, 75%, 60%)" },
    { name: "HDPE Bottles", value: totals.hdpeBottles, color: "hsl(330, 70%, 55%)" },
    { name: "Polythene", value: totals.polythene, color: "hsl(320, 65%, 50%)" },
    { name: "Thermocol", value: totals.thermocol, color: "hsl(310, 60%, 45%)" },
  ];
};

export const getPaperBreakdown = (data: WasteDataRow[]) => {
  const totals = data.reduce(
    (acc, row) => ({
      newspaper: acc.newspaper + row.paper.newspaper,
      cartoon: acc.cartoon + row.paper.cartoon,
      normalPaper: acc.normalPaper + row.paper.normalPaper,
      cardboard: acc.cardboard + row.paper.cardboard,
    }),
    { newspaper: 0, cartoon: 0, normalPaper: 0, cardboard: 0 }
  );
  
  return [
    { name: "Newspaper", value: totals.newspaper, color: "hsl(45, 93%, 58%)" },
    { name: "Carton", value: totals.cartoon, color: "hsl(35, 90%, 55%)" },
    { name: "Normal Paper", value: totals.normalPaper, color: "hsl(55, 88%, 55%)" },
    { name: "Cardboard", value: totals.cardboard, color: "hsl(40, 80%, 50%)" },
  ];
};

export const getGlassBreakdown = (data: WasteDataRow[]) => {
  const total = data.reduce((acc, row) => acc + row.glass, 0);
  
  return [
    { name: "White Grades", value: total, color: "hsl(199, 89%, 48%)" },
  ];
};

export const getMetalBreakdown = (data: WasteDataRow[]) => {
  const totals = data.reduce(
    (acc, row) => ({
      aluminum: acc.aluminum + row.metal.aluminumCans,
      foodPacking: acc.foodPacking + row.metal.foodPackingContainer,
    }),
    { aluminum: 0, foodPacking: 0 }
  );
  
  return [
    { name: "Aluminum", value: totals.aluminum, color: "hsl(220, 70%, 55%)" },
    { name: "Food Packing Container", value: totals.foodPacking, color: "hsl(210, 60%, 50%)" },
  ];
};

export const getEwasteBreakdown = (data: WasteDataRow[]) => {
  const totals = data.reduce(
    (acc, row) => ({
      batteries: acc.batteries + row.ewaste.batteries,
      charger: acc.charger + row.ewaste.charger,
      lighting: acc.lighting + row.ewaste.lighting,
    }),
    { batteries: 0, charger: 0, lighting: 0 }
  );
  
  return [
    { name: "Batteries", value: totals.batteries, color: "hsl(280, 65%, 60%)" },
    { name: "Charger", value: totals.charger, color: "hsl(270, 60%, 55%)" },
    { name: "Lighting", value: totals.lighting, color: "hsl(290, 55%, 50%)" },
  ];
};

export const getOthersBreakdown = (data: WasteDataRow[]) => {
  const totals = data.reduce(
    (acc, row) => ({
      expiredMedicines: acc.expiredMedicines + row.others.expiredMedicines,
      medicinesPackaging: acc.medicinesPackaging + row.others.medicinesPackaging,
      thermometers: acc.thermometers + row.others.thermometers,
    }),
    { expiredMedicines: 0, medicinesPackaging: 0, thermometers: 0 }
  );
  
  return [
    { name: "Expired Medicines", value: totals.expiredMedicines, color: "hsl(160, 60%, 45%)" },
    { name: "Medicines Packaging", value: totals.medicinesPackaging, color: "hsl(150, 55%, 40%)" },
    { name: "Thermometers", value: totals.thermometers, color: "hsl(170, 50%, 50%)" },
  ];
};

export const getChartData = (data: WasteDataRow[]) => {
  return data.map((row) => ({
    date: row.date.split("-")[0] + " " + row.date.split("-")[1],
    fullDate: row.date,
    plastic: Object.values(row.plastic).reduce((a, b) => a + b, 0),
    paper: Object.values(row.paper).reduce((a, b) => a + b, 0),
    glass: row.glass,
    metal: Object.values(row.metal).reduce((a, b) => a + b, 0),
    ewaste: Object.values(row.ewaste).reduce((a, b) => a + b, 0),
    others: row.others.expiredMedicines + row.others.medicinesPackaging + row.others.thermometers,
  }));
};
