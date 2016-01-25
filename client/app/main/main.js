import mainTemplate from './main.jade';

angular.module('casaNodejsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        template: mainTemplate(),
        controller: 'MainCtrl'
      });
  });
