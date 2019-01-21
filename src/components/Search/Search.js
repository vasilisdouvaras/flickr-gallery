import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: "",
    }
  }


  componentDidMount() {
  }

  render() {
    return (
      <div>
        Search Goes Here
        <input defaultValue={this.state.searchQuery} onChange={this.onSearchQueryChanged} type="text"></input>
        {this.state.searchQuery}
        <button>Search</button>
      </div>
    )
  }
}

export default Search;