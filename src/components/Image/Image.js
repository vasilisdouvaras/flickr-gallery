import React, { Component } from 'react';

class Image extends Component {
  render() {
    return (
      <div className="shadow-sm" style={{margin: '1%', width: '23%'}}>
        <img src={`https://farm${this.props.farm}.staticflickr.com/${this.props.server}/${this.props.id}_${this.props.secret}.jpg`} alt={this.props.title} 
        style={{objectFit: 'cover', width: '100%', maxHeight: '100%', height: '200px'}} />
      </div>
    )
  }
}

export default Image;