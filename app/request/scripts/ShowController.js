angular
  .module('request')
  .controller("ShowController", function ($scope, Request, UserParse, User, supersonic,Twilio) {
    $scope.request = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    $scope.isAuthor = null;
    $scope.isAccepted = null;

    var _refreshViewData = function () {
      Request.find($scope.dataId).then( function (request) {
        $scope.$apply( function () {
          $scope.request = request;
          $scope.isAuthor = (UserParse.current().id === request.author_user);
          $scope.isAccepted = request.state === 'accepted';
          $scope.showSpinner = false;
        });
      });
    };

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.request.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    };

    $scope.accept = function () {
      $scope.showSpinner = true;
      $scope.request.state = "accepted";
      $scope.request.accepted_user = UserParse.current().id;
      $scope.request.accepted_name = UserParse.current().get("firstName")+' '+UserParse.current().get("lastName");
      $scope.request.save().then( function () {
        supersonic.ui.layers.pop();
      });
      var options = {
      message: "You just accepted a request!",
      buttonLabel: "Close"
      };

      supersonic.ui.dialog.alert("Accepted Request", options).then(function() {
      supersonic.logger.log("Alert closed.");
      });

      supersonic.logger.info(Twilio);

      // Twilio.create('Messages', {
      //       to:   "+12244102478",
      //       from: "+15005550006",   
      //       body: "This is a test! yay!"
      //   })
      //   .success(function (data, status, headers, config) {
      //     supersonic.logger.info("twilio sent");
      //       // Success - do something
      //   })
      //   .error(function (data, status, headers, config) {
      //     supersonic.logger.info(data);
      //     supersonic.logger.info(status);
      //     supersonic.logger.info(headers);
      //     supersonic.logger.info(config);
      //     supersonic.logger.info("twilio failed");
      //       // Failure - do something
      //   });


      };
  });
