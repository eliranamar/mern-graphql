import { AuthenticationError } from 'apollo-server-express'

import { User } from './models'
import { SESSION_NAME } from './config'

export const attemptSIgnIn = async (email, password) => {

  // generic error message
  const msg = 'Incorrect email or password.'

  // Get the user from DB
  const user = await User.findOne({email})
  if (!user) {
    throw new AuthenticationError(msg)
  }

  // Validate password
  if (!await user.matchesPassword(password)) {
    throw new AuthenticationError(msg)
  }

  return user
}

const signedIn = (req) => { return !!req.session.userId }

export const checkSignedIn = (req) => {
  if (!signedIn(req)) {
    throw new AuthenticationError('Must be signed in')
  }
}

export const checkSignedOut = (req) => {
  if (signedIn(req)) {
    throw new AuthenticationError('Already signed in')
  }
}

export const signOutUser = (req, res) => {
  return new Promise((resolve, reject) => {

    req.session.destroy((err) => {
      if (err) {
        reject(err)
      }
      res.clearCookie(SESSION_NAME)

      resolve(true)
    })

  })
}