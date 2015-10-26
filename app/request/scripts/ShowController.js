angular
  .module('request')
  .controller("ShowController", function ($scope, Request, UserParse, User, supersonic,Twilio,RequestParse) {
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
      supersonic.logger.info(values.id);
      $scope.dataId = values.id;
      supersonic.logger.info($scope.dataId);
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.request.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    };

    $scope.close = function (id) {
      $scope.showSpinner = true;
      $scope.request.state = "closed";
      var lender= $scope.request.accepted_user;
      var query = new Parse.Query(UserParse);
      query.equalTo('objectId', lender);
      query.find().then(function(users) {
        supersonic.logger.info("printing before update");
        supersonic.logger.info(users);
        
        
        users[0].points=users[0].points+1;
        users[0].save().then(function(){
          supersonic.logger.info("saving user[0] ");

        });
        supersonic.logger.info("printing after update pts");
        supersonic.logger.info(users[0]);
        

      },function(error) {
        supersonic.logger.info("Error: " + error.code + " " + error.message);
      });
      

      $scope.request.save().then( function () {
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
    };
  });
