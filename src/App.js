import React, { Component } from 'react';
import { debounce } from 'lodash';
import './App.css';

import Search from './components/Search/Search';
import ImageList from './components/ImageList/ImageList.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: "",
      images: []
    }
    this.onSearchQueryChanged = this.onSearchQueryChanged.bind(this);
  }

  componentDidMount() {
    this.getImages();
  }

  setSearchQuery(newSearchQuery) {
    this.getImages(newSearchQuery)
    this.setState({ searchQuery: newSearchQuery })
  }

  // input needs to be debounced to prevent multiple api requests
  onSearchQueryChanged = debounce((text) => {
    this.setSearchQuery(text);
  }, 500);

  getImages(searchQuery) {
    console.warn(searchQuery)
    let url = '';
    if (searchQuery) {
      url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b54580f369a7eeebecb2004dc429d08f&text=${searchQuery}&safe_search=1&format=json&nojsoncallback=1`
    }
    else {
      url = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=b54580f369a7eeebecb2004dc429d08f&safe_search=1&format=json&nojsoncallback=1`
    }
    fetch(url)
      .then(response => response.json())
      .then(images => {
        this.setState({ images: images.photos.photo })
      })
      .catch(e => e)
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="navbar navbar-dark bg-dark shadow-sm">
            <div className="container d-flex justify-content-between">
              <div href="#" className="navbar-brand d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2" focusable="false" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                <strong>Flickr Image Gallery</strong>
              </div>
            </div>
          </div>
        </header>
        <section className="jumbotron text-center">
          <div className="container">
            <input className="form-control" defaultValue={this.state.searchQuery} onChange={e => this.onSearchQueryChanged(e.target.value)} type="text"></input>
            <button type="button" className="btn btn-secondary btn-lg" style={{margin: "3%"}}>Search</button>
          </div>
        </section>
        
        <ImageList images={this.state.images}></ImageList>

      </div>
    );
  }
}

export default App;
