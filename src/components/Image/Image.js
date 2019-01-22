import React, { Component } from 'react';
import './Image.css';

class Image extends Component {
  onSelectImage() {
    if (this.props.onClick) {this.props.onClick(this.props)}
  }
  render() {
    return (
      // if its a gallery image we want to have it be displayed in the center of the gallery div
      <div style={{margin: '1%', width: (this.props.galleryImage ? '100%' : '18%')}} onClick={() => { this.onSelectImage()}}>
      {/* We also need to remove the image class as we no longer need the hover effect */}
        <img className={`${this.props.galleryImage ? "" : "image"}`} src={`https://farm${this.props.farm}.staticflickr.com/${this.props.server}/${this.props.id}_${this.props.secret}.jpg`} alt={this.props.title} />
      </div>
    )
  }
}

export default Image;