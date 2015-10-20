angular
  .module('common')
  .factory('RequestHelper', function ($rootScope, Parse, RequestParse, UserParse, supersonic) {
    var requestHelper = {};

    var runQuery = function(eventName, query) {
      query.find().then(function(requests) {
        supersonic.logger.info("Successfully retrieved " + requests.length + " requests.");
        var i=0; var timeDiff=0; var mins=0; var hrs=0; var days=0; var showTime;
        for(i=0;i<requests.length;i++){
          timeDiff=(new Date() - requests[i].createdAt);
          mins=Math.floor((timeDiff/ (1000*60))%60);
          hrs=Math.floor((timeDiff / (1000*60*60)) % 24);
          days=Math.floor(timeDiff / (1000*60*60*24));

          if(days>0){
            showTime=days + " days ago";
          }
          else if (hrs>0){
            showTime=hours+ " hrs ago";
          }
          else{
            showTime=mins+ " mins ago";
          }

          supersonic.logger.info(showTime);
          requests[i].stringCreatedAt=showTime;
        }


        $rootScope.$broadcast(eventName, requests);
      },function(error) {
        supersonic.logger.info("Error: " + error.code + " " + error.message);
      });
    };

    requestHelper.myRequests = function() {
      var query = new Parse.Query(RequestParse);
      query.descending("createdAt");
      query.containedIn("author_user", [UserParse.current().id]);
      runQuery('myrequest', query);
    };

    requestHelper.feedRequests = function() {
      var query = new Parse.Query(RequestParse);
      supersonic.logger.info("After Initiating Query.");
      query.descending("createdAt");
      query.limit(30);
      query.equalTo('state', 'open');
      runQuery('feedrequest', query);
    };

    requestHelper.acceptedRequests = function() {
      var query = new Parse.Query(RequestParse);
      query.descending("createdAt");
      query.containedIn("accepted_user", [UserParse.current().id]);
      query.equalTo('state', 'accepted');
      runQuery('acceptedrequest', query);
    };

    return requestHelper;
  })

