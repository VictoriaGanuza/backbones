// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["marionette", "apps/book/list/controller", "msgbus", "entities/book"], function(Marionette, Controller, msgBus) {
    var API, Router, books, defaultTerm, _ref;

    msgBus.events.on("search:term", function(searchTerm) {
      return Backbone.history.navigate("search/" + searchTerm);
    });
    defaultTerm = "West Highland Terrier";
    books = msgBus.reqres.request("book:entities");
    Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        _ref = Router.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Router.prototype.appRoutes = {
        "": "defaultSearch",
        "search/:searchTerm": "search"
      };

      return Router;

    })(Marionette.AppRouter);
    msgBus.events.on("list:book:clicked", function(book) {
      return API.showBookDetail(book);
    });
    msgBus.commands.setHandler("books:route", function() {
      return new Router({
        controller: API
      });
    });
    return API = {
      search: function(searchTerm) {
        Controller.listBooks(books);
        return msgBus.events.trigger("search:term", searchTerm);
      },
      defaultSearch: function() {
        return API.search(books.previousSearch || defaultTerm);
      },
      showBookDetail: function(book) {
        return Controller.showBookDetail(book);
      }
    };
  });

}).call(this);
