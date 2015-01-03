'use strict';

angular.module('casaNodejsApp')
.controller('AppsCtrl', function ($scope, $http, $stateParams, appsService, peersService) {
    $scope.apps = [];
    $scope.loadingApps = true;

    $scope.groupOptions = [{
        label:"By Peer",
        uisref:"apps({group:'peer'})",
        selected:$stateParams.group === 'peer'
    },{
        label:"All Apps",
        uisref:"apps({group:null})",
        selected:$stateParams.group !== 'peer'
    }];
    console.log('got:', $scope.groupOptions)

    if($stateParams.group === 'peer'){
        $scope.group = "peer";
        peersService.getPeers(true)
        .then(function(peers){
            $scope.peers = peers;
            $scope.loadingApps = false;
            if(peers.length < 1){ //TODO: does this make sense?
                $scope.noApps = true;
            }
        }, function(error){
            $scope.loadingApps = false;
            console.error("Error requesting peers:", error);
        });
    } else {
        appsService.getApps(true)
        .then(function(apps){
            if(apps.length < 1){
                $scope.noApps = true;
            }
            $scope.loadingApps = false;
            $scope.apps = apps;
        });
    }

});
