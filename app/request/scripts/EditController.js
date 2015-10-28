angular
  .module('request')
  .controller("EditController", function ($scope, Request, supersonic) {
    $scope.request = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Request.find(steroids.view.params.id).then( function (request) {
      $scope.$apply(function() {
        $scope.request = request;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.request.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

    cancelBtn = new supersonic.ui.NavigationBarButton({
      onTap: $scope.cancel,
      styleId: "nav-cancel"
    });

    saveBtn = new supersonic.ui.NavigationBarButton({
      onTap: $scope.submitForm,
      styleId: "nav-save"
    });

    supersonic.ui.navigationBar.update({
      title: "Edit Request",
      overrideBackButton: false,
      buttons: {
        left: [cancelBtn],
        right: [saveBtn]
      }
    }).then(supersonic.ui.navigationBar.show());

  });
