import path from 'path'
import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'

// create the express server
const app = express()

// remove from headers
app.disable('x-powered-by')

const typeDefs = importSchema(path.resolve(__dirname, '../graphql/schema.graphql'))
const {resolvers} = require('../graphql/rootResolver')

// create schema
const schema = makeExecutableSchema({typeDefs, resolvers})

import { PORT, NODE_ENV } from '../config'

const isProduction = NODE_ENV === 'production'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !isProduction,
})

server.applyMiddleware({app})

app.listen({port: PORT}, () => {
  console.log(`🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})