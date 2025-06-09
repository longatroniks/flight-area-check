import { createContext, useContext, useState, ReactNode } from 'react';
import {
  fetchDroneRestrictions,
  fetchPopulationDensity,
} from '../services/api/geoApiService';
import { Tab, Location, DroneRestriction, PopulationStat } from '../assets/types';
import { tabs as staticTabs } from '../assets/static-values';

interface FetchedData {
  populationStats?: PopulationStat[];
  droneRestrictions?: DroneRestriction[];
  error?: string;
}

interface GeoApiContextType {
  tabs: Tab[];
  fetchData: (tabId: string, location: Location) => Promise<void>;
  isLoading: boolean;
  data: FetchedData;
  error: string | null;
}

const fetchMethodsMap: Record<string, (lat: number, lon: number) => Promise<any>> = {
  drone: fetchDroneRestrictions,
  pop: fetchPopulationDensity,
};

const GeoApiContext = createContext<GeoApiContextType | undefined>(undefined);

export const GeoApiProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FetchedData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (tabId: string, location: Location) => {
    const fetchMethod = fetchMethodsMap[tabId];
    if (!fetchMethod) {
      setError('No fetch method available for this tab');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchMethod(location.lat, location.lon);
      setData(
        tabId === 'pop'
          ? { populationStats: result }
          : { droneRestrictions: result }
      );
    } catch {
      setError('Failed to fetch data');
      setData({});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GeoApiContext.Provider value={{ tabs: staticTabs, fetchData, isLoading, data, error }}>
      {children}
    </GeoApiContext.Provider>
  );
};

export const useGeoApi = (): GeoApiContextType => {
  const context = useContext(GeoApiContext);
  if (!context) throw new Error('useGeoApi must be used within a GeoApiProvider');
  return context;
};
