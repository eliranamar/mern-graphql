const crypto = require('crypto');
const chalk = require('chalk');

const { db } = require('../db');
const log = console.log;

const resolvers = {
  Query: {
    users: async () => {
      return db.users;
    },

    user: async (rootObject, { id: idToFind }) => {
      return db.users.find(({ id }) => {return id === idToFind;});
    },

    messages: async () => {
      return db.messages;
    },
  },

  Mutation: {
    /**
     * mutation: addUser(email: String!, name: String, avatarUrl: String): User
     * @param rootObject
     * @param args
     * @returns {Promise<{id: *, email: *, name: string, avatarUrl: string}>}
     */
    addUser: async (rootObject, args) => {

      const { name = 'noname', email, avatarUrl = '' } = args;
      const newUser = {
        id: crypto.randomBytes(16).toString('hex'),
        email,
        name,
        avatarUrl,
      };

      db.users.push(newUser);
      log(chalk.cyanBright('New user added: '), newUser);
      return newUser;
    }
  },

  User: {
    messages: async (user, args) => {
      return db.messages.filter(({ id }) => {return id === user.id;});
    },
  },
};

module.exports = {
  resolvers,
};
