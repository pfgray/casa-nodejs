import angular from 'angular';

angular.module('casaNodejsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
}])
.run(['$rootScope', function ($rootScope) {
    $rootScope.user = window.user;
}]);
