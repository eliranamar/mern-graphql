const resolvers = {
  Query: {
    users: () => {
      return db.users;
    },
  },
};

module.exports = {
  resolvers,
};
