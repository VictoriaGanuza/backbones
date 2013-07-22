define([
  'jquery',
  'underscore',
  'backbone',
  '../models/video',
  '../collection/videos',
  'text! ../../../templates/singlevideo.html'
], function($,_, Backbone, VideoModel, VideoCollection, singlevideoTemplate) {
   
    var SingleVideo = Backbone.View.extend({
		className: 'video',
		initialize: function() {
			this.template = _.template(singlevideoTemplate);
		},
		render: function() {
			console.log('SingleVideo: entering render');
			this.$el.html(this.template({video: this.model.toJSON()}));
			console.log('SingleVideo: leaving render');
			return this;
		},
	});
	return SingleVideo;

});