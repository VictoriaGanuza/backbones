define([
  'jquery',
  'underscore',
  'backbone',
  '../models/video',
  '../collection/videos',
  '../views/SingleVideo',
  '../views/SearchBox',
  'text! ../../../templates/listavideo.html'
], function($, _, Backbone, VideoModels, VideoCollection, SingleVideoView, BusquedaView, ListTemplate){

  var VideosApp = Backbone.View.extend({
  	el: $('#app-template'),
    template: _.template(ListTemplate),

  	initialize: function() {
  	_.bindAll(this);
    this.searchBox = new BusquedaView();
    this.searchBox.on('searchRequest', this.performSearch, this);
    this.collection = new VideoCollection();
    this.collection.on('reset', this.showVideos, this);
    this.performSearch();
  },
  render: function() {
    this.$el.html(this.template());
    this.$el.find('#video-search-box').html(this.searchBox.render().el);
    this.showVideos();
    console.log('VideosApp: leaving render');
    return this;
  },
  showVideos: function() {
    this.$el.find('#video-list-container').empty();
    var v = null;
    this.collection.each(function(item, idx) {
      console.log(item);
      v = new SingleVideoView({model:item});
      this.$el.find('#video-list-container').append(v.render().el);
    }, this);
    return this;
  },
  performSearch: function(evdata) {
    evdata = evdata || {};
    console.log('VideosApp: entering performSearch - queryString: ' + evdata.queryString);
    this.collection.fetch({data:{q:evdata.queryString}});
    console.log('VideosApp: leaving performSearch');
  },
   
  
  });

  // Returning instantiated views can be quite useful for having "state"
  return VideosApp;
});