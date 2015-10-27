angular
  .module('common')
  .factory('RequestHelper', function ($rootScope, Parse, RequestParse, UserParse, supersonic) {
    var requestHelper = {};

    var runQuery = function(eventName, query) {
      query.find().then(function(requests) {
        supersonic.logger.info(requests.length + " requests retrieved.");
        var i=0; var timeDiff=0; var mins=0; var hrs=0; var days=0; var showTime;
        for(i=0;i<requests.length;i++){
          timeDiff=(new Date() - requests[i].createdAt);
          mins=Math.floor((timeDiff/ (1000*60))%60);
          hrs=Math.floor((timeDiff / (1000*60*60)) % 24);
          days=Math.floor(timeDiff / (1000*60*60*24));

          if(days>0){
            if (days==1)
            {
              showTime=days + " day ago";
            }
            else{
              showTime=days + " days ago";
            }
          }
          else if (hrs>0){

            if(hrs==1){
              showTime=hrs+ " hr ago";
            }
            else{
              showTime=hrs+ " hrs ago";
            }
          }
          else{
            if(mins==1){
              showTime=mins+ " min ago";
            }
            else{
              showTime=mins+ " mins ago";
            }
          }
          requests[i].stringCreatedAt=showTime;
        }
        $rootScope.$broadcast(eventName, requests);
      },function(error) {
        supersonic.logger.info("Error: " + error.code + " " + error.message);
      });
    };

    requestHelper.myRequestsQuery = function() {
      var query = new Parse.Query(RequestParse);
      query.descending("updatedAt");
      query.containedIn('state', ['open', 'accepted']);
      query.containedIn("author_user", [UserParse.current().id]);
      return query;
    };

    requestHelper.myRequests = function() {
      runQuery('myrequest', requestHelper.myRequestsQuery());
    };

    requestHelper.feedRequestsQuery = function() {
      var query = new Parse.Query(RequestParse);
      supersonic.logger.info("After Initiating Query.");
      query.descending("updatedAt");
      query.equalTo('state', 'open');
      query.limit(30);
      return query;
    };

    requestHelper.feedRequests = function() {
      runQuery('feedrequest', requestHelper.feedRequestsQuery());
    };

    requestHelper.acceptedRequestsQuery = function() {
      var query = new Parse.Query(RequestParse);
      query.descending("updatedAt");
      query.containedIn("accepted_user", [UserParse.current().id]);
      query.equalTo('state', 'accepted');
      return query;
    };

    requestHelper.acceptedRequests = function() {
      runQuery('acceptedrequest', requestHelper.acceptedRequestsQuery());
    };

    requestHelper.updatedRequests = function(oldReqs, newReqs) {
      var lastUpdatedTime = Date.parse(oldReqs[0].updatedAt);
      var updatedRequests = [];
      for (var i = 0; i < newReqs.length; i++) {
        if (newReqs[i].updatedAt > lastUpdatedTime) {
          updatedRequests.push(newReqs[i]);
        }
      }
      return updatedRequests;
    }

    return requestHelper;
  });
