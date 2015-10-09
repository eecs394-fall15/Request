angular
  .module('request')
  .controller("IndexController", function ($scope, Parse, RequestParse, supersonic,UserParse) {

    $scope.limit = 30;
    $scope.requests = [];
    $scope.showSpinner = true;

    var loadRequests = function() {
      var query = new Parse.Query(RequestParse);
      query.descending("createdAt");
      query.limit($scope.limit);
      query.equalTo('state', 'open');
      query.notEqualTo("author_user", UserParse.current().id);

      query.find().then(function(requests) {
        supersonic.logger.info("Successfully retrieved " + requests.length + " requests.");
        $scope.$apply( function () {
          $scope.requests = requests;
          $scope.showSpinner = false;
        });
      },function(error) {
        supersonic.logger.info("Error: " + error.code + " " + error.message);
      });
    };

    $scope.reload = function() {
      loadRequests();
    };

    loadRequests();
});
