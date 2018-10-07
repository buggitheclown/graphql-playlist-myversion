import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';

import {
  getAuthorsQ,
  addBookM, getBooksQ
} from '../queries/queries.js';

class AddBook extends Component {
  constructor(props){
    super(props);

    this.state = ({book: "", genre: "", author: []})

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(){
    //Set a default option for the select element once the options have been loaded
    if (this.state.author.length===0){
      if (!this.props.getAuthorsQ.loading && this.props.getAuthorsQ.authors!==(undefined||null)){
        let author = this.props.getAuthorsQ.authors[0];
        this.setState({author: [author.name, author.id]});
      }
    }
  }

  handleInput(e){
    switch(e.target.id){
      case "bookName":
      this.setState({book: e.target.value});
      break;
      case "genre":
      this.setState({genre: e.target.value});
      break;
      case "author":
      let author = [];
      this.props.getAuthorsQ.authors.forEach(function(element){
        if (element.name===e.target.value){
          author = [element.name, element.id];
        }
      })
      this.setState({author: author});
      break;
      default:
      break;
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.addBookM({
      variables:{
        name: this.state.book,
        genre: this.state.genre,
        authorId: this.state.author[1]
      },
      refetchQueries: [{query: getBooksQ}]
    });
  }

  render(){
    let options = (!(this.props.getAuthorsQ.loading || this.props.getAuthorsQ.author===(undefined || null))) ? (
      <select id="author" onChange={this.handleInput}>
        {this.props.getAuthorsQ.authors.map((author) =>
          <option key={author.id} defaultValue={author.name===this.state.author[0]}>{author.name}</option>
        )}
      </select>
    ) : (
      !this.props.getAuthorsQ.loading ? "No authors registered =(" : "Loading authors..."
    )
    return(
      <form id="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input id="bookName" type="text" value={this.state.name} onChange={this.handleInput}/>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input id="genre" type="text" value={this.state.genre} onChange={this.handleInput}/>
        </div>
        <div className="field">
          <label>Author:</label>
          {options}
        </div>

        <button>+</button>
      </form>
    )
  }

}

export default compose(
  graphql(getAuthorsQ, {name: "getAuthorsQ"}),
  graphql(addBookM, {name: "addBookM"})
)(AddBook);
