import {Route, Routes } from 'react-router-dom';
import './App.css'
import SearchPage from './pages/SearchPage'
import BookmarkPage from './pages/BookmarkPage'
import Navigation from './components/Navigation/Navigation'
import { BookmarkProvider } from './contexts/BookmarkContext';
import AppStyle from './components/AppStyle/AppStyle';
import BackToTopButton from './components/BackToTop/BackToTop';

function App() {

  return (
    <>
    <BookmarkProvider>
          <div className="app-container">
          <AppStyle/>
              <Navigation/>
              <main className="main-content">
                <Routes>
                <Route path='/' element={<SearchPage/>}/>
                <Route path='/bookmarks' element={<BookmarkPage/>}/>
                </Routes>
              </main>
              <BackToTopButton />
          </div>
    </BookmarkProvider>
    </>
  )
}

export default App
