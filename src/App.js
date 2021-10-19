import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import Modal from './components/Modal/Modal';
import SearchBar from './components/Searchbar/SearchBar';
import s from './components/Searchbar/searchBar.module.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { fetchImages } from './components/service/api';
import Loader from './components/Loader/Loader.jsx';
import Button from './components/Button/Button.jsx';

export default function App() {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (query.trim('') === '') {
      return;
    }
    setStatus('pending');
    setPage(1);
    setHits([]);
    getImages({ nextQuery: query, page: 1 });
  }, [query]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setStatus('pending');
    getImages({ nextQuery: query, page: page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getImages = ({ nextQuery, page }) => {
    fetchImages({ nextQuery, page })
      .then(data => {
        setStatus('resolved');
        setTotalHits(data.totalHits);

        setHits(prev => [...prev, ...data.hits]);
      })
      .then(() => {
        return window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSearchForm = query => {
    setQuery(query);
  };

  const handleSetLargeImageURL = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  if (status === 'idle') {
    return (
      <>
        <SearchBar onSubmit={handleSearchForm} />
        <ToastContainer autoClose={3000} theme={'colored'} />
        <h1 className={s.title}>Enter name image!</h1>
      </>
    );
  }

  if (status === 'pending') {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (status === 'rejected') {
    return <h2>{error.message}</h2>;
  }

  if (status === 'resolved') {
    return (
      <div className={s.App}>
        <SearchBar onSubmit={handleSearchForm} />
        <ImageGallery
          hits={hits}
          toggleModal={toggleModal}
          handleSetLargeImageURL={handleSetLargeImageURL}
        />
        {hits.length !== 0 && <Button onClick={handleLoadMore} />}
        {hits.length === 0 && (
          <h1 className={s.title}>
            No results {query} were found for your search....😭
          </h1>
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img className={s.img_Modal} src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </div>
    );
  }
}
