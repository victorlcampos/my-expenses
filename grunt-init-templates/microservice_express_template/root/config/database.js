module.exports = {
  "test": "mongodb://localhost/{%= name %}-test",
  "development": "mongodb://localhost/{%= name %}",
  "production": process.env.MONGOLAB_URI
};