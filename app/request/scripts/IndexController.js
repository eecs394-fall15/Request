angular
  .module('request')
  .controller("IndexController", function ($scope, Request, supersonic) {
    $scope.requests = null;
    $scope.showSpinner = true;

    Request.all().whenChanged( function (requests) {
        $scope.$apply( function () {
          $scope.requests = requests;
          $scope.showSpinner = false;
        });
    });
  });