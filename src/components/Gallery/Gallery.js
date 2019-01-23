import React, { Component } from 'react';
import Image from '../Image/Image.js'
import './Gallery.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGallery: false,
      currentImage: 0
    }
    this.onGalleryClicked = this.onGalleryClicked.bind(this);
    this.onImageNavigate = this.onImageNavigate.bind(this);
  }

  onGalleryClicked() {
    this.setState({ showGallery: !this.state.showGallery })
  }

  onImageNavigate(amount) {
    // check if we want to go to beginning or the end
    if (amount < -1 || amount === 0) {
      if (this.props.images[amount]) {
        this.setState({ currentImage: amount })
      }
    }
    // else we just navigate one by one
    else {
      if (this.props.images[this.state.currentImage + amount]) {
        this.setState({ currentImage: this.state.currentImage + amount })
      }
    }
  }

  render() {
    let galleryImages;

    if (this.state.showGallery === true) {
      let image = this.props.images[this.state.currentImage];
      galleryImages =
        <div style={{position: 'relative' }}>
          <button type="button" onClick={() => this.onImageNavigate(0)} style={{ left: '0' }} className="btn btn-dark btn-gallery">{"<<"}</button>
          <button type="button" onClick={() => this.onImageNavigate(-1)} style={{ left: '6%' }} className="btn btn-dark btn-gallery">{"<"}</button>
          <div className="p2" >
            <Image
              key={image.id}
              farm={image.farm}
              server={image.server}
              id={image.id}
              secret={image.secret}
              alt={image.title}
              galleryImage={true}
            />
          </div>
          <button type="button" onClick={() => this.onImageNavigate(1)} style={{ right: '6%' }} className="btn btn-dark btn-gallery">{">"}</button>
          <button type="button" onClick={() => this.onImageNavigate(this.props.images.length - 1)} style={{ right: '0' }} className="btn btn-dark btn-gallery">{">>"}</button>
          {`Image ${this.state.currentImage + 1} out of ${this.props.images.length}`}
        </div>
    }
    else {
      galleryImages = null;
    }

    return (
      <div className="shadow-sm p-5 bg-light">
        <button type="button" className="btn btn-secondary" onClick={() => this.onGalleryClicked()}> {!this.state.showGallery ? `View Gallery (${this.props.images.length})` : "Close Gallery"}</button>
        {galleryImages}
      </div>
    )
  }
}

export default Gallery;