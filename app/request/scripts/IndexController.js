angular
  .module('request')
  .controller("IndexController", function ($rootScope, $scope, $timeout, RequestHelper,UserParse) {
    $scope.requests = [];
    $scope.lastQuery = [];
    $scope.newQuery = [];
    $scope.diffRequests = [];
    $scope.initialized = false;
    $scope.showSpinner = false;
    $scope.action = "initial";

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

    function filterOpenRequests(reqs) {
      var openReqs = [];
      for (var i = 0; i < reqs.length; i++) {
        if (reqs[i].state === "open") {
          openReqs.push(reqs[i]);
        }
      }
      return openReqs;
    }

    $scope.reload = function() {
      $scope.lastQuery = JSON.parse(JSON.stringify($scope.newQuery));
      $scope.requests = filterOpenRequests($scope.lastQuery);
      $scope.diffRequests = [];
    };

    $rootScope.$on('feedrequest', function(event, requests) {
      if ($scope.action === "initial") {
        $scope.lastQuery = JSON.parse(JSON.stringify(requests));
        $scope.requests = filterOpenRequests($scope.lastQuery);
        $scope.initialized = true;
        $scope.action ="hold";
      } else if ($scope.action === "hold") {
        $scope.newQuery = requests;
        $scope.diffRequests = RequestHelper.updatedRequests($scope.lastQuery, $scope.newQuery);
      } else if ($scope.action === "load") {
        $scope.lastQuery = JSON.parse(JSON.stringify(requests));
        $scope.requests = filterOpenRequests($scope.lastQuery);
        $scope.diffRequests = [];
        $scope.action ="hold";
      }
    });

    supersonic.ui.views.current.whenVisible(function() {
      $scope.diffRequests = [];
      $scope.action = "load";
      RequestHelper.feedRequests();
    });

    (function tick() {
      RequestHelper.feedRequests();
      $timeout(tick, 10000);
    })();

    newBtn = new supersonic.ui.NavigationBarButton({
      onTap: $scope.create,
      styleId: "nav-new"
    });

    supersonic.ui.navigationBar.update({
      title: "Feed",
      overrideBackButton: false,
      buttons: {
        right: [newBtn]
      }
    }).then(supersonic.ui.navigationBar.show());
});
