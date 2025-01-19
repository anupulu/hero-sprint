import React from 'react';

export const Card = ({ className, children }) => (
  <div className={`bg-white shadow-lg rounded-lg ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b">
    {children}
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h3 className={`text-xl font-semibold ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children }) => (
  <div className="px-6 py-4">
    {children}
  </div>
);