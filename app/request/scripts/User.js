angular
  .module('request')
  .factory('User', function(ParseUtils, Parse) {
    var properties = ['username', 'password', 'email', 'requests', 'phone', 'address', 'emailVerified'];
    for (var i = 0; i < properties.length; i++) {
      ParseUtils.addSetterGetter(Parse.User, properties[i])
    }
    return user;
})
