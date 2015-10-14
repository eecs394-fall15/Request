angular
  .module('common')
  .factory('RequestParse', function(Parse, ParseUtils) {
    var request = Parse.Object.extend("Request", {
      // Instance methods
    }, {
      // Class methods
    });

    var properties = ['title', 'ACL', 'description', 'state', 'author_user', 'accepted_user', 'author_name', 'accepted_name'];
    for (var i = 0; i < properties.length; i++) {
      ParseUtils.addSetterGetter(request, properties[i]);
    }

    function stringCreate() {
      var d = this.createdAt;
      var strdate=""+d.getDate()+", "d.getMonth()+", "d.getYear();
      return strdate;
    }

    request.stringCreatedAt = stringCreate();

    return request;
});
