angular
  .module('feed')
  .controller('IndexController', function($scope, supersonic) {
      $scope.requests = [
        {
          title: "Borrow a pen",
          description: "I'd like to borrow a green pen to finish my homework",
          during: "1"
        },
        {
          title: "Borrow a textbook",
          description: "I will be in class A but I forgot my textbook. Could someone give me a hand? Thanks",
          during: "3"
        },
        {
          title: "Need a computer to run a test program",
          description: "I need a computer to run my test program, just need to use it to login my email and download some file",
          during: "10"
        }
      ]
  });
