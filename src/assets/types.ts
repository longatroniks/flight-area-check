export type DroneRestriction = {
  id: number;
  name: string;
  restriction: string;
  message: string;
  authority: {
    name: string;
    service: string;
    email?: string;
    phone?: string;
    url?: string;
  };
  restrictionId: string;
  lowerLimit: string | null;
  upperLimit: string | null;
};

export type PopulationStat = {
  year: number;
  value: number;
};

export interface Location {
    id: string;
    name: string;
    type: string;
    lat: number;
    lon: number;
}

export interface Tab {
    id: string;
    name: string;
    fetchMethod: (lat: number, lon: number) => Promise<any>;
}

export interface MenuItemProps {
  name: string;
  link: string;
}
