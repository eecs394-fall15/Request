angular
  .module('request')
  .controller("IndexController", function ($rootScope, $scope, $timeout, RequestHelper) {
    $scope.requests = [];
    $scope.newRequests = [];
    $scope.diffRequests = [];
    $scope.initialized = false;
    $scope.showSpinner = false;

    $scope.reload = function() {
      $scope.requests = JSON.parse(JSON.stringify($scope.newRequests));
      $scope.diffRequests = [];
    };

    $rootScope.$on('feedrequest', function(event, requests) {
      if (!$scope.initialized) {
        $scope.requests = JSON.parse(JSON.stringify(requests));
        $scope.initialized = true;
      }
      $scope.newRequests = requests;
      $scope.diffRequests = RequestHelper.updatedRequests($scope.requests, $scope.newRequests);
    });

    (function tick() {
      RequestHelper.feedRequests();
      $timeout(tick, 10000);
    })();
});
