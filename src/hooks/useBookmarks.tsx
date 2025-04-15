import { useContext } from 'react';
import { BookmarkContext, BookmarkContextType } from '../contexts/BookmarkContext';

export const useBookmarks = (): BookmarkContextType => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};