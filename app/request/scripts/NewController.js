angular
  .module('request')
  .controller("NewController", function ($scope, Request, supersonic) {
    $scope.request = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newrequest = new Request($scope.request);
      newrequest.state = "open";
      newrequest.author_user = UserParse.current().id;
      UserParse.current().requests.push(newrequest.id);
      newrequest.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    };

  });
