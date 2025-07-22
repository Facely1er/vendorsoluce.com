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
    primary: 'bg-vendorsoluce-navy text-white hover:bg-vendorsoluce-navy/90 focus:ring-vendorsoluce-navy/50',
    secondary: 'bg-vendorsoluce-navy text-white hover:bg-vendorsoluce-navy/90 focus:ring-vendorsoluce-navy/50',
    outline: 'bg-transparent border border-vendorsoluce-navy text-vendorsoluce-navy hover:bg-vendorsoluce-navy/10 focus:ring-vendorsoluce-navy/30',
    ghost: 'bg-transparent text-vendorsoluce-navy hover:bg-vendorsoluce-navy/10 focus:ring-vendorsoluce-navy/30',
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