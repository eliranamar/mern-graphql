const express = require('express');
const graphqlHTTP = require('express-graphql');
// const { buildSchema } = require('graphql');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');


const typeDefs = importSchema('./graphql/schema.graphql');
const { resolvers } = require('./graphql/rootResolver');

// create schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// create the express server
const app = express();
const port = process.env.PORT || 3000;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // show the GraphiQL interface
}));

// start the server
app.listen(port, () => {console.log('Running on port 3000');});
