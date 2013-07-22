define([
  'jquery',
  'underscore',
  'backbone',
  '../model/AngryCat',
  '../collection/AngryCats',
  '../views/AngryCatView',
  'text! ../../../templates/AngryCats.html'
], function($, _, Backbone, CatModels, CatsCollection, SingleCatView, ListTemplate){

   var AngryCatsView = Backbone.View.extend({

	el: $("table#angry_cats"),
	template: _.template(ListTemplate),

	events: {
	    'click img.rank_up': 'rank_up',
	    'click img.rank_down': 'rank_down'
	},

	rank_up: function(event) {
	    this.collection.trade_rank(this.find_move_cat(event, 'up'), 'up');
	    this.render();
	},

	rank_down: function(event) {
	    this.collection.trade_rank(this.find_move_cat(event, 'down'), 'down');
	    this.render();
	},

	find_move_cat: function(event, direction) {
	    var classes = $(event.currentTarget).attr('class').split(' ');
	    var cid = _.find(classes, function(c) { return c != ('rank_' + direction) });
	    return this.collection.find(function(cat) { return cat.cid == cid });
	},

	// Show it!
	render: function() {
		console.log("en el render de Lista de gatos");
	    var header = this.$el.find("tr.header").clone();
	    console.log(this.template());
	    console.log("header");
	    console.log(header);
	    $("table#angry_cats > tbody:last").html('').append(header);

	    console.log('this.collection');
	    console.log(CatsCollection);

	    this.collection.sort();
	    this.collection.each(function(cat) {
		var catView = new SingleCatView({model: cat});
		$("table#angry_cats > tbody:last").append(catView.render().el);
	    });
	}
    });

return AngryCatsView;
});