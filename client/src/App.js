import React, { Component } from 'react';
import ApolliClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import BookList from './components/BookList.js';

//apollo setup
const client = new ApolliClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Dummy Header</h1>
        <BookList/>
      </div>
    </ApolloProvider>
    );
  }
}

export default App;
