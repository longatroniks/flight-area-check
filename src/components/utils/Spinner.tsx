import React from 'react';

interface SpinnerProps {
  color: 'primary' | 'secondary';
}

const Spinner: React.FC<SpinnerProps> = ({ color = 'primary' }) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className={`w-6 h-6 border-4 border-t-4 border-${color} rounded-full animate-spin`}></div>
    </div>
  );
};

export default Spinner;
