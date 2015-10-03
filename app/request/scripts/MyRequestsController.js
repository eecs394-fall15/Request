angular
  .module('request')
  .controller("MyRequestsController", function ($scope, RequestFeed, User, supersonic) {
    $scope.requests = null;
    $scope.showSpinner = true;
    supersonic.logger.info("My requests: " + User.current().requests);

    var query = new Parse.Query(RequestFeed);
    query.descending("createdAt");
    query.containedIn("objectId", User.current().requests);

    query.find().then(function(requests) {
      supersonic.logger.info("Successfully retrieved " + requests.length + " requests.");
      $scope.$apply( function () {
        $scope.requests = requests;
        $scope.showSpinner = false;
      });
    },function(error) {
      supersonic.logger.info("Error: " + error.code + " " + error.message);
    });
});
