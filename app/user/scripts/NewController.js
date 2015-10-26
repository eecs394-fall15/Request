angular
  .module('user')
 .controller("NewController", function ($scope, UserParse, supersonic) {
    $scope.user = {};
    $scope.error = null;
    $scope.showSpinner = false;

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      UserParse.signUp($scope.user.username, $scope.user.password, {
        address: $scope.user.address,
        phone: $scope.user.phone,
        email: $scope.user.email,
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName,
        points: 0,
        ACL: new Parse.ACL()
      }).then(function () {
        supersonic.logger.info("SignUp Succeed");
        supersonic.ui.modal.hide();
      }, function(error) {
        $scope.error = error;
        $scope.showSpinner = false;
        supersonic.logger.info("SignUp Failed with Error: " + JSON.stringify(error));
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    };
  });
