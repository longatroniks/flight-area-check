import React from 'react';
import PopulationChart from '../PopulationChart';
import DroneRestrictionCard from '../DroneRestrictionCard';
import { PopulationStat, DroneRestriction } from '../../assets/types';
import AlertIcon from '../icons/AlertIcon';

interface ContentPanelProps {
  title: string;
  data: PopulationStat[] | DroneRestriction[];
  renderType: 'population' | 'drone';
  error?: string;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ title, data, renderType, error }) => {
  if (error) {
    return (
      <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-4 max-h-[70vh] overflow-y-auto">
        <h2 className="text-xl font-heading text-gray-700 mb-3 text-center md:text-left">{title}</h2>
        <div className="flex flex-col items-center justify-center text-center text-gray-500 py-8 space-y-2">
          <AlertIcon />
          <p className="text-base font-medium text-red-500">Error fetching data</p>
          <p className="text-sm max-w-md text-gray-500">{error}</p>
          <p className="text-sm max-w-md text-gray-400 mt-2">
            Please try a different location or check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (!data || data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 py-8 space-y-2">
          <AlertIcon />
          <p className="text-base font-medium">No data found</p>
          <p className="text-sm max-w-md text-gray-400">
            Try searching for more populated areas like <strong>Silvapana</strong> for population density, 
            or locations near airports like <strong>Meyrin</strong> for drone restrictions.
          </p>
        </div>
      );
    }

    switch (renderType) {
      case 'population':
        return <PopulationChart data={data as PopulationStat[]} />;
      case 'drone':
        return (
          <div className="space-y-3">
            {(data as DroneRestriction[]).map((restriction, index) => (
              <DroneRestrictionCard key={index} restriction={restriction} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-4 max-h-[70vh] overflow-y-auto">
      <h2 className="text-xl font-heading text-gray-700 mb-3 text-center md:text-left">{title}</h2>
      {renderContent()}
    </div>
  );
};

export default ContentPanel;