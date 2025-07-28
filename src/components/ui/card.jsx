import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  const baseClasses = 'bg-white shadow-lg rounded-lg border border-gray-200';
  
  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  const baseClasses = 'px-6 py-4 border-b border-gray-200';
  
  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  const baseClasses = 'text-xl font-semibold text-gray-900';
  
  return (
    <h3 className={`${baseClasses} ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = '', ...props }) => {
  const baseClasses = 'text-sm text-gray-600 mt-1';
  
  return (
    <p className={`${baseClasses} ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  const baseClasses = 'px-6 py-4';
  
  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};
