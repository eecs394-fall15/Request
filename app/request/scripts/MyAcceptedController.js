angular
  .module('request')
  .controller("MyAcceptedController", function ($rootScope, $scope, $timeout, RequestHelper) {
    $scope.requests = [];
    $scope.newRequests = [];
    $scope.diffRequests = [];
    $scope.initialized = false;
    $scope.showSpinner = false;

    $scope.reload = function() {
      $scope.requests = JSON.parse(JSON.stringify($scope.newRequests));
      $scope.diffRequests = [];
    };

    $rootScope.$on('acceptedrequest', function(event, requests) {
      if (!$scope.initialized) {
        $scope.requests = JSON.parse(JSON.stringify(requests));
        $scope.initialized = true;
      }
      $scope.newRequests = requests;
      $scope.diffRequests = RequestHelper.updatedRequests($scope.requests, requests);
    });

    supersonic.ui.views.current.whenVisible(function() {
      RequestHelper.acceptedRequests();
      $scope.reload();
    });

    (function tick() {
      RequestHelper.acceptedRequests();
      $timeout(tick, 10000);
    })();
});
