const _ = require('lodash');
const {makeExecutableSchema} = require('graphql-tools');
//Mongo model import
const Book = require('../../models/book.js');
const Author = require('../../models/author.js');
//Modular GQL type definitions
//No need to import the AuthorType too since it is already included in the BookType, vice versa
const BookType = require('./BookType.js');

//Define table/collection types
let queryDefs = `
  type Query{
    books: [BookType]
    authors: [AuthorType]
    book(id: ID): BookType
    author(id: ID): AuthorType
  }

  type Mutation{
    addAuthor(
      name: String
      age: Int
    ): AuthorType
    addBook(
      name: String
      genre: String
      authorId: ID
    ): BookType
  }
`;

const resolvers = {
  Query: {
    books: () => Book.find({}),
    authors: () => Author.find({}),
    book: (_, {id}) => Book.findById(id),
    author: (_, {id}) => Author.findById(id)
  },
  Mutation: {
    addAuthor: (_, {name, age}) => {
      let author = new Author({
        name: name,
        age: age
      });
      return author.save();
    },
    addBook: (_, {name, genre, authorId}) => {
      let book = new Book({
        name: name,
        genre: genre,
        authorId: authorId
      });
      return book.save();
    }
  },
  BookType:{
    author: book => Author.findById(book.authorId)
  },
  AuthorType:{
    books: author => Book.find({authorId: author.id})
  }
};

const defs = [BookType,queryDefs];

const schema = makeExecutableSchema({
  typeDefs: defs,
  resolvers: resolvers
});

module.exports = schema;
