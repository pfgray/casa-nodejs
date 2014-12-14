'use strict';

angular.module('casaNodejsApp')
.controller('PeersCtrl', function ($scope, $http, $stateParams, $location, $timeout) {
    $scope.peers = [];
    $scope.newPeer = {};

    if($stateParams.new === 'true'){
        $timeout(function(){
            $scope.$broadcast('focusTitle');
        });
    }

    $http.get('/api/peers').success(function(peers) {
        $scope.peers = peers;
    });

    $scope.updatePeer = function(peer){
        peer.updating = true;
        $http.post('/api/peers/' + peer._id + '/updates', {})
        .success(function(resultPeer){
            //peer = resultPeer; TODO: why doesn't this work??
            peer.last_updated = resultPeer.last_updated;
            peer.updating = false;
        });
    }

    $scope.createPeer = function(peer){
        $scope.creatingPeer = true;
        console.log('creating peer', peer);
        $timeout(function(){
            $scope.creatingPeer = false;
        }, 1000);
    }

});
