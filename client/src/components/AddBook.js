import React, { Component } from 'react';
import {graphql} from 'react-apollo';

import {getAuthorsQ} from '../queries/queries.js';

class AddBook extends Component {
  render(){
    let options = (!(this.props.data.loading || this.props.data.authors===undefined || this.props.data.authors===null)) ? (
      <select>
        {this.props.data.authors.map((author) =>
          <option key={author.id}>{author.name}</option>
        )}
      </select>
    ) : (
      !this.props.data.loading ? "No authors registered =(" : "Loading authors..."
    )
    console.log(options);
    return(
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text"/>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text"/>
        </div>
        <div className="field">
          <label>Author:</label>
          {options}
        </div>
      </form>
    )
  }

}

export default graphql(getAuthorsQ)(AddBook);
