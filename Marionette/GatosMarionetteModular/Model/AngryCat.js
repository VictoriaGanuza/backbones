define([
  'underscore',
  'backbone',
  'localStorage',
  // Pull in the Model module from above
 
 ], function(_, Backbone, LocalStorage){
	
	var AngryCat = Backbone.Model.extend({
	defaults: {
            rank: 0,
	    move: ''
	},

	rank_up: function() { this.set('move', 'up') },
	rank_down: function() { this.set('move', 'down') }
    });

    return AngryCat;

});