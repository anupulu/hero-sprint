import React from 'react';

const DashboardProgressCircle = ({ percentage, className }) => {
  return (
    <div className="relative w-32 h-32">
      <div className={`absolute inset-0 rounded-full border-8 opacity-75 ${className}`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-4xl font-bold ${className}`}>{percentage}%</span>
      </div>
    </div>
  );
};

export default DashboardProgressCircle;