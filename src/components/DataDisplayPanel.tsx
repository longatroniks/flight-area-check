import React, { JSX } from 'react';
import { DroneRestriction, PopulationStat } from '../assets/types';
import AlertIcon from './icons/AlertIcon';

type DisplayItem = PopulationStat | DroneRestriction;

interface DataDisplayPanelProps<T extends DisplayItem> {
  data?: T[];
  title?: string;
  renderItem: (item: T, index: number) => React.ReactNode;
}

const DataDisplayPanel = <T extends DisplayItem>({
  data,
  title = '',
  renderItem,
}: DataDisplayPanelProps<T>): JSX.Element => {
  const isEmpty = !Array.isArray(data) || data.length === 0;

  return (
    <div className="w-full h-[50vh] md:w-1/2 md:h-[70vh] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-md">
      <h2 className="text-xl font-heading text-gray-700 sticky top-0 bg-white z-10 border-b border-gray-200 p-4">
        {title}
      </h2>
      <div className="p-4 space-y-3 h-full">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 h-full space-y-2">
            <AlertIcon />
            <p className="text-base font-medium">No data found</p>
            <p className="text-sm max-w-md text-gray-400">
              Try searching for more populated areas like <strong>Silvapana</strong> for population density, 
              or locations near airports like <strong>Meyrin</strong> for drone restrictions.
            </p>
          </div>
        ) : (
          data.map((item, index) => renderItem(item, index))
        )}
      </div>
    </div>
  );
};

export default DataDisplayPanel;
