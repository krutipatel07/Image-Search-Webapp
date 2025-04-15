import React from 'react';
import { PexelsPhoto } from '../../types'; 
import styles from './ImageItem.module.css'; 

interface ImageItemProps {
  photo: PexelsPhoto;
  onClick: (photo: PexelsPhoto) => void;
}

// Performance Optimization: Lazy loading and low-quality placeholder
const ImageItem: React.FC<ImageItemProps> = ({ photo, onClick }) => {
  // Choose a smaller source for the grid preview to improve load time
  const previewSrc = photo.src.medium || photo.src.small || photo.src.original; //

  return (
    <button className={styles.imageItemButton} onClick={() => onClick(photo)}>
      <img
        src={previewSrc}
        alt={photo.alt || `Photo by ${photo.photographer}`} //
        className={styles.image}
        loading="lazy" 
      />
      <div className={styles.overlay}>
        <span className={styles.photographer}>{photo.photographer}</span>
      </div>
    </button>
  );
};

export default ImageItem;