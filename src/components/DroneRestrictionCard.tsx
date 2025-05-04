import React from 'react';
import { droneRestrictionCardLabels } from '../assets/static-values';
import { DroneRestriction } from '../assets/types';

interface DroneRestrictionCardProps {
    restriction: DroneRestriction;
}

const DroneRestrictionCard: React.FC<DroneRestrictionCardProps> = ({ restriction }) => (
    <div className="rounded-xl p-4 bg-gray-50 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">{droneRestrictionCardLabels.zone}:</span> {restriction.name}
        </p>
        <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">{droneRestrictionCardLabels.restriction}:</span> {restriction.restriction}
        </p>
        <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">{droneRestrictionCardLabels.message}:</span> {restriction.message}
        </p>
        {restriction.authority?.url && (
            <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">{droneRestrictionCardLabels.authority}:</span>{' '}
                <a
                    href={restriction.authority.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    {restriction.authority.name}
                </a>
            </p>
        )}
    </div>
);

export default DroneRestrictionCard;
