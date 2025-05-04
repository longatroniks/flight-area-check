// components/layout/ContentPanel.tsx

import React from 'react';
import PopulationChart from '../PopulationChart';
import DroneRestrictionCard from '../DroneRestrictionCard';
import { PopulationStat, DroneRestriction } from '../../assets/types';

interface ContentPanelProps {
  title: string;
  data: PopulationStat[] | DroneRestriction[];
  renderType: 'population' | 'drone';
}

const ContentPanel: React.FC<ContentPanelProps> = ({ title, data, renderType }) => {
  const renderContent = () => {
    switch (renderType) {
      case 'population':
        return <PopulationChart data={data as PopulationStat[]} />;
      case 'drone':
        return (
          <div className="space-y-3">
            {(data as DroneRestriction[]).length > 0 ? (
              (data as DroneRestriction[]).map((restriction, index) => (
                <DroneRestrictionCard key={index} restriction={restriction} />
              ))
            ) : (
              <p className="text-gray-500 text-center">No drone restrictions found for this area.</p>
            )}
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
