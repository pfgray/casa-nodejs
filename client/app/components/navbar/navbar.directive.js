import navbarTemplate from './navbar.jade';

angular.module('casaNodejsApp')
  .directive('casaNavbar', function ($rootScope, $location) {
    return {
      template: navbarTemplate(),
      link:function(scope, element, attrs) {
        scope.menu = [{
          'title': 'Home',
          'link': '/'
        }];

        if($rootScope.user){
          scope.menu.push({
            'title': 'Apps',
            'link': '/apps'
          },{
            'title': 'Peers',
            'link': '/peers'
          },{
            'title': 'Logout',
            onClick: function(){
              window.location.href = '/api/logout';
            }
          });
          scope.user = $rootScope.user;
        } else {
          scope.menu.push({
            title: 'Login',
            onClick: function(){
              window.location.href = '/auth/google';
            }
          });
        }

        scope.isCollapsed = true;

        scope.isActive = function(route) {
          return route === $location.path();
        };
      }
    };
  });
