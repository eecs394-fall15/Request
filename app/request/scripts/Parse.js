angular
  .module('request')
  .factory('Parse', function () {
    Parse.initialize("MP05tzxml3Oz3OOaiR7MNftihqGiq0vgVLPrTXNv", "hRx6JpaHSfJZy3XjcrVD66XlLUJ8bJDuCheJbkOT", "Y7FvCOH4FT8mwQSSkykMebaRpKn4ToJTbbfVEMqi");
    return Parse;
});
