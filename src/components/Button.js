import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button 
      className={`inline-flex items-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;