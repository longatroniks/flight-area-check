// src/components/AlertIcon.tsx
import React from 'react';

const AlertIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 22h20L12 2zm0 15v-4m0-4h0" />
    </svg>
  );
};

export default AlertIcon;
