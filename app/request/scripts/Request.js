angular
  .module('request')
  .factory('Request', function(Parse) {
    var request = Parse.Object.extend("Request", {
      // Instance methods
    }, {
      // Class methods
    });

    var setProperty = function(module, property) {
      Object.defineProperty(module.prototype, property, {
        get: function() {
          return this.get(property);
        },
        set: function(value) {
          this.set(property, value);
        }
      });
    }

    var properties = ['title', 'ACL', 'description', 'state', 'location', 'author_user'];
    for (var i = 0; i < properties.length; i++) {
      setProperty(request, properties[i])
    }
    return request;
})
