import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadLocations } from '../services/api/locationApiService';
import { Location } from '../assets/types';

interface LocationContextType {
    locations: Location[];
    isLoading: boolean;
    error: string | null;
}

const LocationContext = createContext<LocationContextType>({
    locations: [],
    isLoading: false,
    error: null,
});

export const useLocationContext = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            setIsLoading(true);
            try {
                const data = await loadLocations();
                setLocations(data);
            } catch (err) {
                setError('Failed to load locations');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return (
        <LocationContext.Provider value={{ locations, isLoading, error }}>
            {children}
        </LocationContext.Provider>
    );
};
