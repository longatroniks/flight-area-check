import {
  fetchDroneRestrictions,
  fetchPopulationDensity,
} from '../services/api/geoApiService';
import { MenuItemProps, Tab } from './types';

export const tabs: Tab[] = [
  {
    id: 'drone',
    name: 'Drone Restrictions',
    fetchMethod: fetchDroneRestrictions,
  },
  {
    id: 'pop',
    name: 'Population Density',
    fetchMethod: fetchPopulationDensity,
  },
];

export const menuItems: MenuItemProps[] = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
];

export const droneRestrictionCardLabels = {
  zone: 'Zone',
  restriction: 'Restriction',
  message: 'Message',
  authority: 'Authority',
};

export const populationCardLabels = {
  year: 'Year',
  population: 'Population Density',
};

export const homePageContent = {
  title: 'Flight Area Checker',
  subtitle: 'Investigate the skies',
  errorMessages: {
    failedToLoadLocations:
      'Failed to load locations. Contact the Maintainer to fire up the API.',
    failedToFetchData: 'Failed to fetch data',
  },
  buttonText: 'Fetch data',
};

export const aboutPageContent = {
  title: 'About Flight Area Checker',
  description: 'A tool for investigating airspace and drone restrictions.',
  projectOverview: {
    heading: 'Project Overview',
    content: `The Flight Area Checker app allows users to investigate airspace restrictions for drones by selecting a location and viewing drone restriction data and population statistics. 
    The goal of the app is to help drone operators assess whether they can fly in a given area based on various factors.`,
  },
  howToUse: {
    heading: 'How to Use',
    steps: [
      'Select a location from the dropdown.',
      'Choose whether to view population stats or drone flight restrictions.',
      "Click 'Fetch Data' to retrieve and display the data.",
      'View the data in the results panel, which will be displayed below.',
    ],
  },
  technologies: {
    heading: 'Technologies Used',
    content:
      'This project utilizes React, TypeScript, Tailwind CSS, and external APIs to gather location-based data.',
  },
};
