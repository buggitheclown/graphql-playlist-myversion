import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

import {Book} from './Book.js';

const getBooksQ = gql`{
  books{
    id,
    name,
    genre,
    author{
      name
    }
  }
}`

class BookList extends Component {
  render() {
    let books = (!(this.props.data.loading || this.props.data.books===undefined || this.props.data.books===null)) ? (
      <ul id="bookList">
        {this.props.data.books.map((book) =>
          <li key={book.id}><Book name={book.name} author={book.author.name} genre={book.genre}/></li>
        )}
      </ul>
    ) : (
      !this.props.data.loading ? "No books registered =(" : "Loading books..."
    )
    return (
      <div>
        {books}
      </div>
    );
  }
}

export default graphql(getBooksQ)(BookList);
