angular
  .module('user')
  .controller("EditController", function ($scope, User, supersonic, Cloudinary) {
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

    $scope.upload = function() {
      var options = {
        quality: 50,
        allowEdit: true,
        targetWidth: 300,
        targetHeight: 300,
        encodingType: "png",
        destinationType: "dataURL"
      };
      supersonic.media.camera.getFromPhotoLibrary(options).then(function(result){
        profile_picture = new Cloudinary();
        profile_picture.upload({public_id: UserParse.current().id, file: result, upload_preset: 'hpdvayqm'});
      });
    };

  });
