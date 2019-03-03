import Joi from 'joi'

const email = Joi.string().email().required().label('Email')

const username = Joi.string().alphanum().min(3).max(30).required().label('Username')

const name = Joi.string().alphanum().max(255).required().label('Name')

const password = Joi.string()
  .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,32}$/)
  .label('Password')
  .options({
    language: {
      string: {
        regex: { // provide custom error message
          base: 'Must have 1 lower case letter, 1 upper case letter, 1 number and 1 special character.'
        }
      }
    }
  });

export const signUpSchema = Joi.object().keys({
  email,
  username,
  name,
  password,
})

export const signInSchema = Joi.object().keys({
  email,
  password,
})
