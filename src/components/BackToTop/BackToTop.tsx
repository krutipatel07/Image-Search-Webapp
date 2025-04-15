import React, { useState, useEffect } from 'react';
import styles from './BackToTop.module.css'; 

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    const scrollThreshold = 300; 
    if (window.scrollY > scrollThreshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.backToTopContainer}>
      {isVisible && ( 
        <button
          type="button" 
          onClick={scrollToTop}
          className={styles.backToTopButton}
          aria-label="Scroll back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;