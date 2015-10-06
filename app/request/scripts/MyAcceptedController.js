angular
  .module('request')
  .controller("MyAcceptedController", function ($scope, RequestParse, UserParse, supersonic, Parse) {
    $scope.requests = null;
    $scope.showSpinner = true;
    supersonic.logger.info("My requests: " + UserParse.current().requests);

    var loadMyAccepted = function() {
      var query = new Parse.Query(RequestParse);
      query.descending("createdAt");
      query.containedIn("accepted_user", [UserParse.current().id]);

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

    $scope.reloadMyAccepted = function() {
      loadMyAccepted();
    }

    loadMyAccepted();
});
