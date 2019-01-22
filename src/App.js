import React, { Component } from 'react';
import { debounce } from 'lodash';
import './App.css';

import Search from './components/Search/Search';
import ImageList from './components/ImageList/ImageList.js'
import Gallery from './components/Gallery/Gallery.js'
import Header from './components/Header/Header.js'

const API_KEY = process.env.REACT_APP_FLICKR_API_KEY;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: "",
      images: [],
      selectedImages: [],
      showGallery: false
    }
    this.onSearchQueryChanged = this.onSearchQueryChanged.bind(this);
    this.onImageSelect = this.onImageSelect.bind(this);
  }

  componentDidMount() {
    this.getImages();
  }

  setSearchQuery(newSearchQuery) {
    this.getImages(newSearchQuery)
    this.setState({ searchQuery: newSearchQuery })
  }

  // add selected image to list
  onImageSelect(newImage) {
    let list = this.state.selectedImages;
    list.push(newImage)
    this.setState({selectedImages: list})
  }

  // input needs to be debounced to prevent multiple api requests
  onSearchQueryChanged = debounce((text) => {
    this.setSearchQuery(text);
  }, 500);

  getImages(searchQuery) {
    // if search query doesn't exist we default to some interesting photos
    let url = '';
    if (searchQuery) {
      url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${searchQuery}&safe_search=1&format=json&nojsoncallback=1`
    }
    else {
      url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1`
    }
    
    fetch(url)
      .then(response => response.json())
      .then(images => {
        this.setState({ images: images.photos.photo })
      })
      .catch(e => console.warn(e))
  }

  getUser() {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.test.login&api_key=${API_KEY}&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(user => {
      console.warn(user);
    })
    .catch(e => e)
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Search onSearchQueryChanged={this.onSearchQueryChanged} />
        {this.state.selectedImages.length > 0 ? <Gallery images={this.state.selectedImages} /> : null}
        {this.state.images.length > 0 ? <ImageList onImageSelect={this.onImageSelect} images={this.state.images} /> : <h1>No Images found :(</h1>}
      </div>
    );
  }
}

export default App;