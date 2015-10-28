angular
  .module('user')
  .controller("ShowController", function ($scope, User, supersonic) {
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
    };

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.email = function() {
      supersonic.app.openURL("mailto:"+$scope.user.email+"?subject=Request");
    };

    $scope.call = function() {
      supersonic.app.openURL("tel:"+$scope.user.phone);
    };

    $scope.text = function() {
      supersonic.app.openURL("sms:"+$scope.user.phone);
    };

    $scope.map = function() {
      var address = $scope.user.address.replace(/ /g , "%20");
      supersonic.logger.log(address);
      supersonic.app.openURL("http://maps.google.com/maps?daddr="+address);
    };

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.user.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    };
  });
