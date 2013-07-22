define([
  'underscore',
  'backbone',
  'localStorage',
  // Pull in the Model module from above
 '../model/AngryCat'
], function(_, Backbone, LocalStorage, CatModel){

	var AngryCats = Backbone.Collection.extend({
	model: CatModel,

	initialize: function(cats) {
            _.each(cats, function(cat) {
		// This is the *same* line of code as is in set_rank. How do I call that here?
		cat.set('rank', _.max(cats, function(cat) { return cat.get('rank') }).get('rank') + 1);
            });

            // If we are added via the 'add' method:
            this.on('add', this.set_rank);
	    this.sort();
	},

	comparator: function(cat) {
	    return cat.get('rank');
	},

	trade_rank: function(move_cat, direction) {
	    var old_rank = move_cat.get('rank');
	    var new_rank = '';
	    (direction == 'up') ? new_rank = old_rank - 1 : new_rank = old_rank + 1;
	    var push_cat = _.find(this.models, function(cat) { return cat.get('rank') == new_rank });

	    if (new_rank < 1 || new_rank > this.models.length) {
		return;
	    }

	    move_cat.set('rank', new_rank);
	    push_cat.set('rank', old_rank);
	    this.sort();
	},

	set_rank: function(cat) {
            cat.set('rank', _.max(this.models, function(cat) { return cat.get('rank') }).get('rank') + 1);
	}
    });

return AngryCats;
});