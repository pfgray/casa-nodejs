'use strict';

angular.module('casaNodejsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/issues').success(function(issues) {

        $scope.issueRows = [];

        var currentRow = [];
        _.each(issues.casa_modules, function(module){
            console.log('adding: ', module);
            currentRow.push(module);
            if(currentRow.length > 2){
                $scope.issueRows.push(currentRow);
                currentRow = [];
            }
        });
        if(currentRow.length > 0){
            $scope.issueRows.push(currentRow);
        }
    });

  });
