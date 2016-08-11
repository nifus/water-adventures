(function (angular, window) {

    'use strict';

    angular.module('core')
        .factory('schedulerFactory', schedulerFactory);
    schedulerFactory.$inject = ['schedulerService', '$http', 'cacheService','$templateCache'];

    function schedulerFactory(schedulerService, $http, cacheService, $templateCache) {

        return {
            getAll:getAll,
           // deleteAgent:deleteAgent,
            store:store,
           getById:getById
        };

        function getAll(){
            var cache  = cacheService(
                function(){
                    $http.get('/backend/scheduler').success(function (response) {
                        $templateCache.put('scheduler_get_all', response);

                        var result = [];
                        var i;
                        for( i in response ){
                            result.push( schedulerService(response[i]) );
                        }
                        cache.end( result );
                    }).error(function (data, code) {
                        if ( code==0 ){
                            var response = $templateCache.get('scheduler_get_all')
                            var result = [];
                            var i;
                            for( i in response ){
                                result.push( schedulerService(response[i]) );
                            }
                            cache.end( result );
                        }else{
                            cache.end({success: false, error: data});
                        }
                    })
                }, 'agent_getAllAgent', 1
            );
            return cache.promise;
        }

        function getById(id){
            var cache  = cacheService(
                function(){
                    $http.get('/backend/scheduler/'+id).success(function (response) {
                        cache.end( schedulerService(response) );
                    }).error( function(response){
                        cache.end( null );
                    })
                }, 'agent_getById'
            );
            return cache.promise;
        }/*

        function deleteAgent(id){
            var cache  = cacheService(
                function(){
                    $http.delete(window.SERVER+'/backend/agent/'+id).success(function (response) {
                        console.log(response);
                        cache.end( agentService(response) );
                    }).error( function(response){
                        cache.end( null );
                    })
                }, 'agent_getById'
            );
            return cache.promise;
        }
         */
        function store(agent){
            var cache  = cacheService(
                function(){
                    $http.post('/backend/scheduler', agent).success(function (response) {
                        cache.end( schedulerService(response) );
                    }).error( function(response){
                        cache.end( null );
                    })
                }
            );
            return cache.promise;
        }

    }


})(angular, window);



