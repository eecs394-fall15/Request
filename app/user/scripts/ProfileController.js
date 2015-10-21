angular
  .module('user')
  .controller("ProfileController", function ($scope, UserParse, RequestParse, supersonic, Parse, User) {
    $scope.user = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;


     var query = new Parse.Query(UserParse);
     query.equalTo("objectId",UserParse.current().id);

     query.find().then(function(users) {

      $scope.$apply( function () {
        $scope.user = users[0];
        $scope.showSpinner = false;
      });
    },function(error) {
      supersonic.logger.info("Error: " + error.code + " " + error.message);
    });

    $scope.logout = function(){
      supersonic.logger.info("User: " + $scope.username + " logging out i think");
      UserParse.logOut();
      supersonic.logger.info("User: " + UserParse.current() + " should be null ");
    };

  });
