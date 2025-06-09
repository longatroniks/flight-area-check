import { MapPinIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { droneRestrictionCardLabels } from '../assets/static-values';
import { DroneRestriction } from '../assets/types';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface DroneRestrictionCardProps {
  restriction: DroneRestriction;
}

const DroneRestrictionCard: React.FC<DroneRestrictionCardProps> = ({
  restriction,
}) => (
  <div className="grid grid-cols-[1fr_3fr] gap-3 rounded-xl p-4 bg-gray-50 shadow-sm border border-gray-100">

    <div className="flex gap-1 items-center text-sm text-gray-500">
      <MapPinIcon className="h-4 w-4" />
      <span className="font-medium text-gray-700">
        {droneRestrictionCardLabels.zone}:
      </span>
    </div>
    <p className="text-sm">{restriction.name}</p>

    <div className="flex gap-1 items-center text-sm text-gray-500">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <span className="font-medium text-gray-700">
        {droneRestrictionCardLabels.restriction}:
      </span>
    </div>
    <p className="text-sm">{restriction.restriction}</p>

    <div className="flex gap-1 items-center text-sm text-gray-500">
      <EnvelopeIcon className="h-4 w-4" />
      <span className="font-medium text-gray-700">
        {droneRestrictionCardLabels.message}:
      </span>
    </div>
    <p className="text-sm">{restriction.message}</p>
    
    {restriction.authority?.url && (
      <>
        <div className="flex gap-1 items-center  text-sm text-gray-500">
          <UserCircleIcon className="h-4 w-4" />
          <span className="font-medium text-gray-700">
            {droneRestrictionCardLabels.authority}:
          </span>
        </div>
        <div>
          <a
            href={restriction.authority.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            {restriction.authority.name}
          </a>
        </div>
      </>
    )}
  </div>
);

export default DroneRestrictionCard;
