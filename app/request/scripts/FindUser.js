angular
  .module('request')
  .factory('FindUser', function() {
    supersonic.data.model('User');
    author = '';
    return function(userID) {
      User.find(userID).then(function(user){
        author = user.username;
      });
    };
  });
