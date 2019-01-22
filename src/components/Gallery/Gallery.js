import React, { Component } from 'react';
import Image from '../Image/Image.js'
import './Gallery.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGallery: false
    }
    this.onGalleryClicked = this.onGalleryClicked.bind(this);

  }
  onGalleryClicked() {
    this.setState({ showGallery: !this.state.showGallery })
  }

  render() {
    let galleryImages;

    if (this.state.showGallery === true) {
      galleryImages =
        this.props.images.map((image, index) =>
          <Image
            key={image.id}
            farm={image.farm}
            server={image.server}
            id={image.id}
            secret={image.secret}
            alt={image.title}
          />
        )
    }
    else {
      galleryImages = null;
    }

    return (
      <div className="gallery-container">
        <button type="button" className="btn btn-secondary btn-lg" onClick={() => this.onGalleryClicked()}> {!this.state.showGallery ? `View Gallery (${this.props.images.length})` : "Close Gallery"}</button>
        <div className="gallery" >
          {/* only want to display gallery if selected images exist */}
          {/* {this.state.showGallery === true ? <h1 onClick={() => this.onGalleryClicked()}>X</h1> : null} */}
          {galleryImages}
        </div>
      </div>

    )
  }
}

export default Gallery;