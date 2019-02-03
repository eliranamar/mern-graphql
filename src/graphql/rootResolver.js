// const crypto = require('crypto')
// const chalk = require('chalk')
import { UserInputError } from 'apollo-server-express'

import { db } from '../../db/index'
import { User } from '../models'

const resolvers = {
  Query: {
    users: async () => {
      // TODO: add auth, projection, pagination
      return User.find({})
    },

    user: async (rootObject, {id: userId}) => {
      // TODO: add auth, projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError(`${userId} is not a valid user ID.`)
      }
      return User.findById(userId)
    },

  },

  Mutation: {

    signUp: async (rootObject, args, context, info) => {

      // validation
      const password = args.password;

      return User.create(args)
    }
  },

  User: {},
}

module.exports = {
  resolvers,
}
