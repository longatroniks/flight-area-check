import { Tab, Location } from '../assets/types';
import CustomTabSelector from './CustomTabSelector';
import { useState } from 'react';
import Button from './utils/Button';
import SearchDropdown from './SearchDropdown';

interface TabDropdownComponentProps {
  tabs: Tab[];
  assets: Location[];
  selectedLocationId: string;
  setSelectedLocationId: (id: string) => void;
  selectedTabId: string;
  setSelectedTabId: (id: string) => void;
  button: {
    text?: string;
    onClick: () => void;
  }
}

const TabDropdownComponent: React.FC<TabDropdownComponentProps> = ({
  tabs,
  assets,
  selectedLocationId,
  setSelectedLocationId,
  selectedTabId,
  setSelectedTabId,
  button,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-md w-full max-w-md mx-auto text-sm font-heading">
      <CustomTabSelector
        tabs={tabs}
        selectedTabId={selectedTabId}
        setSelectedTabId={setSelectedTabId}
        resetSearch={() => {
          setSearchTerm('');
          setSelectedLocationId('');
          setIsDropdownOpen(false);
        }}
      />

      <div className="flex flex-col items-center sm:flex-row gap-4 relative">
        <SearchDropdown
          items={assets}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          selectedStyleVariant={selectedTabId === 'pop' ? 'primary' : 'secondary'}
          getId={(loc) => loc.id}
          getLabel={(loc) => loc.name}
          onSelect={(loc) => {
            setSelectedLocationId(loc.id);
          }}
        />
        <Button
          onClick={button.onClick}
          disabled={!selectedLocationId}
          variant={selectedTabId === 'pop' ? 'primary' : 'secondary'}
        >
          {button?.text}
        </Button>

      </div>
    </div>
  );
};

export default TabDropdownComponent;
