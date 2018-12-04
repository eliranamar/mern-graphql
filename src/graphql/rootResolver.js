const crypto = require('crypto');
const chalk = require('chalk');

const { db } = require('../../db/index');
const log = console.log;

const resolvers = {
  Query: {
    users: async () => {
      return db.users;
    },

    user: async (rootObject, { id: idToFind }) => {
      return db.users.find(({ id }) => {return id === idToFind;});
    },

  },

  Mutation: {

    signUp: async (rootObject, args, context, info) => {

    }
  },

  User: {

  },
};

module.exports = {
  resolvers,
};
