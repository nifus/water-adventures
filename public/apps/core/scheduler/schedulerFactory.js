(function (angular, window) {

    'use strict';

    angular.module('core')
        .factory('schedulerFactory', schedulerFactory);
    schedulerFactory.$inject = ['schedulerService', '$http', 'cacheService'];

    function schedulerFactory(schedulerService, $http, cacheService) {

        return {
            getAll:getAll,
           // deleteAgent:deleteAgent,
            //store:store,
           // getById:getById
        };

        function getAll(){
            var cache  = cacheService(
                function(){
                    $http.get('/backend/scheduler').success(function (response) {
                        var result = [];
                        var i;
                        for( i in response ){
                            result.push( schedulerService(response[i]) );
                        }
                        cache.end( result );
                    }).error(function (data, code) {
                        cache.end({success: false, error: data.error});
                    })
                }, 'agent_getAllAgent', 1
            );
            return cache.promise;
        }

        /*function getById(id){
            var cache  = cacheService(
                function(){
                    $http.get(window.SERVER+'/backend/agent/'+id).success(function (response) {
                        cache.end( agentService(response) );
                    }).error( function(response){
                        cache.end( null );
                    })
                }, 'agent_getById'
            );
            return cache.promise;
        }

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

        function store(agent){
            var cache  = cacheService(
                function(){
                    $http.put(window.SERVER+'/backend/agent', agent).success(function (response) {
                        cache.end( agentService(response) );
                    }).error( function(response){
                        cache.end( null );
                    })
                }
            );
            return cache.promise;
        }*/

    }


})(angular, window);



