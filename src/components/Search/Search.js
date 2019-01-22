import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
        <div className="container" style={{width: '40%'}}>
          <div className="input-group">
            <input className="form-control" onKeyPress={e => this.props.onSearchQueryChanged(e.target.value)} type="text"></input>
            <button type="button" className="btn btn-secondary">Search</button>
          </div>
        </div>
    )
  }
}

export default Search;