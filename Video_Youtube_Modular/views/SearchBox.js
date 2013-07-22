define([
  'jquery',
  'underscore',
  'backbone',
  '../collection/videos',
  'text! ../../../templates/busqueda.html'
], function($,_, Backbone, VideosCollection, busqTemplate) {
  var SearchBox = Backbone.View.extend({
  	el: $('#search-box-template'),
		events: {
			'click #search-submit': 'performSearch',
		},

		initialize: function() {
			this.template = _.template(busqTemplate)
		},

		render: function() {
			console.log('SearchBox: entering render');
			this.$el.html(this.template());
			console.log('SearchBox: leaving render');
			return this;
		},

		performSearch: function() {
			console.log('SearchBox: entering performSearch');
			queryString = this.$el.find('#search-query').val();
			this.trigger('searchRequest', {queryString:queryString});
			console.log('SearchBox: leaving performSearch');
		},
	});
  return SearchBox;
});