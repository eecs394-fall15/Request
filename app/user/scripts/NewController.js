angular
  .module('user')
 .controller("NewController", function ($scope, UserParse, supersonic) {
    $scope.user = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      UserParse.signUp($scope.user.username, $scope.user.password, {
        sex: $scope.user.sex,
        address: $scope.user.sex,
        phone: $scope.phone,
        email: $scope.email,
        ACL: new Parse.ACL()
      }).then(function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    };
  });
