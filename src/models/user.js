import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

// we can pass a config obj as argument to set the type with options
const userSchema = new mongoose.Schema({
  email:    {
    type:     String,
    validate: {
      validator: async (email) => {
        return await User.where({email}).countDocuments() === 0
      },
      message: ({value}) => { return `Email ${value} has already been taken` }, // TODO add security
    }
  },
  username: String,
  name:     String,
  password: String,
}, {
  timestamps: true,
})

// create a pre save hook
userSchema.pre('save', async function () { // takes a regular function callback (to access 'this' key)

  // if the password has been modified
  if (this.isModified('password')) {
    // assign the salted and hashed password, with salt length of 10
    this.password = await hash(this.password, 10) // this, is the User model called === args.password
  }
})

// create a closure so we can access the User model in the validator functions
const User = mongoose.model('User', userSchema)

export default User