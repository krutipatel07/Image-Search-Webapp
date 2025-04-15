import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Bookmark, BookmarkCollection, DEFAULT_FOLDER_NAME, PexelsPhoto } from '../types'; //

const BOOKMARKS_STORAGE_KEY = 'pexelImageBookmarks';

export interface BookmarkContextType {
  bookmarks: BookmarkCollection;
  folders: string[];
  addBookmark: (photo: PexelsPhoto, folder: string) => void;
  removeBookmark: (photoId: number) => void;
  isBookmarked: (photoId: number) => Bookmark | undefined;
  createFolder: (folderName: string) => void;
  // Optional: moveBookmark: (photoId: number, newFolder: string) => void;
}

// Helper to load from localStorage
const loadBookmarksFromStorage = (): BookmarkCollection => {
  try {
    const storedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (storedBookmarks) {
      const parsed = JSON.parse(storedBookmarks);
      if (typeof parsed === 'object' && parsed !== null) {
         if (Object.keys(parsed).length === 0 || !parsed[DEFAULT_FOLDER_NAME]) {
             parsed[DEFAULT_FOLDER_NAME] = [];
         }
         return parsed;
      }
    }
  } catch (error) {
    console.error("Failed to load or parse bookmarks from localStorage:", error);
  }
  return { [DEFAULT_FOLDER_NAME]: [] };
};

export const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

interface BookmarkProviderProps {
  children: ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkCollection>(loadBookmarksFromStorage);

  // Persist to localStorage whenever bookmarks change
  useEffect(() => {
    try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
        console.error("Failed to save bookmarks to localStorage:", error);
    }
  }, [bookmarks]);

  const folders = Object.keys(bookmarks).sort();

  const createFolder = useCallback((folderName: string) => {
      if (!folderName || bookmarks[folderName]) {
          console.warn(`Folder "${folderName}" already exists or name is invalid.`);
          return;
      }
      setBookmarks(prev => ({ ...prev, [folderName]: [] }));
  }, [bookmarks]);


  const addBookmark = useCallback((photo: PexelsPhoto, folder: string) => {
    // Ensure the target folder exists
    const targetFolder = folder || DEFAULT_FOLDER_NAME;
     if (!bookmarks[targetFolder]) {
        console.warn(`Target folder "${targetFolder}" not found, creating it.`);
     }

    setBookmarks(prev => {
        const newBookmark: Bookmark = { ...photo, folder: targetFolder };
        const updatedCollection = { ...prev };

         // Ensure folder array exists before pushing
         if (!updatedCollection[targetFolder]) {
             updatedCollection[targetFolder] = [];
         }

        // Avoid adding duplicates within the same folder
        if (!updatedCollection[targetFolder].some(bm => bm.id === photo.id)) {
             updatedCollection[targetFolder] = [...updatedCollection[targetFolder], newBookmark];
        } else {
            console.warn(`Photo ${photo.id} already bookmarked in folder ${targetFolder}`);
        }
        return updatedCollection;
    });
  }, [bookmarks]); 


  const removeBookmark = useCallback((photoId: number) => {
    setBookmarks(prev => {
        const updatedCollection: BookmarkCollection = {};
        Object.entries(prev).forEach(([folder, items]) => {
            updatedCollection[folder] = items.filter(item => item.id !== photoId);
        });
        return updatedCollection;
    });
  }, []); 

  const isBookmarked = useCallback((photoId: number): Bookmark | undefined => {
      for (const folder in bookmarks) {
          const found = bookmarks[folder].find(bm => bm.id === photoId);
          if (found) return found;
      }
      return undefined;
  }, [bookmarks]);


  const value = {
    bookmarks,
    folders,
    addBookmark,
    removeBookmark,
    isBookmarked,
    createFolder
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};