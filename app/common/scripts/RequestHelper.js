angular
  .module('common')
  .factory('RequestHelper', function ($rootScope, Parse, RequestParse, UserParse, supersonic) {
    var requestHelper = {};

    var runQuery = function(eventName, query) {
      query.find().then(function(requests) {
        supersonic.logger.info("Successfully retrieved " +
            requests.length + " requests for event " + eventName + ".");
        $rootScope.$broadcast(eventName, requests);
      },function(error) {
        supersonic.logger.info("Error: " + error.code + " " + error.message);
      });
    };

    requestHelper.myRequestsQuery = function() {
      var query = new Parse.Query(RequestParse);
      query.descending("createdAt");
      query.notEqualTo('state', 'closed');
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
      query.limit(30);
      query.equalTo('state', 'open');
      return query;
    };

    requestHelper.feedRequests = function() {
      runQuery('feedrequest', requestHelper.feedRequestsQuery());
    };

    requestHelper.acceptedRequestsQuery = function() {
      var query = new Parse.Query(RequestParse);
      query.descending("createdAt");
      query.containedIn("accepted_user", [UserParse.current().id]);
      query.equalTo('state', 'accepted');
      return query;
    };

    requestHelper.acceptedRequests = function() {
      runQuery('acceptedrequest', requestHelper.acceptedRequestsQuery());
    };

    requestHelper.diffRequests = function(oldReqs, newReqs) {
      var lastUpdatedTime = oldReqs[0].updatedAt;
      for (var i = 0; i < newReqs.length; i++) {
        if (newReqs[i].updatedAt <= lastUpdatedTime) {
          return newReqs.slice(0, i);
        }
      }
      return newReqs;
    }

    return requestHelper;
  });
