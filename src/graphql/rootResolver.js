// const crypto = require('crypto')
// const chalk = require('chalk')
import { UserInputError } from 'apollo-server-express'
import Joi from 'joi'

import { User } from '../models'
import { signUpSchema, signInSchema } from '../schemas'
import { attemptSIgnIn, checkSignedIn, checkSignedOut, signOutUser } from '../auth'

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

      const user = await attemptSIgnIn(args.email, args.password)

      req.session.userId = user.id

      return user
    },
    signOut: async (rootObject, args, {req, res}, info) => {
      checkSignedIn(req)
      signOutUser(req, res)
    },
  },

  User: {},
}

module.exports = {
  resolvers,
}
