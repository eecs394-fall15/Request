angular
  .module('request')
  .controller("IndexController", function ($scope, $timeout, RequestHelper) {
    $scope.requests = [];
    $scope.newRequests = [];
    $scope.diffRequests = [];
    $scope.initialized = false;
    $scope.showSpinner = false;

    $scope.reload = function() {
      $scope.requests = $scope.newRequests;
      $scope.diffRequests = [];
    };

    (function tick() {
      RequestHelper.feedRequestsQuery().find().then(function(requests) {
        supersonic.logger.info(requests.length + " requests retrieved.");
        $scope.$apply(function() {
          if (!$scope.initialized) {
            $scope.requests = requests;
            $scope.initialized = true;
          }
          $scope.newRequests = requests;
          $scope.diffRequests = RequestHelper.diffRequests($scope.requests, requests);
        });
        $timeout(tick, 10000);
      },function(error) {
        supersonic.logger.info("Error: " + error.code + " " + error.message);
      });
    })();
});
