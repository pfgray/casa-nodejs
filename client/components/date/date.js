'use strict';

angular.module('casaNodejsApp')
.filter('fromNow', function () {
    return function(input){
        return moment(input).fromNow();
    }
});
