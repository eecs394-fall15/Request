angular
  .module('request')
  .controller("IndexController", function ($scope, Parse, Request, supersonic) {

    $scope.limit = 10;
    $scope.requests = [];
    $scope.showSpinner = true;

    var loadRequests = function() {
      var query = new Parse.Query(Request);
      query.descending("createdAt");
      query.limit($scope.limit);

      query.find().then(function(requests) {
        $scope.$apply( function () {
          $scope.requests = requests;
          $scope.showSpinner = false;
        });
      },function(error) {
      });
    }

    $scope.reload = function() {
      loadRequests();
    }
    loadRequests();
});
