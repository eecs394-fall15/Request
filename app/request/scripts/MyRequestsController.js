angular
  .module('request')
  .controller("MyRequestsController", function ($scope, RequestParse, UserParse, supersonic) {
    $scope.requests = null;
    $scope.showSpinner = true;

    var loadMyRequested = function() {
      var query = new Parse.Query(RequestParse);
      query.descending("createdAt");
      query.containedIn("author_user", [UserParse.current().id]);

      query.find().then(function(requests) {
        supersonic.logger.info("Successfully retrieved " + requests.length + " requests.");
        $scope.$apply( function () {
          $scope.requests = requests;
          $scope.showSpinner = false;
        });
      },function(error) {
        supersonic.logger.info("Error: " + error.code + " " + error.message);
      });
    }

    $scope.reloadMyRequested = function() {
      loadMyRequested();
    }

    loadMyRequested();
});
