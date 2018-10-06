import {gql} from 'apollo-boost';

const getAuthorsQ = gql`{
  authors{
    name,
    id
  }
}`

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

export {getAuthorsQ, getBooksQ};
