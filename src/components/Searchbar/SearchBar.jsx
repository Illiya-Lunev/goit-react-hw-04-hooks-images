import { Component } from 'react';
import { toast } from 'react-toastify';
import s from './searchBar.module.css';

export default class SearchBar extends Component {
  state = { query: '' };

  handleNameChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
    
  };

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.query.trim() ===''){
        return   toast.error('🔥Ups,Enter image name!🔥');
    }
    this.props.onSubmit(this.state.query)
    this.setState({query:''})
  
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            value={this.state.query}
            onChange={this.handleNameChange}
            className={s.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
