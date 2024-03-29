define([
  'jquery',
  'underscore',
  'backbone',
  '../model/AngryCat',
  '../collection/AngryCats',
  'text! ../../../templates/AngryCat.html'
], function($, _, Backbone, CatModels, CatCollection, catTemplate){
 
    var AngryCatView = Backbone.View.extend({
    	    	
	// This is responsible for automatically updating the UI 
	// in response to changes in the model
	initialize: function() {
            this.model.on('change', this.render, this);
	},

	tagName: 'tr',

	className: 'angry_cat',

	render: function() {
		var variables = {
			id:         this.model.cid,
		    rank:       this.model.get('rank'),
		    name:       this.model.get('name'),
		    image_path: this.model.get('image_path')
		};

		var compilerTemplate = _.template(catTemplate, variables)
        
        this.$el.html(compilerTemplate);
        return this;
	}
    });
return AngryCatView;
});