// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["backbone", "msgbus"], function(Backbone, msgbus) {
    var API, Book, BookCollection, _ref, _ref1;

    Book = (function(_super) {
      __extends(Book, _super);

      function Book() {
        _ref = Book.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return Book;

    })(Backbone.Model);
    BookCollection = (function(_super) {
      __extends(BookCollection, _super);

      function BookCollection() {
        _ref1 = BookCollection.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      BookCollection.prototype.model = Book;

      BookCollection.prototype.initialize = function() {
        var _this = this;

        msgbus.events.on("search:term", function(term) {
          return _this.search(term);
        });
        msgbus.events.on("search:more", function() {
          return _this.moreBooks();
        });
        this.maxResults = 40;
        this.page = 0;
        this.loading = false;
        this.previousSearch = null;
        return this.totalItems = null;
      };

      BookCollection.prototype.search = function(searchTerm) {
        var _this = this;

        this.page = 0;
        this.previousSearch = searchTerm;
        return this.fetchBooks(searchTerm, function(books) {
          if (books.length < 1) {
            return msgbus.events.trigger("search:noResults");
          } else {
            return _this.reset(books);
          }
        });
      };

      BookCollection.prototype.moreBooks = function() {
        var _this = this;

        if (this.length >= this.totalItems) {
          return true;
        }
        return this.fetchBooks(this.previousSearch, function(books) {
          return _this.add(books);
        });
      };

      BookCollection.prototype.fetchBooks = function(searchTerm, callback) {
        var query,
          _this = this;

        if (this.loading) {
          return true;
        }
        this.loading = true;
        msgbus.events.trigger("search:start");
        query = encodeURIComponent(searchTerm) + "&maxResults=" + this.maxResults + "&startIndex=" + (this.page * this.maxResults) + "&fields=totalItems,items(id,volumeInfo/title,volumeInfo/subtitle,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/description,volumeInfo/imageLinks)";
        return $.ajax({
          url: "https://www.googleapis.com/books/v1/volumes",
          dataType: "jsonp",
          data: "q=" + query,
          success: function(res) {
            var searchResults;

            msgbus.events.trigger("search:stop");
            if (res.totalItems === 0) {
              callback([]);
              return [];
            }
            if (res.items) {
              _this.page++;
              _this.totalItems = res.totalItems;
              searchResults = [];
              _.each(res.items, function(item) {
                var thumbnail;

                thumbnail = null;
                if (item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
                  thumbnail = item.volumeInfo.imageLinks.thumbnail;
                }
                return searchResults[searchResults.length] = new Book({
                  thumbnail: thumbnail,
                  title: item.volumeInfo.title,
                  subtitle: item.volumeInfo.subtitle,
                  description: item.volumeInfo.description,
                  googleId: item.id
                });
              });
              callback(searchResults);
              _this.loading = false;
              return searchResults;
            } else {
              msgbus.events.trigger("search:error");
              return _this.loading = false;
            }
          },
          error: function() {
            msgbus.events.trigger("search:error");
            return _this.loading = false;
          }
        });
      };

      return BookCollection;

    })(Backbone.Collection);
    msgbus.reqres.setHandler("book:entities", function() {
      return API.getBookEntities();
    });
    return API = {
      getBookEntities: function() {
        var books;

        return books = new BookCollection;
      }
    };
  });

}).call(this);
