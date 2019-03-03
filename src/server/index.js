import path from 'path'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import mongoose from 'mongoose'
import { importSchema } from 'graphql-import'

import {
  PORT,
  NODE_ENV,
  SESSION_NAME,
  SESSION_LIFETIME,
  SESSION_SECRET,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
} from '../config'

(async () => {
  try {

    // if the PASSWORD includes special characters, you must use encodeURIComponent()
    const mongoUri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    const mongoOptions = {useNewUrlParser: true}
    // connect to DB asynchronously
    await mongoose.connect(mongoUri, mongoOptions)

    // create the express server
    const app = express()

    const isProduction = NODE_ENV === 'production'

    // remove from headers
    app.disable('x-powered-by')

    const RedisStore = connectRedis(session)

    const store = new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
      pass: REDIS_PASSWORD,
    })

    app.use(session({
      store,
      name:              SESSION_NAME,
      secret:            SESSION_SECRET,
      resave:            false,
      saveUninitialized: false,
      cookie:            {
        maxAge:   SESSION_LIFETIME,
        sameSite: true,
        secure:   isProduction,
      }
    }))

    const typeDefs = importSchema(path.resolve(__dirname, '../graphql/schema.graphql'))
    const {resolvers} = require('../graphql/rootResolver')

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !isProduction,
      context:    ({req, res}) => {return {req, res}}
    })

    server.applyMiddleware({app})

    app.listen({port: PORT}, () => {
      console.log(`🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    })

  } catch (e) {
    console.error(e)
  }
})()
