angular
  .module('request')
  .controller("myacceptedController", function ($scope, Parse, User, Request, supersonic) {

    $scope.requests = null;
    $scope.showSpinner = true;

    var query = new Parse.Query(Request);
    query.descending("createdAt");
    query.equalTo("state", "open");

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
