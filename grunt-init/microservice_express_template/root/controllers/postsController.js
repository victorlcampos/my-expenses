module.exports = function (app) {
  var Post = app.models.post;

  var postsController = {
    list: function(req, res) {
      Post.find({}, function(err, docs) {
        if(err) console.log(err);
        res.json(docs);
      });
    },
    details: function(req, res) {
      Post.findById(req.params.id, function(err, doc) {
        if(err) res.send(404, err);
        res.json(doc);
      });
    },
    create: function(req, res) {
      var post = new Post(req.body);
      console.log(req);
      post.save(function(err, doc) {
        if(err) res.send(500, err);
        res.json(doc);
      });
    },
    update: function(req, res) {
      var post = req.body;

      delete post._id

      Post.findOneAndUpdate({_id: req.params.id}, post, function (err, doc) {
        if(err) res.send(500, err);
        res.json(doc);
      });
    },
    destroy: function(req, res) {
      Post.findByIdAndRemove(req.params.id, function(err, doc) {
        if(err) res.send(404, err);
        res.json(doc);
      });
    }
  };

  return postsController;
}