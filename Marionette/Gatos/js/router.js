define([
'jquery',
'underscore',
'backbone',
'localStorage',
//'marionette',
'../model/AngryCat',
'../collection/AngryCats',
'../views/AngryCatsView',
/*'../collection/videos',
'../models/video'*/
], function($, _, Backbone, LocalStorage, catModel, catCollection, CatsListView){//, Marionette

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
    /*  'users/create': 'createUser',
      'users/delet/:id': 'deleteUser',
      'users/edit/:id': 'editUser',
*/
      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    try{
    var app_router = new AppRouter;
      // As above, call render on our loaded module
      // 'views/users/list'

      /*app_router.on('route:createUser', function(){
        // Call render on the module we loaded in via the dependency array
        // 'views/projects/list'
        var userCreateView = new UserCreateView();
        userCreateView.render();
      });

      app_router.on('route:editUser', function(id){
        var userEditView = new UserEditView();
        userEditView.render(id);
      });

      app_router.on('route:deleteUser', function(id){
        var usersDeleteView = new UsersDeleteView();
        usersDeleteView.render(id);
      });
*/
      app_router.on('route:defaultAction', function(actions){
        console.log("Entra al defaultAction");
        // We have no matching route, lets just log what the URL was
        console.log("en el router");
        console.log(CatsListView);

        var cats = new catCollection([
          new catModel({ name: 'Wet Cat', image_path: 'images/cat2.jpg' }),
          new catModel({ name: 'Bitey Cat', image_path: 'images/cat1.jpg' }),
          new catModel({ name: 'Surprised Cat', image_path: 'images/cat3.jpg' })
      ]);

      // Oh, we forgot this AngryCat...let's add it now!
      cats.add([new catModel({ name: 'Cranky Cat', image_path: 'images/cat4.jpg' })]);

      var catsListView = new CatsListView({ collection: cats } );
          catsListView.render();
      });
      Backbone.history.start();

  }catch(e){alert(e);}
  };

  return {
    initialize: initialize
  };

});