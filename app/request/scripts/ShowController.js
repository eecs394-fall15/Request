angular
  .module('request')
  .controller("ShowController", function ($scope, Request, UserParse, User, supersonic,Twilio,RequestParse) {
    $scope.request = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    $scope.isAuthor = null;
    $scope.isAccepted = null;
    $scope.isOpen = null;
    $scope.timed=null;

    $scope.edit = function(){
      var editView = new supersonic.ui.View("request#edit?id=" + $scope.request.id);
      supersonic.ui.modal.show(editView, {animate: true});
    }

    var _refreshViewData = function () {
      Request.find($scope.dataId).then( function (request) {
        $scope.$apply( function () {
          $scope.request = request;
          $scope.isAuthor = (UserParse.current().id === request.author_user);
          $scope.isAccepted = request.state === 'accepted';
          $scope.isOpen = request.state === 'open';
          $scope.showSpinner = false;


         


        });

        if ($scope.isAuthor) {
          editBtn = new supersonic.ui.NavigationBarButton({
            onTap: $scope.edit,
            styleId: "nav-edit"
          });

          supersonic.ui.navigationBar.update({
            title: "Request Details",
            overrideBackButton: false,
            buttons: {
              right: [editBtn]
            }
          }).then(supersonic.ui.navigationBar.show());
        } else {
          supersonic.ui.navigationBar.update({
          title: "Request Details",
          overrideBackButton: false,
          }).then(supersonic.ui.navigationBar.show());
        }
      });
    };

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      supersonic.logger.info(values.id);
      $scope.dataId = values.id;
      supersonic.logger.info($scope.dataId);
      _refreshViewData();
    });

    $scope.cancel = function (id) {
      var options = {
        message: "Are you sure you want to cancel the request?",
        buttonLabels: ["Yes", "No"]
      };

      supersonic.ui.dialog.confirm("Cancel Request", options).then(function(index) {
        if (index === 0) {
          $scope.showSpinner = true;
          $scope.request.state = "cancelled";

          $scope.request.save().then( function () {
            supersonic.ui.layers.pop();
          });
        } else {
          supersonic.logger.log("Request Cancelling Aborted");
        }
      });
    };

    $scope.close = function (id) {
      var options = {
        message: "Are you sure you want to close the request?",
        buttonLabels: ["Yes", "No"]
      };

      supersonic.ui.dialog.confirm("Close Request", options).then(function(index) {
        if (index === 0) {
          $scope.showSpinner = true;
          $scope.request.state = "closed";
          Parse.Cloud.run("addPoints", {points: 1, userId: $scope.request.accepted_user}).then(function() {
            supersonic.logger.log("Successed to run cloud function addScore");
          }, function(error) {
            supersonic.logger.log("Failed to run cloud function addScore with error " + JSON.stringify(err));
          });

          $scope.request.save().then( function () {
            supersonic.ui.layers.pop();
          });
        } else {
          supersonic.logger.log("Request Closing Aborted");
        }
      });
    };

    $scope.accept = function () {
      var options = {
        message: "Are you sure you want to accept the request?",
        buttonLabels: ["Yes", "No"]
      };

      supersonic.ui.dialog.confirm("Accept Request", options).then(function(index) {
        if (index === 0) {
          $scope.showSpinner = true;
          $scope.request.state = "accepted";

          $scope.request.accepted_user = UserParse.current().id;
          $scope.request.accepted_name = UserParse.current().get("firstName")+' '+UserParse.current().get("lastName");
          $scope.request.save().then( function () {
            supersonic.ui.layers.pop();
          });
        } else {
          supersonic.logger.log("Request Accepted Aborted");
        }
      });
    };

    });
