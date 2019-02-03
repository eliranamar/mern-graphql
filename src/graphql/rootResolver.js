// const crypto = require('crypto')
// const chalk = require('chalk')
import { UserInputError } from 'apollo-server-express'
import Joi from 'joi'

import { User } from '../models'
import { UserSignUpSchema } from '../schemas'

const resolvers = {
  Query: {
    users: async () => {
      // TODO: add auth, projection, pagination
      return User.find({})
    },

    user: async (rootObject, {id}) => {
      // TODO: add auth, projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }
      return User.findById(id)
    },

  },

  Mutation: {

    signUp: async (rootObject, args, context, info) => {

      // validation
      await Joi.validate(args, UserSignUpSchema, {abortEarly: false}) // don't stop validating at first failure

      return User.create(args)
    }
  },

  User: {},
}

module.exports = {
  resolvers,
}
