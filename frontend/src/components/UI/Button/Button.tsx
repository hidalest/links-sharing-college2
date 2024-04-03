import React, { MouseEventHandler } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  priority: 'primary' | 'secondary' | 'tertiary';
  name?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

function Button(props: ButtonProps) {
  const {
    children,
    className,
    priority = 'primary',
    onClick,
    name,
    type = 'button',
    disabled = false,
  } = props;
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${
        styles[`button-${priority}`]
      } ${className}`}
      name={name}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
