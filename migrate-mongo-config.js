// migrate-mongo-config.js
const path = require('path');

module.exports = {
  mongodb: {
    url: "mongodb://localhost:27017", // Replace with your MongoDB URI
    databaseName: "education-crm",    // Replace with your database name
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  migrationsDir: path.resolve(__dirname, 'migrations'), // 👈 THIS FIXES THE ERROR
  changelogCollectionName: 'changelog',
};
