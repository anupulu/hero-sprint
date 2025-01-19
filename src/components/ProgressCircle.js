import React from 'react';

const ProgressCircle = () => {
  return (
    <div className="relative w-48 h-48 my-12">
      <div className="absolute inset-0 rounded-full border-8 border-purple-500 animate-pulse opacity-75" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-6xl font-bold text-purple-600">100%</span>
      </div>
    </div>
  );
};

export default ProgressCircle;