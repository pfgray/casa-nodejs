'use strict';

angular.module('casaNodejsApp')
.controller('PeersCtrl', function ($scope, $http, $stateParams, $location, $timeout) {
    $scope.peers = [];
    $scope.newPeer = {};
    $scope.errors = {};

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
            _.merge(peer, resultPeer);
            peer.updating = false;
            console.log('done');
        });
    };

    $scope.createPeer = function(peer){
        $scope.errors = {};
        $scope.creatingPeer = true;
        console.log('creating peer', peer);
        $http.post('/api/peers', peer)
        .success(function(peer){
            $scope.creatingPeer = false;
            $scope.peers.push(peer);
        })
        .error(function(errors){
            $scope.creatingPeer = false;
            console.log(errors);
            errors.forEach(function(error){
                $scope.errors[error.field] = error.error;
            });
        });
    };

    $scope.deletePeer = function(peer){
        if(window.confirm("Are you sure you want to delete " + peer.name + "?")){
            peer.deleting = true;
            $http.delete('/api/peers/' + peer._id)
            .success(function(data){
                peer.deleting = false;
                var index = $scope.peers.indexOf(peer);
                $scope.peers.splice(index, 1);
            });
        }
    };

});
