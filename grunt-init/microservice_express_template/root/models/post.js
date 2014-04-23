module.exports = function(app) {
  var db = app.database;

  var timestamps = require('mongoose-timestamp');

  var Schema = require('mongoose').Schema;

  var Post = Schema({
      title:       { type: String, required: true }
    , description: { type: String, required: true }
  });
  Post.plugin(timestamps);

  return db.model('post', Post);
};