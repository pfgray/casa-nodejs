import peersTemplate from './peers.jade';

angular.module('casaNodejsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('peers', {
        url: '/peers?new',
        template: peersTemplate(),
        controller: 'PeersCtrl'
      });

  });
