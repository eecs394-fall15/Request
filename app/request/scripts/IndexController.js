angular
  .module('request')
  .controller("IndexController", function ($scope, ParseUtils, supersonic) {
    var limit = 5;
    $scope.requests = [];
    $scope.showSpinner = true;
    $scope.reload = function() {
      ParseUtils.loadRequests(limit);
    }
    $scope.nextPage = function() {
      ParseUtils.loadRequests(limit, true);
    }
    supersonic.logger.info("----");
    ParseUtils.loadRequests(limit);
});
