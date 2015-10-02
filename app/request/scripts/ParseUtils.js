angular
  .module('request')
  .factory('ParseUtils', function($scope, Parse, Request) {
    var parseUtils = {}
    parseUtils.addSetterGetter = function(module, property) {
      Object.defineProperty(module.prototype, property, {
        get: function() {
          return this.get(property);
        },
        set: function(value) {
          this.set(property, value);
        }
      });
    }

    parseUtils.loadRequests = function(limit, skip=false) {
      var query = new Parse.Query(Request);
      query.descending("createdAt");
      query.limit(limit);
      if (skip === true) {
        query.skip($scope.requests.length);
      }

      query.find().then(function(requests) {
        supersonic.logger.info("----" + requests.length);
        $scope.$apply( function () {
          $scope.requests = requests;
          $scope.showSpinner = false;
        });
      },function(error) {
      });
    }

    return parseUtils;
})
