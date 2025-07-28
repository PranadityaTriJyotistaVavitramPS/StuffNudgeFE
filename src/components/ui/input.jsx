import React from 'react';

export const Input = ({ 
  type = 'text', 
  className = '', 
  placeholder = '',
  value,
  onChange,
  name,
  id,
  ...props 
}) => {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
  
  return (
    <input
      type={type}
      className={`${baseClasses} ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      {...props}
    />
  );
};



