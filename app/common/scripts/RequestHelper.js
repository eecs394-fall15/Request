angular
  .module('common')
  .factory('RequestHelper', function ($rootScope, Parse, RequestParse, UserParse, supersonic) {
    var requestHelper = {};

    var runQuery = function(eventName, query) {
      query.find().then(function(requests) {
        supersonic.logger.info("Successfully retrieved " + requests.length + " requests.");
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

