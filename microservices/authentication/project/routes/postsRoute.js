module.exports = function(app) {
  var postsController = app.controllers.postsController;

  app.post('/posts'      , postsController.create );
  app.get('/posts'       , postsController.list   );
  app.get('/posts/:id'   , postsController.details);
  app.put('/posts/:id'   , postsController.update );
  app.delete('/posts/:id', postsController.destroy);
}