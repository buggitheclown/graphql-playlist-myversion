const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross-origin requests
app.use(cors());

//mongoose.connect('mongodb://Admin:Test123@ds123753.mlab.com:23753/grahpql-tutorial');
mongoose.connect('mongodb://localhost:27017/GQL-Tutorial');
mongoose.connection.once('open', () => {
  console.log('connected to DB');
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000,() => {
  console.log('listening to localhost:4000')
})
