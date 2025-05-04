import { useEffect, useState } from 'react';
import TopBar from './components/nav/TopBar';
import Logo from './components/icons/Logo';
import TabDropdownComponent from './components/TabDropdownComponent';
import { loadLocations } from './services/api/locationApiService';
import { Location, DroneRestriction, PopulationStat } from './assets/types';
import { menuItems, tabs } from './assets/static-values';
import Spinner from './components/utils/Spinner';
import DataDisplayPanel from './components/DataDisplayPanel';
import DroneRestrictionCard from './components/cards/DroneRestrictionCard';
import PopulationCard from './components/cards/PopulationCard';

const App: React.FC = () => {
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
    const fetchLocations = async () => {
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
    <div>
      <header><TopBar logo={Logo} items={menuItems} /></header>
      <main className="px-2 flex items-center justify-center min-h-[80vh] overflow-hidden">
        <div
          className={`flex flex-col w-full max-w-6xl gap-8 
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
                <h1 className="text-h3 md:text-h1 font-heading font-light">Flight Area Checker</h1>
                <h3 className="text-h6 md:text-h4 font-sans font-light text-gray-500">Investigate the skies</h3>
              </div>

              {isLoading && locations.length === 0 ? (
                <div className="flex justify-center items-center h-32">
                  <Spinner color="secondary" />
                </div>
              ) : fetchedData.error && locations.length === 0 ? (
                <p className="text-red-500 mt-4">Failed to load locations. Contact the Maintainer to fire up the API.</p>
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
                      text: "Fetch data",
                      onClick: handleFetchData,
                    }}
                  />
                  {fetchedData.error && <p className="text-red-500 mt-4">{fetchedData.error}</p>}
                </>
              )}

            </div>
          </div>

          {isLoading && <Spinner color='secondary' />}

          {(fetchedData.populationStats || fetchedData.droneRestrictions) && (
            selectedTabId === 'pop' && fetchedData.populationStats ? (
              <DataDisplayPanel<PopulationStat>
                title={tabs.find(tab => tab.id === selectedTabId)?.name}
                data={fetchedData.populationStats}
                renderItem={(stat, index) => (
                  <PopulationCard key={index} stat={stat} />
                )}
              />
            ) : fetchedData.droneRestrictions ? (
              <DataDisplayPanel<DroneRestriction>
                title={tabs.find(tab => tab.id === selectedTabId)?.name}
                data={fetchedData.droneRestrictions}
                renderItem={(restriction, index) => (
                  <DroneRestrictionCard key={index} restriction={restriction} />
                )}
              />
            ) : null
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
