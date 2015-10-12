angular
  .module('request')
  .controller("ShowController", function ($scope, Request, UserParse, User, supersonic) {
    $scope.request = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    $scope.isAuthor = null;

    var _refreshViewData = function () {
      Request.find($scope.dataId).then( function (request) {
        $scope.$apply( function () {
          $scope.request = request;
          $scope.authorView = (UserParse.current().id === request.author_user);
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

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.request.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    };

    $scope.accept = function () {
      $scope.showSpinner = true;
      $scope.request.state = "accepted";
      $scope.request.accepted_user = UserParse.current().id;
      $scope.request.accepted_name = UserParse.current().get("firstName")+' '+UserParse.current().get("lastName");
      $scope.request.save().then( function () {
        supersonic.ui.layers.pop();
      });
    };
  });
