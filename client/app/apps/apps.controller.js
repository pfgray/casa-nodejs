'use strict';

angular.module('casaNodejsApp')
  .controller('AppsCtrl', function ($scope, $http) {
    $scope.apps = [];

    $http.get('/api/apps').success(function(apps) {
      $scope.apps = apps;
    });

  });
