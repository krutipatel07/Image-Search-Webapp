import React, { useState, useEffect } from 'react';
import { PexelsPhoto, Bookmark, DEFAULT_FOLDER_NAME } from '../../types'; //
import { useBookmarks } from '../../hooks/useBookmarks';
import styles from './Modal.module.css'; //

interface ModalProps {
  photo: PexelsPhoto;
  onClose: () => void;
  bookmarkInfo: Bookmark | undefined; 
}

const Modal: React.FC<ModalProps> = ({ photo, onClose, bookmarkInfo }) => {
  const { addBookmark, removeBookmark, folders, createFolder } = useBookmarks();
  const [selectedFolder, setSelectedFolder] = useState<string>(bookmarkInfo?.folder || DEFAULT_FOLDER_NAME);
  const [showNewFolderInput, setShowNewFolderInput] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>('');

  // Reset folder selection when modal opens or bookmark status changes
  useEffect(() => {
      setSelectedFolder(bookmarkInfo?.folder || DEFAULT_FOLDER_NAME);
       setShowNewFolderInput(false); 
       setNewFolderName('');
  }, [photo, bookmarkInfo]);


  const handleAddBookmark = () => {
    let folderToAdd = selectedFolder;
    if (showNewFolderInput && newFolderName.trim()) {
        const trimmedName = newFolderName.trim();
         if (!folders.includes(trimmedName)) {
             createFolder(trimmedName); 
         }
         folderToAdd = trimmedName;
    } else if (selectedFolder === '__NEW__') {
         console.warn("Please enter a valid name for the new folder.");
         return; 
    }

    addBookmark(photo, folderToAdd);
    // Optional: Close modal after adding?
    // onClose();
  };

  const handleRemoveBookmark = () => {
    removeBookmark(photo.id);
    // Optional: Close modal after removing?
    // onClose();
  };

  const handleFolderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
     const value = event.target.value;
     if (value === '__NEW__') {
         setShowNewFolderInput(true);
         setSelectedFolder(value); 
     } else {
         setShowNewFolderInput(false);
         setNewFolderName('');
         setSelectedFolder(value);
     }
  };

  const handleNewFolderInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewFolderName(event.target.value);
  };

  const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
  };


  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={handleContentClick}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          &times; {}
        </button>

        <div className={styles.imageContainer}>
          <img
            src={photo.src.large}
            alt={photo.alt || `Photo by ${photo.photographer}`}
            className={styles.modalImage}
          />
        </div>

        <div className={styles.modalInfo}>
          <h3 className={styles.modalTitle}>
              Photo by <a href={photo.photographer_url} target="_blank" rel="noopener noreferrer">{photo.photographer}</a>
          </h3>
          <p className={styles.pexelsLink}>
              View on <a href={photo.url} target="_blank" rel="noopener noreferrer">Pexels</a>
          </p>
          {/* Dimensions, etc. can be added here */}
          <p>Dimensions: {photo.width} x {photo.height}</p>

          {/* --- Bookmark Controls --- */}
          <div className={styles.bookmarkControls}>
            {bookmarkInfo ? (
               <>
                 <p className={styles.bookmarkStatus}>Bookmarked in: <strong>{bookmarkInfo.folder}</strong></p>
                 <button onClick={handleRemoveBookmark} className={`${styles.actionButton} ${styles.removeButton}`}>
                   Remove Bookmark
                 </button>
               </>
            ) : (
                <>
                    <label htmlFor="folderSelect" className={styles.label}>Add to Folder:</label>
                    <select
                        id="folderSelect"
                        value={selectedFolder}
                        onChange={handleFolderChange}
                        className={styles.folderSelect}
                    >
                        {folders.map((folder:string) => (
                            <option key={folder} value={folder}>{folder}</option>
                        ))}
                        <option value="__NEW__">-- Create New Folder --</option>
                    </select>

                    {showNewFolderInput && (
                        <input
                            type="text"
                            placeholder="New folder name"
                            value={newFolderName}
                            onChange={handleNewFolderInputChange}
                            className={styles.newFolderInput}
                            autoFocus
                         />
                    )}

                    <button
                       onClick={handleAddBookmark}
                       disabled={showNewFolderInput && !newFolderName.trim()}
                       className={`${styles.actionButton} ${styles.addButton}`}
                     >
                      Add Bookmark
                    </button>
                </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;