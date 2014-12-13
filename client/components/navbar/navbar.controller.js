'use strict';

angular.module('casaNodejsApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Apps',
      'link': '/apps'
    },{
      'title': 'Peers',
      'link': '/peers'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
