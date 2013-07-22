define([
  'underscore',
  'backbone',
  'localStorage',
  // Pull in the Model module from above
 '../models/video'
], function(_, Backbone, LocalStorage, VideoModel){

    var Videos = Backbone.Collection.extend({
		model: VideoModel,
		url: 'http://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&max-results=9',
		parse: function(resp) {
			console.log('VideosCollection: Received server reponse and parsing data');
			return resp.data.items;
		},
	});

	return Videos;
});