angular
  .module('request')
  .controller("MyRequestsController", function ($rootScope, $scope, RequestHelper) {
    $scope.requests = null;
    $scope.showSpinner = true;

    $rootScope.$on('myrequest', function(event, data) {
      $scope.requests = data;
      $scope.showSpinner = false;
    });

    RequestHelper.myRequests();
});
