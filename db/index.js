const db = {
  users:    [
    { id: '1', email: 'alex@gmail.com', name: 'Alex', avatarUrl: 'https://gravatar.com/' },
    { id: '2', email: 'max@gmail.com', name: 'Max', avatarUrl: 'https://gravatar.com/' },
  ],
  messages: [
    { id: '1', userId: '1', body: 'Hello World', createdAt: Date.now() },
    { id: '2', userId: '2', body: 'Hi World', createdAt: Date.now() },
    { id: '3', userId: '1', body: 'Hello Again', createdAt: Date.now() },
  ],
};


module.exports = {
  db,
};
