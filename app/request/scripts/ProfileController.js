angular
  .module('request')
  .controller("ProfileController", function ($scope, UserParse, RequestParse, supersonic, Parse) {
    $scope.user = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      User.find($scope.dataId).then( function (user) {
        $scope.$apply( function () {
          $scope.user = user;
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

    
    $scope.logout = function(id){
      $scope.showSpinner = true;
      supersonic.logger.info("User: " + $scope.username + "logging out i think");
      UserParse.logOut();
      

      
    }
  });
