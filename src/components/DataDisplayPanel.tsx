import { ReactNode } from 'react';

interface DataDisplayPanelProps<T> {
  data: T[];
  title?: string;
  renderItem: (item: T, index: number) => ReactNode;
}

function DataDisplayPanel<T>({ data, title = "", renderItem }: DataDisplayPanelProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[50vh] md:w-1/2 md:h-[70vh] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-md flex items-center justify-center text-gray-400">
        No data available.
      </div>
    );
  }

  return (
    <div className="w-full h-[50vh] md:w-1/2 md:h-[70vh] overflow-y-auto space-y-4 rounded-xl border border-gray-200 bg-white shadow-md">
      <h2 className="text-xl font-heading text-gray-700 sticky top-0 bg-white z-10 border-b border-gray-200 p-4">
        {title}
      </h2>
      <div className="space-y-3 p-4">
        {data.map((item, index) => renderItem(item, index))}
      </div>
    </div>
  );
}

export default DataDisplayPanel;