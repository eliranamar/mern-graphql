import { AuthenticationError } from 'apollo-server-express'

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