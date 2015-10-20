angular
  .module('request')
  .controller("MyRequestsController", function ($rootScope, $scope, $timeout, RequestHelper) {
    $scope.requests = [];
    $scope.newRequests = [];
    $scope.diffRequests = [];
    $scope.initialized = false;
    $scope.showSpinner = false;

    $scope.reload = function() {
      $scope.requests = JSON.parse(JSON.stringify($scope.newRequests));
      $scope.diffRequests = [];
    };

    $rootScope.$on('myrequest', function(event, requests) {
      if (!$scope.initialized) {
        $scope.requests = JSON.parse(JSON.stringify(requests));
        $scope.initialized = true;
      }
      $scope.newRequests = requests;
      $scope.diffRequests = RequestHelper.updatedRequests($scope.requests, requests);
    });

    supersonic.ui.views.current.whenVisible(function() {
      RequestHelper.myRequests();
      $scope.reload();
    });

    (function tick() {
      RequestHelper.myRequests();
      $timeout(tick, 10000);
    })();
});
