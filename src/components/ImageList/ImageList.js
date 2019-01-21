import React, { Component } from 'react';

import Image from '../Image/Image.js'

class ImageList extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start' }}>
        {this.props.images.map((image, index) =>
          <Image
            key={image.id}
            farm={image.farm}
            server={image.server}
            id={image.id}
            secret={image.secret}
            alt={image.title}
          />
        )}
      </div>
    )
  }
}

export default ImageList;