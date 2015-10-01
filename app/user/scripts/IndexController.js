angular
  .module('user')
  .controller("IndexController", function ($scope, User, supersonic) {
    $scope.users = null;
    $scope.showSpinner = true;

    User.all().whenChanged( function (users) {
        $scope.$apply( function () {
          $scope.users = users;
          $scope.showSpinner = false;
        });
    });
  });
