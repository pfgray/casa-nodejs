'use strict';

angular.module('casaNodejsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('peers', {
        url: '/peers?new',
        templateUrl: 'app/peers/peers.html',
        controller: 'PeersCtrl'
      });

  });
