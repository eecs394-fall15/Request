angular
  .module('request')
  .controller("ShowMyRequestController", function ($scope, Request, User, supersonic) {
    $scope.request = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    $scope.author = '';

    var findAuthor = function(userID) {
      supersonic.logger.log("Function called!"+userID);
      User.find(userID).then(function(user){
        supersonic.logger.log("Successful Query!!:"+user.username);
        $scope.author =  user.username;
      });
    };


    var _refreshViewData = function () {
      Request.find($scope.dataId).then( function (request) {
        $scope.$apply( function () {
          $scope.request = request;
          $scope.author = findAuthor(request.author_user);
          $scope.showSpinner = false;
        });
      });
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.request.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });
