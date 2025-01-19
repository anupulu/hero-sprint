import React from 'react';

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`w-full p-2 border rounded-md ${className}`}
      ref={ref}
      {...props}
    />
  );
});

export default Input;