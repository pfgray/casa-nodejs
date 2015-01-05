'use strict';

angular.module('casaNodejsApp')
.controller('AppsCtrl', function ($scope, $http, $stateParams, appsService, peersService) {
    $scope.apps = [];
    $scope.loadingApps = true;
    $scope.columnCount = 3;

    $scope.groupOptions = [{
        label:"By Peer",
        uisref:"apps({group:'peer'})",
        selected:$stateParams.group === 'peer'
    },{
        label:"All Apps",
        uisref:"apps({group:null})",
        selected:$stateParams.group !== 'peer'
    }];

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
            } else {
                $scope.apps = apps;
            }
            $scope.loadingApps = false;
        });
    }

    $scope.range = function(num) {
        return new Array(num);
    };

});
