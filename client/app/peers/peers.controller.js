'use strict';

angular.module('casaNodejsApp')
.controller('PeersCtrl', function ($scope, $http) {
    $scope.peers = [];

    $http.get('/api/peers').success(function(peers) {
        $scope.peers = peers;
    });

});
