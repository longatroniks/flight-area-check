import { Location } from '../../assets/types';

export async function loadLocations(): Promise<Location[]> {
  const apiUrl = import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_LOCATIONS_API_URL
    : import.meta.env.VITE_LOCATIONS_API_URL_PROD;

  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error('Failed to fetch assets');
  }

  const locations = await res.json();

  const mappedLocations: Location[] = locations.map((location: any) => ({
    id: location.id,
    name: location.name,
    type: location.type,
    lat: location.latitude,
    lon: location.longitude,
  }));

  mappedLocations.sort((a, b) => a.name.localeCompare(b.name));

  return mappedLocations;
}