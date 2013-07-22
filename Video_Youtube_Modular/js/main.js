

require.config({

  urlArgs: 'bust=' + (new Date()).getTime(), // Cache busting, for development purposes

  paths: {

/*----------------- Libs --------------------*/

      jquery : 'lib/jquery-1.8.0.min',
      json: 'lib/json2',
      underscore : 'lib/underscore-min',
      backbone : 'lib/backbone',
      localStorage: 'lib/backbone.localStorage',
//      marionette: 'libs/backbone/backbone.marionette',
    //  marionette: 'lib/marionette/backbone.marionette.min',

/*----------------- Libs --------------------*/

/*----------------- Views --------------------*/

      SearchView : '../views/SearchBox',
      SingleVideoView : '../views/SingleVideo',
      VideoAppView : '../views/VideoApp',
      //ViewsUserList : 'views/users/list',

/*----------------- Views --------------------*/

/*----------------- Models --------------------*/

      VideoModel : 'models/video',

/*----------------- Models --------------------*/

/*----------------- Collections --------------------*/

      VideoCollection : 'collections/videos'

/*----------------- Collections --------------------*/

  },

  shim: {
    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    localStorage: {
      deps: ['backbone'],
      exports: 'localStorage'
    },
    marionette:{
      deps: ['backbone'],
      exports: 'Marionette'
    }
  },

  priority: [ 'jquery', 'backbone', 'localStorage' ]

});

require([

  // Load our app module and pass it to our definition function
  'app'
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});