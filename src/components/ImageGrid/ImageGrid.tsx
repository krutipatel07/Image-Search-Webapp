import React from 'react';
import { PexelsPhoto } from '../../types'; //
import ImageItem from '../ImageItem/ImageItem';
import styles from './ImageGrid.module.css'; //

interface ImageGridProps {
  photos: PexelsPhoto[];
  onImageClick: (photo: PexelsPhoto) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ photos, onImageClick }) => {
  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <div className={styles.imageGrid}>
      {photos.map((photo) => (
        <ImageItem key={photo.id} photo={photo} onClick={onImageClick} />
      ))}
    </div>
  );
};

export default ImageGrid;