angular
  .module('request')
  .controller("IndexController", function ($rootScope, $scope, $timeout, RequestHelper,UserParse) {
    $scope.requests = [];
    $scope.newRequests = [];
    $scope.diffRequests = [];
    $scope.initialized = false;
    $scope.showSpinner = false;

    $scope.create = function() {
      

      if(UserParse.current().points < 5){
        
            var options = {
            message: "You need at least 5 points to make a request!",
            buttonLabel: "Close"
          };

          supersonic.ui.dialog.alert("Creating Request", options).then(function() {
            supersonic.logger.log("Alert closed.");
          });
      }
      else{
        
        var createView = new supersonic.ui.View("request#new");
        supersonic.ui.modal.show(createView, {animate: true});

      }
      
    };

    $scope.reload = function() {
      $scope.requests = JSON.parse(JSON.stringify($scope.newRequests));
      $scope.diffRequests = [];
    };

    $rootScope.$on('feedrequest', function(event, requests) {
      if (!$scope.initialized) {
        $scope.requests = JSON.parse(JSON.stringify(requests));
        $scope.initialized = true;
      }
      $scope.newRequests = requests;
      $scope.diffRequests = RequestHelper.updatedRequests($scope.requests, $scope.newRequests);
    });

    (function tick() {
      RequestHelper.feedRequests();
      $timeout(tick, 10000);
    })();
});
