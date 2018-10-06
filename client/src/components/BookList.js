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
  constructor(props){
    super(props);

    this.state = ({dataFetched: false})
  }

  componentDidUpdate(){
    if (!this.state.dataFetched){
    this.setState({dataFetched: true});
    }
  }

  render() {
    let books = (this.props.data.books!==undefined) ? (
      <ul id="bookList">
        {this.props.data.books.map((book) =>
          <li key={book.id}><Book name={book.name} author={book.author.name} genre={book.genre}/></li>
        )}
      </ul>
    ) : (
      this.state.dataFetched ? "No books registered =(" : "Loading books..."
    )
    return (
      <div>
        {books}
      </div>
    );
  }
}

export default graphql(getBooksQ)(BookList);
