// src/components/Loader/Loader.tsx
import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  message?: string; 
}

const Loader: React.FC<LoaderProps> = ({message}) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <span>Loading...</span>
    </div>
  );
};

export default Loader;