import React, { Component } from 'react';
import './Image.css';

class Image extends Component {
  onSelectImage() {
    if (this.props.onClick) {this.props.onClick(this.props)}
  }
  render() {
    return (
      <div style={{margin: '1%', width: (this.props.galleryImage ? '100%' : '18%')}} onClick={() => { this.onSelectImage()}}>
        <img className={`${this.props.galleryImage ? "" : "image"}`} src={`https://farm${this.props.farm}.staticflickr.com/${this.props.server}/${this.props.id}_${this.props.secret}.jpg`} alt={this.props.title} />
      </div>
    )
  }
}

export default Image;