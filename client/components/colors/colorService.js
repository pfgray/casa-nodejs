'use strict';

angular.module('casaNodejsApp').service('colorService', function () {
    var colorService = {};

    var colors = [
        '#8CD4D8',
        '#8CD891',
        '#D8D38C',
        '#D88C8C',
        '#8F8CD8',
        '#CF8CD8'
    ];

    var hash = function(string) {
        var hash = 0, i, chr, len;
        if (string.length == 0) return hash; 
        for (i = 0, len = string.length; i < len; i++) {
            chr   = string.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    colorService.getRandomColor = function(){
        return colors[Math.floor(Math.random() * 6)];
    }

    colorService.getColorForHash = function(input){
        var number = Math.abs(hash(input));
        return colors[Math.floor(number % colors.length)];
    }

    return colorService;
});
