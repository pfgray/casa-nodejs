'use strict';

angular.module('casaNodejsApp')
.controller('SingleAppCtrl', function ($scope, $http, $stateParams, appsService) {

    console.log('getting app with oid: ', $stateParams.originatorId, ' aid:', $stateParams.appId);

    appsService.getApp($stateParams.originatorId, $stateParams.appId)
    .then(function(app){
        $scope.app = app;
    })

});
