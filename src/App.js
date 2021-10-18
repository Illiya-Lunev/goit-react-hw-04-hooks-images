import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import Modal from './components/Modal/Modal';
import SearchBar from './components/Searchbar/SearchBar';
import s from './components/Searchbar/searchBar.module.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { fetchImages } from './components/service/api';
import Loader from './components/Loader/Loader.jsx';
import Button from './components/Button/Button.jsx';

export default class App extends Component {
  state = {
    query: '',
    hits: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    largeImageURL: '',
    tags: '',
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const page = this.state.page;

    if (nextQuery !== prevQuery) {
      this.setState({ status: 'pending' });
      this.setState({ page: 1, hits: [] });
      this.getImages({ nextQuery: nextQuery, page: 1 });
    }

    if (page !== prevState.page && page !== 1) {
      this.setState({ status: 'pending' });
      this.getImages({ nextQuery: nextQuery, page: page });
    }
  }

  getImages = ({ nextQuery, page }) => {
    fetchImages({ nextQuery, page })
      .then(data => {
     
        this.setState({ status: 'resolved', totalHits: data.totalHits });

        this.setState(prevState => ({
          hits: [...prevState.hits, ...data.hits],
        }));
      }).then(() => {
        return window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }).catch(error => this.setState({ error, status: 'rejected' }))
      
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSearchForm =  query => {
    this.setState({  query });
  };

  handleSetLargeImageURL = ({ largeImageURL, tags }) => {
    this.setState({ largeImageURL, tags });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const {
      status,
      error,
      hits,
      query,
      showModal,
      largeImageURL,
      tags,
    } = this.state;

    if (status === 'idle') {
      return (
        <>
          <SearchBar onSubmit={this.handleSearchForm} />
          <ToastContainer autoClose={3000} theme={'colored'} />
          <div className={s.title}>Enter name image!</div>
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
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <div className={s.App}>
          <SearchBar onSubmit={this.handleSearchForm} />
          <ImageGallery
            hits={hits}
            toggleModal={this.toggleModal}
            handleSetLargeImageURL={this.handleSetLargeImageURL}
          />
          {hits.length  !== 0 && (
            <Button onClick={this.handleLoadMore} />
          )}
          {hits.length === 0 && <h1 className={s.title}>No results { query} were found for your search....😭</h1>}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img className={s.img_Modal} src={largeImageURL} alt={tags} />
            </Modal>
          )}
        </div>
      );
    }
  }
}
