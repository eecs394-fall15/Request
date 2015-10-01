angular
  .module('request')
  .controller("NewController", function ($scope, Request, supersonic) {
    $scope.request = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newrequest = new Request($scope.request);
      newrequest.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });