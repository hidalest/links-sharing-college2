import React, { MouseEventHandler } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  priority: 'primary' | 'secondary' | 'tertiary';
  name?: string;
  type?: 'button' | 'submit';
}

function Button(props: ButtonProps) {
  const {
    children,
    className,
    priority = 'primary',
    onClick,
    name,
    type = 'button',
  } = props;
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${
        styles[`button-${priority}`]
      } ${className}`}
      name={name}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
