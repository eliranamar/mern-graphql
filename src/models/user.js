import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

// we can pass a config obj as argument to set the type with options
const userSchema = new mongoose.Schema({
  email:    {
    type:     String,
    validate: {
      validator: (email) => {
        // ensure unique email in db
        return User.ensureUnique({email})
      },
      message:   ({value}) => { return `Email ${value} has already been taken` }, // TODO add security
    }
  },
  username: {
    type:     String,
    validate: {
      validator: (username) => {
        // ensure unique username in db
        return User.ensureUnique({username})
      },
      message:   ({value}) => { return `Username ${value} has already been taken` }, // TODO add security
    }
  },
  name:     String,
  password: String,
}, {
  timestamps: true,
})

// create a pre save hook
userSchema.pre('save', async function () { // takes a regular function callback (to access 'this' key)

  // if the password has been modified. 'this' is the User instance
  if (this.isModified('password')) {
    // assign the salted and hashed password, with salt length of 10
    this.password = await hash(this.password, 10) // this, is the User model called === args.password
  }
})

/**
 * ensures unique fields in DB
 * @param options {Object}
 * @returns {Promise<boolean>}
 */
userSchema.statics.ensureUnique = async function (options) {
  return await this.where(options).countDocuments() === 0
}

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

// create a closure so we can access the User model in the validator functions
const User = mongoose.model('User', userSchema)

export default User