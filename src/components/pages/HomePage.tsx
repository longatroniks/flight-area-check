import React, { useState, useCallback } from 'react';
import { useGeoApi } from '../../providers/GeoApiProvider';
import { useLocationContext } from '../../providers/LocationProvider';
import TabDropdownComponent from '../TabDropdownComponent';
import LoadingOverlay from '../utils/LoadingOverlay';
import ContentPanel from '../layout/ContentPanel';
import { homePageContent } from '../../assets/static-values';

const HomePage: React.FC = () => {
  const { locations, isLoading: isLoadingLocations, error: locationError } = useLocationContext();
  const { tabs, fetchData, isLoading, data, error } = useGeoApi();

  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [selectedTabId, setSelectedTabId] = useState('drone');

  const selectedTab = tabs.find((tab) => tab.id === selectedTabId);
  const selectedLocation = locations.find((loc) => loc.id === selectedLocationId);

  const hasContent = data.populationStats?.length || data.droneRestrictions?.length || error;

  const handleFetchData = useCallback(async () => {
    if (!selectedLocation || !selectedTab) return;
    try {
      await fetchData(selectedTab.id, selectedLocation);
    } catch {
    }
  }, [fetchData, selectedLocation, selectedTab]);

  return (
    <div className="relative flex justify-center items-center min-h-[80vh] p-6">
      <div
        className={`flex flex-col md:flex-row w-full max-w-6xl gap-8 transition-all duration-500 ease-in-out ${hasContent ? 'md:justify-between' : 'justify-center'
          }`}
      >
        <div className="flex flex-1 flex-col gap-4 items-center justify-center">
          <div className="text-center">
            <h1 className="text-h3 md:text-h1 font-heading font-light">{homePageContent.title}</h1>
            <h4 className="text-h6 md:text-h4 font-sans font-light text-gray-500">{homePageContent.subtitle}</h4>
          </div>

          {!isLoading && locationError && locations.length === 0 ? (
            <p className="text-red-500 mt-4">{homePageContent.errorMessages.failedToLoadLocations}</p>
          ) : (
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
          )}
        </div>

        {hasContent && (
          <div className="flex flex-1 flex-row w-full">
            <ContentPanel
              title={selectedTab?.name || ''}
              data={selectedTabId === 'pop' ? data.populationStats || [] : data.droneRestrictions || []}
              renderType={selectedTabId === 'pop' ? 'population' : 'drone'}
              error={error || undefined}
            />
          </div>
        )}
      </div>

      <LoadingOverlay isLoading={isLoading || isLoadingLocations} message={isLoadingLocations ? 'Loading locations...' : 'Fetching data...'} />
    </div>
  );
};

export default HomePage;
