angular
  .module('user')
  .controller("NewController", function ($scope, User, UserParse, supersonic) {
    $scope.user = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newuser = new User($scope.user);
      newuser.state = "open";
      newuser.author_user = UserParse.current().id;
      newuser.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
