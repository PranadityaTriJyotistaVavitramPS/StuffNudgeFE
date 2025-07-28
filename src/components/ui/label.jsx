import React from 'react';

export const Label = ({ 
  children, 
  htmlFor, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'block text-sm font-medium text-gray-700 mb-1';
  
  return (
    <label
      htmlFor={htmlFor}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};



