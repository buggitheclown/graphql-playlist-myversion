module.exports = () => [AuthorType, BookType];


const BookType = require('./BookType.js');

const AuthorType=`
  type AuthorType{
    id: ID
    name: String
    age: Int
    books: [BookType]
  }
`;
