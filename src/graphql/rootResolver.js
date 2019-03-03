// const crypto = require('crypto')
// const chalk = require('chalk')
import { UserInputError } from 'apollo-server-express'
import Joi from 'joi'

import { User } from '../models'
import { signUpSchema, signInSchema } from '../schemas'
import { checkSignedIn, checkSignedOut } from '../auth'

const resolvers = {
  Query: {
    me:    async (rootObject, args, {req}, info) => {
      // TODO: add auth, projection, pagination

      checkSignedIn(req)

      return User.findById(req.session.userId)
    },
    users: async (rootObject, args, {req}, info) => {
      // TODO: add auth, projection, pagination

      checkSignedIn(req)

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

    signUp:  async (rootObject, args, {req}, info) => {

      checkSignedOut(req)
      // validation
      await Joi.validate(args, signUpSchema, {abortEarly: false}) // don't stop validating at first failure

      return User.create(args)
    },
    signIn:  async (rootObject, args, {req}, info) => {
      const {userId} = req.session
      if (userId) {
        return User.findById(userId)
      }
      await Joi.validate(args, signInSchema, {abortEarly: false}) // don't stop validating at first failure

      return User.create(args)
    },
    signOut: async (rootObject, args, {req}, info) => {
      const {userId} = req.session
      if (userId) {
        return User.findById(userId)
      }
      return User.create(args)
    },
  },

  User: {},
}

module.exports = {
  resolvers,
}
