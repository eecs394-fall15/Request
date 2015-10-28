angular
  .module('user')
  .controller("ShowController", function ($scope, User, UserParse, supersonic) {
    $scope.user = null;
    $scope.isAuthor = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    $scope.edit = function(){
      var editView = new supersonic.ui.View("user#edit?id=" + $scope.user.id);
      supersonic.ui.modal.show(editView, {animate: true});
    }

    var _refreshViewData = function () {
      User.find($scope.dataId).then( function (user) {
        $scope.$apply( function () {
          $scope.user = user;
          $scope.showSpinner = false;
          $scope.isAuthor = (UserParse.current().id === user.id);
        });

        if ($scope.isAuthor) {
          editBtn = new supersonic.ui.NavigationBarButton({
            onTap: $scope.edit,
            styleId: "nav-edit"
          });

          supersonic.ui.navigationBar.update({
            title: "Request Details",
            overrideBackButton: false,
            buttons: {
              right: [editBtn]
            }
          }).then(supersonic.ui.navigationBar.show());
        } else {
          supersonic.ui.navigationBar.update({
          title: "Request Details",
          overrideBackButton: false,
          }).then(supersonic.ui.navigationBar.show());
        }
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
