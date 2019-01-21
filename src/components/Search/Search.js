import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div className="jumbotron text-center">
        <div className="container">
          <input className="form-control"  onChange={e => this.props.onSearchQueryChanged(e.target.value)} type="text"></input>
          <button type="button" className="btn btn-secondary btn-lg" style={{marginRight: '1%', marginTop: "3%"}}>Search</button>
        </div>
      </div>
    )
  }
}

export default Search;