angular
  .module('request')
  .controller("NewController", function ($scope, Request, UserParse, supersonic) {
    $scope.request = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newrequest = new Request($scope.request);
      newrequest.state = "open";
      newrequest.accepted_user = "none";
      newrequest.author_user = UserParse.current().id;

      newrequest.author_name = UserParse.current().get('firstName') + ' ' + UserParse.current().get('lastName');

      newrequest.stringCreatedAt = (""+UserParse.current().get('createdAt')).substring(0,10);

      newrequest.save().then( function () {
        UserParse.current().addUnique("requests", newrequest.id);
        UserParse.current().save();
        supersonic.ui.modal.hide();
      });

      UserParse.current().points=UserParse.current().points-1;
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    };

    discardBtn = new supersonic.ui.NavigationBarButton({
      onTap: $scope.cancel,
      styleId: "nav-discard"
    });

    saveBtn = new supersonic.ui.NavigationBarButton({
      onTap: $scope.submitForm,
      styleId: "nav-send"
    });

    supersonic.ui.navigationBar.update({
      title: "New Request",
      overrideBackButton: false,
      buttons: {
        left: [discardBtn],
        right: [saveBtn]
      }
    }).then(supersonic.ui.navigationBar.show());
  });
