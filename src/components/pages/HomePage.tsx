// HomePage.tsx
import React, { useEffect, useState } from 'react';
import { tabs } from '../../assets/static-values';
import { PopulationStat, DroneRestriction, Location } from '../../assets/types';
import { loadLocations } from '../../services/api/locationApiService';
import DroneRestrictionCard from '../cards/DroneRestrictionCard';
import PopulationCard from '../cards/PopulationCard';
import DataDisplayPanel from '../DataDisplayPanel';
import TabDropdownComponent from '../TabDropdownComponent';
import LoadingOverlay from '../utils/LoadingOverlay';
import { homePageContent } from '../../assets/static-values';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [selectedTabId, setSelectedTabId] = useState<string>("drone");
  const [fetchedData, setFetchedData] = useState<{
    populationStats?: PopulationStat[];
    droneRestrictions?: DroneRestriction[];
    error?: string;
  }>({});

  useEffect(() => {
    const fetchLocations = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const data = await loadLocations();
        setLocations(data);
      } catch (err) {
        setFetchedData({ error: 'Failed to load locations' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    setFetchedData({});
  }, [selectedTabId]);

  const handleFetchData = async () => {
    const location = locations.find(loc => loc.id === selectedLocationId);
    const tab = tabs.find(tab => tab.id === selectedTabId);
    if (!location || !tab) return;

    setIsLoading(true);
    try {
      const result = await tab.fetchMethod(location.lat, location.lon);

      if (selectedTabId === 'pop') {
        setFetchedData({ populationStats: result });
      } else if (selectedTabId === 'drone') {
        setFetchedData({ droneRestrictions: result });
      }
    } catch (err) {
      console.error(err);
      setFetchedData({ error: 'Failed to fetch data' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-[80vh] p-6">
      <div className={`flex flex-col w-full max-w-6xl gap-8 
                          transition-all duration-500 ease-in-out
                          ${fetchedData.populationStats || fetchedData.droneRestrictions
                              ? 'md:flex-row md:justify-between md:items-center'
                              : 'md:items-center md:justify-center'}`}
      >
        <div className={`w-full md:w-1/2 flex flex-col 
                        transition-all duration-500 ease-in-out
                        ${fetchedData.populationStats || fetchedData.droneRestrictions
                            ? 'md:items-start md:justify-start'
                            : 'md:items-center md:justify-center'}`}
        >
          <div className="w-full flex flex-col gap-4 justify-center items-center">
            <div className="text-center">
              <h1 className="text-h3 md:text-h1 font-heading font-light">{homePageContent.title}</h1>
              <h3 className="text-h6 md:text-h4 font-sans font-light text-gray-500">{homePageContent.subtitle}</h3>
            </div>

            {!isLoading && fetchedData.error && locations.length === 0 ? (
              <p className="text-red-500 mt-4">{homePageContent.errorMessages.failedToLoadLocations}</p>
            ) : (
              <>
                <TabDropdownComponent
                  tabs={tabs}
                  assets={locations}
                  selectedLocationId={selectedLocationId}
                  setSelectedLocationId={setSelectedLocationId}
                  selectedTabId={selectedTabId}
                  setSelectedTabId={setSelectedTabId}
                  button={{
                    text: homePageContent.buttonText,
                    onClick: handleFetchData,
                  }}
                />
                {fetchedData.error && <p className="text-red-500 mt-4">{homePageContent.errorMessages.failedToFetchData}</p>}
              </>
            )}
          </div>
        </div>

        {selectedTabId === 'pop' && fetchedData.populationStats ? (
          <DataDisplayPanel<PopulationStat>
            title={tabs.find(tab => tab.id === selectedTabId)?.name}
            data={fetchedData.populationStats}
            renderItem={(stat, index) => <PopulationCard key={index} stat={stat} />}
          />
        ) : selectedTabId === 'drone' && fetchedData.droneRestrictions ? (
          <DataDisplayPanel<DroneRestriction>
            title={tabs.find(tab => tab.id === selectedTabId)?.name}
            data={fetchedData.droneRestrictions}
            renderItem={(restriction, index) => (
              <DroneRestrictionCard key={index} restriction={restriction} />
            )}
          />
        ) : null}
      </div>

      <LoadingOverlay
        isLoading={isLoading}
        message={locations.length === 0 ? "Loading locations..." : "Fetching data..."}
      />
    </div>
  );
};

export default HomePage;
