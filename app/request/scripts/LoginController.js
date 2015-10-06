angular
  .module('request')
  .controller("LoginController", function ($scope, UserParse, supersonic) {
    $scope.error = null;
    $scope.login = function() {
      supersonic.logger.info("User: " + $scope.username);
      supersonic.logger.info("Pass: " + $scope.password);
      UserParse.logIn($scope.username, $scope.password).then(function(user) {
        supersonic.logger.info("Login Succeed for {\"user\":" + $scope.username + ", \"password\":" + $scope.password + "\"}");
        supersonic.ui.initialView.dismiss();
      }, function(error) {
        $scope.error = error;
        supersonic.logger.info("Login Failed for {\"user\":" + $scope.username + ", \"password\":" + $scope.password + "\"}");
      });
    }
  });
