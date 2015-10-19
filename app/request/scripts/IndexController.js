angular
  .module('request')
  .controller("IndexController", function ($rootScope, $scope, RequestHelper) {
    $scope.requests = [];
    $scope.showSpinner = true;

    $rootScope.$on('feedrequest', function(event, data) {
      $scope.requests = data;
      $scope.showSpinner = false;
    });

    supersonic.ui.views.current.whenVisible(function() {
      RequestHelper.feedRequests();
    });
});
