import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

// we can pass a config obj as argument to set the type with options
const userSchema = new mongoose.Schema({
  email:    String,
  username: String,
  name:     String,
  password: String,
}, {
  timestamps: true,
})

// create a pre save hook
userSchema.pre('save', async function (next) { // takes a regular function callback (to access 'this' key)

  // if the password has been modified
  if (this.isModified('password')) {

    try {
      // assign the salted and hashed password, with salt length of 10
      this.password = await hash(this.password, 10) // this, is the User model called === args.password
    } catch (e) {
      next(e)
    }
  } 
  next()
})

export default mongoose.model('User', userSchema)