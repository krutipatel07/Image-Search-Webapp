import { PexelsPhoto } from './pexels';
  
  export const DEFAULT_FOLDER_NAME = "Default"; 
  
  export interface Bookmark extends PexelsPhoto {
    folder: string;
  }
  
  // Structure for storing bookmarks in localStorage and context state
  // Key: Folder Name, Value: Array of Bookmarks in that folder
  export type BookmarkCollection = Record<string, Bookmark[]>;
  
