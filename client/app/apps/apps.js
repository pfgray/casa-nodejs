'use strict';

angular.module('casaNodejsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('apps', {
        url: '/apps?group',
        templateUrl: 'app/apps/apps.html',
        controller: 'AppsCtrl'
      })
      .state('singleApp', {
        url: '/apps/:originatorId/:appId',
        templateUrl: 'app/apps/single/singleApp.html',
        controller: 'SingleAppCtrl'
      });
  });
