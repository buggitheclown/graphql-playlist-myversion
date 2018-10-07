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

const addBookM = gql`
  mutation($name: String, $genre: String, $authorId: ID){
  addBook(name: $name, genre: $genre, authorId: $authorId){
    name,
    id
  }
}`

export {getAuthorsQ, getBooksQ, addBookM};
