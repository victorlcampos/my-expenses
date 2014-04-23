module.exports = function(app) {
  var subjectsController = app.controllers.subjectsController;

  app.post('/posts'      , postsController.create );
  app.get('/posts'       , postsController.list   );
  app.get('/posts/:id'   , postsController.details);
  app.put('/posts/:id'   , postsController.update );
  app.delete('/posts/:id', postsController.destroy);
}