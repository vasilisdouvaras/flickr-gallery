import React, { Component } from 'react';
import { debounce } from 'lodash';
import './App.css';

import ImageList from './components/ImageList/ImageList.js'
import Header from './components/Header/Header.js'
import Main from './components/Main/Main.js'

const API_KEY = process.env.REACT_APP_FLICKR_API_KEY;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: "",
      images: [],
      selectedImages: [],
      showGallery: false,
      gallery: [],
      isAuthenticated: false,
      user: null,
      token: ''
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

  getGallery(gallery_id) {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.galleries.getList&api_key=d3575747e3a76801b4220637d7d3aa68&user_id=&format=json&nojsoncallback=1&auth_token=72157689019775923-f8e228a741152d67&api_sig=66ded9ddc362a4d9b129d70e764a1b32`)
    .then(response => response.json())
    .then(gallery => {
      this.setState({gallery: gallery.galleries.gallery})
    })
    .catch(e => console.error(e))
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
      .catch(e => console.error(e))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main galleryImages={this.state.selectedImages} searchFunction={this.onSearchQueryChanged} />
        <ImageList onImageSelect={this.onImageSelect} images={this.state.images} />
      </div>
    );
  }
}

export default App;