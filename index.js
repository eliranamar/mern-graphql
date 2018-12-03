const express = require('express');
const graphqlHTTP = require('express-graphql');
// const { buildSchema } = require('graphql');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');

const db = {
  users: [
    { id: '1', email: 'alex@gmail.com', name: 'Alex', avatarUrl: 'https://gravatar.com/' },
    { id: '2', email: 'max@gmail.com', name: 'Max', avatarUrl: 'https://gravatar.com/' },
  ]
};

const typeDefs = importSchema('./graphql/schema.graphql');
const { resolvers } = require('./graphql/rootResolver');

const schema = makeExecutableSchema({ typeDefs, resolvers });


// const schema = buildSchema(`
//   type Query {
//     users: [User!]!
//   }
//
//   type User {
//     id: ID!
//     email: String!
//     name: String
//     avatarUrl: String
//   }
// `);
//


const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(3000, () => {console.log('Running on port 3000');});