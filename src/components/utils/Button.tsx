import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'default';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  className = '',
  variant = 'default',
  children,
}) => {
  const baseStyles =
    'w-full sm:w-1/3 p-3 rounded-lg text-gray-500 font-light transition-colors disabled:opacity-50';

  let variantStyles = 'bg-gray-200';
  if (!disabled) {
    if (variant === 'primary') variantStyles = 'bg-primary text-white';
    else if (variant === 'secondary') variantStyles = 'bg-secondary text-white';
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
