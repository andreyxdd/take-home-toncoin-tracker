import React from 'react';
import styles from './styles.module.scss';

type Props = {
  isClicked: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, isClicked, ...props }: Props) {
  return (
    <button
      type="button"
      className={`${styles.button} ${isClicked ? styles['button-clicked'] : ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
