'use strict';

angular.module('casaNodejsApp')
.controller('AppsCtrl', function ($scope, $http, colorService) {
    $scope.apps = [];

    $http.get('/api/apps').success(function(apps) {
        $scope.apps = apps;
        for(var i=0; i<apps.length; i++){
            apps[i].color = colorService.getColorForHash(JSON.stringify(apps[i].identity));
        }
    });

});
