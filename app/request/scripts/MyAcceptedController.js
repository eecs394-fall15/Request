angular
  .module('request')
  .controller("MyAcceptedController", function ($rootScope, $scope, RequestHelper) {
    $scope.requests = null;
    $scope.showSpinner = true;

    $rootScope.$on('acceptedrequest', function(event, data) {
      $scope.requests = data;
      $scope.showSpinner = false;
    });

    RequestHelper.acceptedRequests();
});
