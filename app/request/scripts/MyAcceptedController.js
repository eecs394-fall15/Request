angular
  .module('request')
  .controller("MyAcceptedController", function ($rootScope, $scope, $timeout, RequestHelper) {
    $scope.requests = [];
    $scope.newRequests = [];
    $scope.diffRequests = [];
    $scope.initialized = false;
    $scope.showSpinner = false;
    $scope.action = "load";

    $scope.create = function() {
      var createView = new supersonic.ui.View("request#new");
      supersonic.ui.modal.show(createView, {animate: true});
    };

    $scope.reload = function() {
      $scope.requests = JSON.parse(JSON.stringify($scope.newRequests));
      $scope.diffRequests = [];
    };

    $rootScope.$on('acceptedrequest', function(event, requests) {
      if (!$scope.initialized) {
        $scope.requests = JSON.parse(JSON.stringify(requests));
        $scope.initialized = true;
      }

      if ($scope.action === "hold") {
        $scope.newRequests = requests;
        $scope.diffRequests = RequestHelper.updatedRequests($scope.requests, requests);
      } else if ($scope.action === "load") {
        $scope.requests = JSON.parse(JSON.stringify(requests));
        $scope.diffRequests = [];
        $scope.action ="hold";
      }
    });

    supersonic.ui.views.current.whenVisible(function() {
      $scope.diffRequests = [];
      $scope.action ="load";
      RequestHelper.acceptedRequests();
    });

    (function tick() {
      RequestHelper.acceptedRequests();
      $timeout(tick, 10000);
    })();
});
