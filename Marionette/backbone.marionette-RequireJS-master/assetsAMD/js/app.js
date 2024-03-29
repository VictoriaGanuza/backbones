// Generated by CoffeeScript 1.6.2
(function() {
  define(["backbone", "marionette", "msgbus", "bsModal"], function(Backbone, Marionette, msgBus) {
    var app,
      _this = this;
      console.log("En App");
    app = new Marionette.Application();
    app.addRegions({
      content: "#content",
      menu: "#menu",
      modal: Marionette.Region.Dialog.extend({
        el: "#modal"
      })
    });
    app.on("initialize:after", function() {
      if (!Backbone.history.started) {
        return Backbone.history.start();
      }
    });
    app.addInitializer(function() {
      msgBus.commands.execute("books:route");
      return msgBus.commands.execute("other:route");
    });
    msgBus.events.on("app:show:modal", function(view) {
      return app.modal.show(view);
    });
    msgBus.events.on("app:show", function(view) {
      return app.content.show(view);
    });
    return app;
  });

}).call(this);
