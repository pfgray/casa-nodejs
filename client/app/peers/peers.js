'use strict';

angular.module('casaNodejsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('peers', {
        url: '/peers',
        templateUrl: 'app/peers/peers.html',
        controller: 'PeersCtrl'
      });
  });
