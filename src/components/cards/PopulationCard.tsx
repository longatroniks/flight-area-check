import React from 'react';
import { PopulationStat } from '../../assets/types';

interface PopulationCardProps {
    stat: PopulationStat;
}

const PopulationCard: React.FC<PopulationCardProps> = ({ stat }) => (
    <div className="rounded-xl p-4 bg-gray-50 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Year:</span> {stat.year}
        </p>
        <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Population:</span>{' '}
            {stat.value.toLocaleString()}
        </p>
    </div>
);

export default PopulationCard;
