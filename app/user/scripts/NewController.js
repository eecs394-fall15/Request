angular
  .module('user')
 .controller("NewController", function ($scope, UserParse, supersonic) {
    $scope.user = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      UserParse.signUp($scope.user.username, $scope.user.password, {
        address: $scope.user.address,
        phone: $scope.user.phone,
        email: $scope.user.email,
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName, 
        ACL: new Parse.ACL()
      }).then(function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    };
  });
