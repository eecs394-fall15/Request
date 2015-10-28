angular
  .module('request')
  .controller("MyAcceptedController", function ($rootScope, $scope, $timeout, RequestHelper) {
    $scope.requests = [];
    $scope.lastQuery = [];
    $scope.newQuery = [];
    $scope.diffRequests = [];
    $scope.showSpinner = false;
    $scope.action = "initial";

    function filterAcceptedRequests(reqs) {
      var openReqs = [];
      for (var i = 0; i < reqs.length; i++) {
        if (reqs[i].state === "accepted") {
          openReqs.push(reqs[i]);
        }
      }
      return openReqs;
    }

    $scope.reload = function() {
      $scope.lastQuery = JSON.parse(JSON.stringify($scope.newQuery));
      $scope.requests = filterAcceptedRequests($scope.lastQuery);
      $scope.diffRequests = [];
    };

    $rootScope.$on('acceptedrequest', function(event, requests) {
      if ($scope.action === "initial") {
        $scope.lastQuery = JSON.parse(JSON.stringify(requests));
        $scope.requests = filterAcceptedRequests($scope.lastQuery);
        $scope.action ="hold";
      } else if ($scope.action === "hold") {
        $scope.newQuery = requests;
        $scope.diffRequests = RequestHelper.updatedRequests($scope.lastQuery, $scope.newQuery);
      } else if ($scope.action === "load") {
        $scope.lastQuery = JSON.parse(JSON.stringify(requests));
        $scope.requests = filterAcceptedRequests($scope.lastQuery);
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
