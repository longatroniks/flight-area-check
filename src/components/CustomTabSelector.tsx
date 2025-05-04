import React from 'react';
import { Tab } from '../assets/types';

interface CustomTabSelectorProps {
  tabs: Tab[];
  selectedTabId: string;
  setSelectedTabId: (id: string) => void;
  resetSearch: () => void;
}

const CustomTabSelector: React.FC<CustomTabSelectorProps> = ({
  tabs,
  selectedTabId,
  setSelectedTabId,
  resetSearch,
}) => {
  const handleTabChange = (tabId: string) => {
    if (tabId !== selectedTabId) {
      setSelectedTabId(tabId);
      resetSearch();
    }
  };

  const activeTabIndex = tabs.findIndex((tab) => tab.id === selectedTabId);

  return (
    <div className="relative">
      <div className="flex rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className="flex-1 p-3 text-center font-light text-sm relative z-10"
          >
            <span
              className={
                selectedTabId === tab.id ? 'text-white' : 'text-gray-500'
              }
            >
              {tab.name}
            </span>
          </button>
        ))}
      </div>
      <div
        className={`absolute top-1 bottom-1 rounded-lg transition-all duration-300 ease-in-out z-0 ${
          activeTabIndex === 0 ? 'bg-secondary' : 'bg-primary'
        }`}
        style={{
          width: `${100 / tabs.length}%`,
          left: `${(activeTabIndex * 100) / tabs.length}%`,
        }}
      />
    </div>
  );
};

export default CustomTabSelector;
