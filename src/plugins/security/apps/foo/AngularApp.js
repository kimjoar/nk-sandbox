import angular from 'angular'

const myApp = angular.module('myApp', []);

myApp.controller('FooController', function($scope, $timeout) {
  $scope.phones = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];

  $timeout(() => {
    $scope.phones.push({
      name: 'asdf',
      snippet: 'lorem ipsum.'
    })
  }, 1000)
});

export default myApp;
