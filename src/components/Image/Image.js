import React, { Component } from 'react';
import './Image.css';

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  onSelectImage() {
    if (this.props.onClick) {this.props.onClick(this.props)}
  }
  render() {
    return (
      <div className="image-container shadow-sm image-enlarged" onClick={() => { this.onSelectImage()}}>
        <img className="image" src={`https://farm${this.props.farm}.staticflickr.com/${this.props.server}/${this.props.id}_${this.props.secret}.jpg`} alt={this.props.title} />
      </div>
    )
  }
}

export default Image;