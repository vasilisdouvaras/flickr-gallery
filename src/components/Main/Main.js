import React, { Component } from 'react';

import Gallery from '../Gallery/Gallery.js'
import Search from '../Search/Search.js';


class Main extends Component {
  render() {
    return (
      <div className="jumbotron text-center" style={{margin: 0}}>
        <Search onSearchQueryChanged={this.props.searchFunction} />
        {this.props.galleryImages.length > 0 ? <Gallery images={this.props.galleryImages} /> : null}
      </div>
    )
  }
}

export default Main;