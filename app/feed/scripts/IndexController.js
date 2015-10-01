angular
  .module('feed')
  .controller('IndexController', function($scope, Request, User, supersonic) {
      Request.all().whenChanged( function (requests) {
        supersonic.logger.info(requests.length)
        $scope.$apply( function () {
          $scope.requests = requests;
          $scope.showSpinner = true;
        });
      });
  });
