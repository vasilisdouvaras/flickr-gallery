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

  onImageNavigate(dir) {
    if (dir === 'forward') {
      if (this.props.images[this.state.currentImage + 1]) {
        this.setState({ currentImage: (this.state.currentImage + 1) })
      }
    }
    else {
      if (this.props.images[this.state.currentImage - 1]) {
        this.setState({ currentImage: this.state.currentImage - 1 })
      }
    }
  }

  render() {
    let galleryImages;

    if (this.state.showGallery === true) {
      let image = this.props.images[this.state.currentImage];
      galleryImages =
        <div style={{ position: 'relative' }}>
          <button type="button" onClick={() => this.onImageNavigate()} style={{ position: 'absolute', left: '0', top: '50%' }} className="btn btn-dark">{"<"}</button>
          <div className="gallery" style={{ padding: '2%' }} >
            {/* only want to display gallery if selected images exist */}
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
          <button type="button" onClick={() => this.onImageNavigate('forward')} style={{ position: 'absolute', right: '0', top: '50%' }} className="btn btn-dark">{">"}</button>
          {`Image ${this.state.currentImage + 1} out of ${this.props.images.length}`}
        </div>
    }
    else {
      galleryImages = null;
    }

    return (
      <div className="gallery-container">
        <button type="button" className="btn btn-secondary" onClick={() => this.onGalleryClicked()}> {!this.state.showGallery ? `View Gallery (${this.props.images.length})` : "Close Gallery"}</button>
        {galleryImages}
      </div>
    )
  }
}

export default Gallery;