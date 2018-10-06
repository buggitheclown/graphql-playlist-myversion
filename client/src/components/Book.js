import React, { Component } from 'react';

class Book extends Component {
  render() {
    return (
      <span className="book">
        <h1>{this.props.name}</h1>
        <h2>{"By "+this.props.author}</h2>
        <p>{"Genre: "+this.props.genre}</p>
      </span>
    );
  }
}

export {Book};
