define([
  'underscore',
  'backbone',
  'collections/users'
], function(_, Backbone,UsersCollection) {
  var UserModel = Backbone.Model.extend({
    defaults: {
      name: '',
      lastName: ''
      // age: -1,
      // id: -1
    },
  validate: function(attrs) {
    var invalid=[];
    if (attrs.name.match(/\d/) || attrs.name==='') invalid.push('User name is required, and must contain a valid value.');
    if (attrs.lastName.match(/\d/) || attrs.lastName==='') invalid.push('User last name is required, and must contain a valid value.');
    if (isNaN(attrs.age) || attrs.age<=0 || attrs.age >=100 ) invalid.push('User\'s age is required, and must contain a valid value.');
    if (isNaN(attrs.id) || attrs.id<=0 || attrs.id >=100) invalid.push('User id is not valid');

    return invalid;
  },
  create: function(attrs){
    console.log("en create");
    console.log(attrs);
    this._setAttributes(attrs);
    console.log("despues de SetAttributes");
    console.log(this);
    UsersCollection.add(this);
    
  },
  edit: function (attrs) {
    
    this._setAttributes(attrs);

    localStorage.setItem('users-local-storage-'+attrs.id, JSON.stringify(this));
  },
  _setAttributes: function(attrs){
    console.log("en setAttributes");
    console.log(attrs);
    this.attributes.id =  parseInt(attrs.id);
    this.attributes.name = attrs.name;
    this.attributes.lastName = attrs.lastName;
    this.attributes.age = attrs.age;
    console.log("en setAttributes, despues de modificar (this): ");
    console.log(this);
    console.log("en setAttributes, attrs.id(this): ");
    console.log(attrs.id);
  }

  });
  return UserModel;
});