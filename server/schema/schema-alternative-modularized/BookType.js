module.exports = () => [BookType, AuthorType];

const AuthorType = require('./AuthorType.js');

const BookType=`
  type BookType{
    id: ID
    name: String
    genre: String
    authorId: ID
    author: AuthorType
  }
`;
