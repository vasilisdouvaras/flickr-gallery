import React, { Component } from 'react';
import { debounce } from 'lodash';

import ImageList from './components/ImageList/ImageList.js'
import Header from './components/Header/Header.js'
import Main from './components/Main/Main.js'

import './App.css';

// get API key stored in env file
const API_KEY = process.env.REACT_APP_FLICKR_API_KEY ? process.env.REACT_APP_FLICKR_API_KEY : console.error("Flickr API key missing from .env file");

/* 
  Unfortunately I couldn't get authentication to work due to not being able to figure out
  how to generate the signature, therefore I am unable to create and add images to a flickr gallery. 
  The functionality is implemented based on "local" data at the moment however I would also like
  to try explain how I would implement it if authentication was working:

  1.) Follow the steps given here: https://www.flickr.com/services/api/auth.oauth.html in order to get request tokens and signatures.
  2.) Create the gallery with the name of the search query that was entered (flickr.galleries.create).
  3.) Fetch this gallery from the api (flickr.galleries.getList) and set it to a gallery state value.
  4.) Obtain the id of the selected photo and add it to the gallery state value as well as sending it with the api (flickr.galleries.addPhoto).
  5.) Fetch the gallery and all it's images when the user click on the "View Gallery" button (flickr.galleries.getList).
*/

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: "",
      images: [],
      selectedImages: [],
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
    let selectedList = this.state.selectedImages;
    let imageList = this.state.images;
    selectedList.push(newImage)
    // remove image from image list if it's added to gallery
    for (let i = 0; i < imageList.length; i++) {
      if (imageList[i].id === newImage.id) {
        imageList.splice(i, 1)
      }
    }
    this.setState({ images: imageList })
    this.setState({ selectedImages: selectedList })
  }

  // input needs to be debounced to prevent multiple api requests
  onSearchQueryChanged = debounce((text) => {
    this.setSearchQuery(text);
  }, 50);

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