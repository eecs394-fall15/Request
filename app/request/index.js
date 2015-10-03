angular.module('request', [
  /* Declare any module-specific dependencies here */
  'common'
]).run(function($rootScope) {
   Parse.initialize("MP05tzxml3Oz3OOaiR7MNftihqGiq0vgVLPrTXNv", "hRx6JpaHSfJZy3XjcrVD66XlLUJ8bJDuCheJbkOT", "Y7FvCOH4FT8mwQSSkykMebaRpKn4ToJTbbfVEMqi");
   $rootScope.sessionUser = Parse.User.current();
});
