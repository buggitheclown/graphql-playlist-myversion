const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book.js');
const Author = require('../models/author.js');

//This grabs the GraphQLObjectType object out of the graphql package
const{
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  //fields needs to be a function in case the object has fields of different types
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    authorId: {type: GraphQLID},
    author: {
      type: AuthorType,
      resolve(parent, args){
        //return _.find(authors, {id: parent.authorId});
        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  //fields needs to be a function in case the object has fields of different types
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return _.filter(books, {authorId: parent.id});
        return Book.find({authorId: parent.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book:{
      type: BookType,
      //The id needs to be passed into the query as an argument (e.g. give me data about the book with id:1)
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        //code to get data from DB or another source
        //books is used to reference the dummy data array
        //return _.find(books, {id: args.id});
        return Book.findById(args.id);
      }
    },
    author:{
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        //return _.find(authors, {id: args.id});
        return Author.findById(args.id);
      }
    },
    authorId:{
      type: AuthorType,
      args: {name: {type: GraphQLString}},
      resolve(parent, args){
        return Author.findOne({name: args.name});
      }
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return books;
        return Book.find({});
      }
    },
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        //return authors;
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    addAuthor:{
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook:{
      type: BookType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: GraphQLString},
        authorId: {type: GraphQLID},
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
