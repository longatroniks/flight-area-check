import { fetchDroneRestrictions, fetchPopulationDensity } from "../services/api/geoApiService";
import { MenuItemProps, Tab } from "./types";

export const tabs: Tab[] = [
    { id: 'drone', name: 'Drone Restrictions', fetchMethod: fetchDroneRestrictions },
    { id: 'pop', name: 'Population Density', fetchMethod: fetchPopulationDensity },
  ];

export const menuItems: MenuItemProps[] = [
    { name: "Home", link: "" },
    { name: "About", link: "" }
  ];