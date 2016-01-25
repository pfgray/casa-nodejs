import appsTemplate from './apps.jade';
import singleAppTemplate from './single/singleApp.jade';

angular.module('casaNodejsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('apps', {
        url: '/apps?group',
        template: appsTemplate(),
        controller: 'AppsCtrl'
      })
      .state('singleApp', {
        url: '/apps/:originatorId/:appId',
        template: singleAppTemplate(),
        controller: 'SingleAppCtrl'
      });
  });
