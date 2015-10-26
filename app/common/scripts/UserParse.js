angular
  .module('common')
  .factory('UserParse', function(Parse, ParseUtils) {
    var properties = ['username', 'password', 'email', 'requests', 'phone', 'address', 'emailVerified', 'firstName', 'lastName', 'picture'];
    for (var i = 0; i < properties.length; i++) {
      ParseUtils.addSetterGetter(Parse.User, properties[i]);
    }
    return Parse.User;
});
