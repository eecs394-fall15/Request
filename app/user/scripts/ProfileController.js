angular
  .module('user')
  .controller("ProfileController", function ($scope, UserParse, RequestParse, supersonic, Parse, User) {
    $scope.user = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    $scope.refresh = function(){
      var query = new Parse.Query(UserParse);
      query.equalTo("objectId",UserParse.current().id);

      query.first().then(function(user) {
        $scope.$apply( function () {
          $scope.user = user;
          $scope.showSpinner = false;
        });
       }, function(error) {
        supersonic.logger.info("Error: " + error.code + " " + error.message);
      });
    }

    supersonic.ui.views.current.whenVisible(function() {
      supersonic.logger.info("my profile visible");
      $scope.refresh();
    });

    $scope.edit = function(){
      var editView = new supersonic.ui.View("user#edit?id=" + $scope.user.id);
      supersonic.ui.modal.show(editView, {animate: true});
    }

    $scope.logout = function(){
      supersonic.logger.info("User: " + $scope.username + " logging out i think");
      UserParse.logOut();
      supersonic.logger.info("User: " + UserParse.current() + " should be null ");
    };

    $scope.upload = function() {
      console.log("Hey, this works!");
      options = {
        destinationType: "dataURL",
        quality: 50,
        allowEdit: true,
        targetWidth: 150,
        targetHeight: 150
      };

      supersonic.media.camera.getFromPhotoLibrary(options).then( function(result) {
        console.log("Uploading...");
        console.log("Unmodified data: " + result);
        var fileData = "data:image/png;base64," + result;
        console.log("Data: " + fileData);
        $scope.user.picture = fileData;
        $scope.user.save().then( function () {
          console.log("Upload successful!");
        });
      });
    };

    editBtn = new supersonic.ui.NavigationBarButton({
      onTap: $scope.edit,
      styleId: "nav-edit"
    });

    supersonic.ui.navigationBar.update({
      title: "My Profile",
      overrideBackButton: false,
      buttons: {
        right: [editBtn]
      }
    }).then(supersonic.ui.navigationBar.show());
  });
