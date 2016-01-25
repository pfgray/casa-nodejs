'use strict';

angular.module('casaNodejsApp')
.filter('fromNow', function () {
    return function(input){
        if(input === null){
            return 'never';
        } else {
            return moment(input).fromNow();
        }
    }
});
