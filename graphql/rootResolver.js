const crypto = require('crypto');
const { db } = require('../db');

const resolvers = {
  Query: {
    users: () => {
      return db.users;
    },
  },

  Mutation: {
    async addUser(args) {
      console.log(args);
    },
    // addUser(args) {
    //   console.log(args);
    //   const { name = 'noname', email, avatarUrl = '' } = args;
    //   const newUser = {
    //     id: crypto.randomBytes(16).toString(),
    //     email,
    //     name,
    //   };
    //
    //   db.users.push(newUser);
    //   return newUser;
    // }
  }
};

module.exports = {
  resolvers,
};
