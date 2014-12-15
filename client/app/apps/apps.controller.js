'use strict';

angular.module('casaNodejsApp')
.controller('AppsCtrl', function ($scope, $http, appsService) {
    $scope.apps = [];

    $scope.loadingApps = true;
    appsService.getApps(true)
    .then(function(apps){
        $scope.loadingApps = false;
        $scope.apps = apps;
    });

});
