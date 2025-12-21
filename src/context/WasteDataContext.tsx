import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { WasteDataRow, wasteData as defaultData } from "@/data/wasteData";

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/134CwkH3U0MwytTpSbMdqevAC4h5GDnhc8WHEPqL5A8A/gviz/tq?tqx=out:csv";

interface WasteDataContextType {
  wasteData: WasteDataRow[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const WasteDataContext = createContext<WasteDataContextType | undefined>(undefined);

const parseCSVToWasteData = (csvText: string): WasteDataRow[] => {
  const lines = csvText.trim().split('\n');
  const dataRows: WasteDataRow[] = [];
  
  // Skip header row, start from line 1
  for (let i = 1; i < lines.length; i++) {
    // Handle CSV parsing with potential quoted values
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (const char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    // The Google Sheet has 25 columns (0-24)
    if (values.length >= 25) {
      try {
        const recycling = parseFloat(values[22]) || 0;
        const composted = parseFloat(values[23]) || 0;
        const totalWaste = parseFloat(values[1]) || 0;
        const dryWaste = parseFloat(values[2]) || 0;
        const wetWaste = parseFloat(values[3]) || 0;
        
        // Calculate derived metrics
        // Waste Diverted from Landfill (kg) = Total Waste Collected - (5% of Total Waste Collected)
        const divertedFromLandfill = Math.round(totalWaste - (totalWaste * 0.05));
        // Residual Waste to Landfill (kg) = Total Waste Collected - Waste Diverted from Landfill
        const residualToLandfill = totalWaste - divertedFromLandfill;
        // Recycling Efficiency (%) = (Mass of usable recycled output / Mass of recyclable material input) × 100
        const recyclingEfficiency = dryWaste > 0 ? Math.round((recycling / dryWaste) * 100) : 0;
        const landfillDiversionRate = totalWaste > 0 ? Math.round((divertedFromLandfill / totalWaste) * 100) : 0;
        const segregationEfficiency = totalWaste > 0 ? Math.round(((dryWaste + wetWaste) / totalWaste) * 100) : 0;
        // Compost Produced (kg) = 20% of Waste Composted (kg)
        const compostProduced = Math.round(composted * 0.20);
        // Methane Emission Reduction (kg CO₂e) = ((Total Waste Collected (kg)/1000)*(0.6*0.5))*28
        const methaneReduction = Math.round(((totalWaste / 1000) * (0.6 * 0.5)) * 28);

        const row: WasteDataRow = {
          date: values[0] || '',
          totalWaste,
          dryWaste,
          wetWaste,
          plastic: {
            bags: parseFloat(values[4]) || 0,
            petBottles: parseFloat(values[5]) || 0,
            hdpeBottles: parseFloat(values[6]) || 0,
            polythene: parseFloat(values[7]) || 0,
            thermocol: parseFloat(values[8]) || 0,
          },
          paper: {
            newspaper: parseFloat(values[9]) || 0,
            cartoon: parseFloat(values[10]) || 0,
            normalPaper: parseFloat(values[11]) || 0,
            cardboard: parseFloat(values[12]) || 0,
          },
          glass: parseFloat(values[13]) || 0,
          metal: {
            aluminumCans: parseFloat(values[14]) || 0,
            foodPackingContainer: parseFloat(values[15]) || 0,
          },
          textiles: 0, // Not in sheet
          ewaste: {
            batteries: parseFloat(values[16]) || 0,
            charger: parseFloat(values[17]) || 0,
            lighting: parseFloat(values[18]) || 0,
          },
          others: {
            expiredMedicines: parseFloat(values[19]) || 0,
            medicinesPackaging: parseFloat(values[20]) || 0,
            thermometers: parseFloat(values[21]) || 0,
          },
          recycling,
          composted,
          compostProduced,
          methaneReduction,
          divertedFromLandfill,
          residualToLandfill,
          recyclingEfficiency,
          landfillDiversionRate,
          segregationEfficiency,
          remarks: values[24] || '',
        };
        dataRows.push(row);
      } catch (e) {
        console.error('Error parsing row:', i, e);
      }
    }
  }
  
  return dataRows;
};

export const WasteDataProvider = ({ children }: { children: ReactNode }) => {
  const [wasteData, setWasteData] = useState<WasteDataRow[]>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(GOOGLE_SHEET_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data from Google Sheets');
      }
      const csvText = await response.text();
      const parsedData = parseCSVToWasteData(csvText);
      
      if (parsedData.length > 0) {
        setWasteData(parsedData);
      } else {
        // If parsing fails or empty, use default data
        setWasteData(defaultData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      // Use default data on error
      setWasteData(defaultData);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh once per day (24 hours)
    const interval = setInterval(() => {
      fetchData();
    }, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <WasteDataContext.Provider
      value={{
        wasteData,
        isLoading,
        error,
        refetch: fetchData,
      }}
    >
      {children}
    </WasteDataContext.Provider>
  );
};

export const useWasteData = () => {
  const context = useContext(WasteDataContext);
  if (context === undefined) {
    throw new Error("useWasteData must be used within a WasteDataProvider");
  }
  return context;
};
