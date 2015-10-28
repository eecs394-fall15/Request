angular
  .module('user')
  .controller("EditController", function ($scope, User, supersonic, Parse) {
    $scope.user = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    User.find(steroids.view.params.id).then( function (user) {
      $scope.$apply(function() {
        $scope.user = user;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.user.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    };

    cancelBtn = new supersonic.ui.NavigationBarButton({
      onTap: $scope.cancel,
      styleId: "nav-cancel"
    });

    saveBtn = new supersonic.ui.NavigationBarButton({
      onTap: $scope.submitForm,
      styleId: "nav-save"
    });

    supersonic.ui.navigationBar.update({
      title: "Edit Profile",
      overrideBackButton: false,
      buttons: {
        left: [cancelBtn],
        right: [saveBtn]
      }
    }).then(supersonic.ui.navigationBar.show());
  });
