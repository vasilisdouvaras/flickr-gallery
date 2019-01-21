import React, { Component } from 'react';
import Image from '../Image/Image.js'
import './Gallery.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGallery: true
    }
  }
  render() {
    let gallery;

    if (this.state.showGallery === true) {
      gallery = this.props.images.map((image, index) =>
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
      gallery = null;
    }

    return (
      <div className="gallery">
        {/* only want to display gallery if selected images exist */}
        {this.props.images.length > 0 ? <button type="button" className="btn btn-secondary btn-lg" onClick={() => {this.setState({showGallery: true})}}>Gallery</button> : null}
        {gallery}
      </div>
    )
  }
}

export default Gallery;