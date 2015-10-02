angular
  .module('request')
  .controller("IndexController", function ($scope, Parse, Request, supersonic) {
    supersonic.logger.info(typeof Parse);
    var query = new Parse.Query(Request);
    query.ascending("createdAt");
    query.limit(5);

    $scope.requests = null;
    $scope.showSpinner = true;

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
