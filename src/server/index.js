import path from 'path'
import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'

import { PORT, NODE_ENV, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from '../config'

(async () => {
  try {

    // if the PASSWORD includes special characters, you must use encodeURIComponent()
    const mongoUri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    const mongoOptions = {useNewUrlParser: true}
    // connect to DB asynchronously
    await mongoose.connect(mongoUri, mongoOptions)

    // create the express server
    const app = express()

    // remove from headers
    app.disable('x-powered-by')

    const typeDefs = importSchema(path.resolve(__dirname, '../graphql/schema.graphql'))
    const {resolvers} = require('../graphql/rootResolver')

// create schema
    const schema = makeExecutableSchema({typeDefs, resolvers})

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

  } catch (e) {
    console.error(e)
  }
})()
