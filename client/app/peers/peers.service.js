'use strict';

angular.module('casaNodejsApp')
.service('peersService', function ($http, $q, $timeout, colorService) {
    
    var PeerService = {};
    var peerCache = null;

    PeerService.getPeers = function(refresh){
        var deferred = $q.defer();
        if(!refresh && peerCache !== null){
            $timeout(function(){
                deferred.resolve(peerCache);
            });
        } else {
            $http.get('/api/peers')
            .success(function(peers) {
                peerCache = peers;
                deferred.resolve(peers);
                _.each(peers, function(peer){
                    _.each(peer.apps, function(app){
                        app.color = colorService.getColorForHash(JSON.stringify(app.identity));
                    });
                });
            })
            .error(function(error){
                deferred.reject(error);
            });
        }
        return deferred.promise;
    }

    return PeerService;

});
