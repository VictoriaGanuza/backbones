define([
  // These are path alias that we configured in our bootstrap

  'jquery',
  'underscore',
  'backbone',
  'localStorage',
  //'marionette',
  'router'

  ], function( $, _, Backbone, LocalStorage/*, Marionette*/, Router ){

    var initialize = function(){
      Router.initialize();

    };

    return{

      initialize : initialize

    };

  });