import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = 'font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-vendorsoluce-green text-white hover:bg-vendorsoluce-green/90 focus:ring-vendorsoluce-green/50',
    secondary: 'bg-white text-vendorsoluce-green hover:bg-gray-50 focus:ring-vendorsoluce-green/30 border border-white',
    outline: 'bg-transparent border border-vendorsoluce-green text-vendorsoluce-green hover:bg-vendorsoluce-green/10 focus:ring-vendorsoluce-green/30',
    ghost: 'bg-transparent text-vendorsoluce-green hover:bg-vendorsoluce-green/10 focus:ring-vendorsoluce-green/30',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export { Button };
export default Button;