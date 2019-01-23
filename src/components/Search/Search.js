import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ""
    }
  }
  render() {
    return (
      <div className="container" style={{ width: '40%', padding: '2%'}}>
        <div className="input-group">
          {/* When value is changed we want to change state as well so that 
              when search is clicked we use the same value as the input.
              We also need to listen to the enter keypress event so that 
              the user can submit on enter.*/}
          <input className="form-control" onChange={ev => this.setState({ searchQuery: ev.target.value })} onKeyPress={e => e.key === "Enter" ? this.props.onSearchQueryChanged(e.target.value) : null} type="text"></input>
          <button type="button" onClick={() => this.props.onSearchQueryChanged(this.state.searchQuery)} className="btn btn-secondary">Search</button>
        </div>
      </div>
    )
  }
}

export default Search;