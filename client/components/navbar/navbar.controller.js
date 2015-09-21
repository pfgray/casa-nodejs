'use strict';

angular.module('casaNodejsApp')
  .controller('NavbarCtrl', function ($rootScope, $scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    if($rootScope.user){
      $scope.menu.push({
        'title': 'Apps',
        'link': '/apps'
      },{
        'title': 'Peers',
        'link': '/peers'
      });
    } else {
      $scope.menu.push({
        title: 'Login',
        onClick: function(){
          window.location.href = '/auth/google';
        }
      });
    }

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
