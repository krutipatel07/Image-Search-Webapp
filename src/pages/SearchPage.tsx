import React, { useState, useCallback, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaSearch  } from 'react-icons/fa';
import { searchPexelsImages } from '../api/pexels'; //
import { PexelsPhoto } from '../types'; //
import ImageGrid from '../components/ImageGrid/ImageGrid';
import Loader from '../components/Loader/Loader';
import Modal from '../components/Modal/Modal';
import { useBookmarks } from '../hooks/useBookmarks';
import pageStyles from './PageStyles.module.css';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<PexelsPhoto | null>(null);
  const { isBookmarked } = useBookmarks(); 

  const inputRef = useRef<HTMLInputElement>(null);

  // TanStack Query for infinite scrolling
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    status, 
  } = useInfiniteQuery({
    queryKey: ['pexelsSearch', searchTerm ],
    queryFn: ({ pageParam = 1 }) =>
      searchPexelsImages({ query: searchTerm, page: pageParam, per_page: 20 }), // Fetch 20 per page
    getNextPageParam: (lastPage) => {
      if (!lastPage.photos || lastPage.photos.length === 0) return undefined;
       const currentPage = lastPage.page;
       const totalPages = Math.ceil(lastPage.total_results / lastPage.per_page);
       return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 10, 
  });

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent form submission reload
    if (inputRef.current) {
      setSearchTerm(inputRef.current.value);
      console.log(inputRef.current.value)
    }
    
  };

  const allPhotos = data?.pages.flatMap(page => page.photos) ?? [];

  const handleImageClick = useCallback((photo: PexelsPhoto) => {
    setSelectedPhoto(photo);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPhoto(null);
  }, []);


  return (
    <div className={pageStyles.pageContainer}>
      <div className={pageStyles.contentSection}>
        <div className={pageStyles.content}>
          <h1>Search And Bookmark Images Within A Second</h1>
          <div className={pageStyles.searchBar}>
            <FaSearch className={pageStyles.searchIcon}/>
            <form className={pageStyles.formInput} onSubmit={(e)=>{handleSubmit(e)}}>
            <input
              type="text"
              placeholder="Search Images"
              ref={inputRef}
              // value={searchTerm}
              // onChange={handleSearchChange}
              className={pageStyles.searchInput}
            />
            <button type='submit' className={pageStyles.searchButton}>Search</button>
            </form>
          </div>
        </div>
      </div>
      <div className={pageStyles.imageGallary}>

      {status === 'pending' && searchTerm && <Loader message="Searching..." />}
      {status === 'error' && <p className={pageStyles.errorMessage}>Error: {error.message}</p>}
      {status === 'success' && !allPhotos.length && searchTerm && (
        <p className={pageStyles.noResultsMessage}>No results found for "{searchTerm}".</p>
      )}

      {!searchTerm && status !== 'pending' && (
          <p className={pageStyles.promptMessage}>Enter a search term to find images.</p>
      )}

     {/* Infinite Scroll Container */}
      {!!searchTerm && (
        <InfiniteScroll
            dataLength={allPhotos.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<Loader message="Loading more..." />}
            endMessage={
                <p className={pageStyles.endOfResultsMessage}>
                    {allPhotos.length > 0 ? "You've seen all results!" : ""}
                </p>
            }
            style={{ overflow: 'visible' }}
        >
            <ImageGrid photos={allPhotos} onImageClick={handleImageClick} />
        </InfiniteScroll>
      )}

      {selectedPhoto && (
        <Modal
          photo={selectedPhoto}
          onClose={handleCloseModal}
          bookmarkInfo={isBookmarked(selectedPhoto.id)}
        />
      )}
      </div>
    </div>
  );
}

export default SearchPage;