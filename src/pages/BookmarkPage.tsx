// src/pages/BookmarksPage.tsx
import React, { useState, useCallback } from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import Modal from '../components/Modal/Modal';
import { Bookmark, PexelsPhoto } from '../types'; //
import pageStyles from './PageStyles.module.css';

function BookmarksPage() {
  const { bookmarks, folders } = useBookmarks();
  const [selectedPhoto, setSelectedPhoto] = useState<PexelsPhoto | null>(null);

  const handleImageClick = useCallback((photo: PexelsPhoto) => {
    setSelectedPhoto(photo);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const hasBookmarks = folders.some((folder:string) => bookmarks[folder]?.length > 0);

    // get all bookmarks into a single array
    const allBookmarkedItems: Bookmark[] = Object.values(bookmarks).flat() as Bookmark[];
    // Then find the specific bookmark for the modal
    const findBookmarkInfo = (photoId: number): Bookmark | undefined => {
      return allBookmarkedItems.find(bm => bm.id === photoId);
    };

  return (
    <div className={pageStyles.pageContainer}>
      <h1>My Bookmarks</h1>

      {!hasBookmarks ? (
         <p className={pageStyles.promptMessage}>You haven't bookmarked any images yet. Start searching!</p>
      ) : (
        folders.map((folder:string) => {
          const folderBookmarks = bookmarks[folder];
          if (!folderBookmarks || folderBookmarks.length === 0) {
               return null;
          }

          return (
              <section key={folder} className={pageStyles.bookmarkSection}>
                  <h2 className={pageStyles.folderTitle}>{folder}</h2>
                  <ImageGrid photos={folderBookmarks} onImageClick={handleImageClick} />
              </section>
          );
        })
      )}

       {selectedPhoto && (
         <Modal
           photo={selectedPhoto}
           onClose={handleCloseModal}
           bookmarkInfo={findBookmarkInfo(selectedPhoto.id)}
         />
      )}
    </div>
  );
}

export default BookmarksPage;