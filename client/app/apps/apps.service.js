'use strict';

angular.module('casaNodejsApp')
.service('appsService', function ($http, $q, $timeout, colorService) {
    
    var AppService = {};
    var appsCache = null;

    AppService.getApps = function(refresh){
        var deferred = $q.defer();
        if(!refresh && appsCache !== null){
            $timeout(function(){
                deferred.resolve(appsCache);
            });
        } else {
            $http.get('/api/apps')
            .success(function(apps) {
                for(var i=0; i<apps.length; i++){
                    apps[i].color = colorService.getColorForHash(JSON.stringify(apps[i].identity));
                }
                appsCache = apps;
                deferred.resolve(apps);
            })
            .error(function(error){
                deferred.reject(error);
            });
        }
        return deferred.promise;
    }

    AppService.getApp = function(originatorId, appId, refresh){
        var deferred = $q.defer();
        if(!refresh && appsCache !== null){
            for(var i=0; i<appsCache.length; i++){
                if(appsCache[i].identity.originator_id === originatorId
                    && appsCache[i].identity.id === appId){
                    $timeout(function(){
                        deferred.resolve(appsCache[i]);
                    });
                    return deferred.promise;
                }
            }
        } else {
            $http.get('/api/apps/' + originatorId + '/' + appId)
            .success(function(app) {
                app.color = colorService.getColorForHash(JSON.stringify(app.identity));
                deferred.resolve(app);
            })
            .error(function(error){
                deferred.reject(error);
            });
        }
        return deferred.promise;
    }

    return AppService;

});
