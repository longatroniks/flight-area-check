import React from 'react';

interface SpinnerProps {
  color: 'primary' | 'secondary';
}

const Spinner: React.FC<SpinnerProps> = ({ color = 'primary' }) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div
        className={`w-5 h-5 rounded-xl border-2 border-${color} border-l-white animate-spin`}
      />
    </div>
  );
};

export default Spinner;
