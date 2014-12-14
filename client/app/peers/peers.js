'use strict';

angular.module('casaNodejsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('peers', {
        url: '/peers',
        templateUrl: 'app/peers/peers.html',
        controller: 'PeersCtrl'
      })
      .state('createPeer', {
        url: '/peers/new',
        templateUrl: 'app/peers/newPeer.html'
      });

  });
