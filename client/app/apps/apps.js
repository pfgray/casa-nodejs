'use strict';

angular.module('casaNodejsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('apps', {
        url: '/apps',
        templateUrl: 'app/apps/apps.html',
        controller: 'AppsCtrl'
      });
  });
