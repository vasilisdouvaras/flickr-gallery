import React, { Component } from 'react';
import Image from '../Image/Image.js'
import './ImageList.css';

class ImageList extends Component {
  render() {
    return (
      <div className="image-list">
        {this.props.images.map((image, index) =>
          <Image
            key={image.id}
            farm={image.farm}
            server={image.server}
            id={image.id}
            secret={image.secret}
            alt={image.title}
            onClick={() => {this.props.onImageSelect(image)}}
          />
        )}
      </div>
    )
  }
}

export default ImageList;