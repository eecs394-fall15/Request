angular
  .module('request')
  .controller("MyRequestsController", function ($scope, RequestParse, UserParse, supersonic, Parse) {
    $scope.requests = null;
    $scope.showSpinner = true;
    supersonic.logger.info("My requests: " + UserParse.current().requests);

    var query = new Parse.Query(RequestParse);
    query.descending("createdAt");
    query.containedIn("objectId", UserParse.current().requests);

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
