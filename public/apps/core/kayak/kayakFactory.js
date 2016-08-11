(function (angular, window) {

    'use strict';

    angular.module('core')
        .factory('kayakFactory', kayakFactory);
    kayakFactory.$inject = ['kayakService', '$http', 'cacheService','$templateCache'];

    function kayakFactory(kayakService, $http, cacheService, $templateCache) {

        return {
            getAll:getAll,
           // deleteAgent:deleteAgent,
            //store:store,
           // getById:getById
        };

        function getAll(){
            var cache  = cacheService(
                function(){
                    $http.get('/backend/kayak').success(function (response) {
                        var result = []; var i;
                        for( i in response ){
                            result.push( kayakService(response[i]) );
                        }
                        $templateCache.put('kayak_get_all', result);
                        cache.end( result );

                    }).error(function (data, code) {
                      if ( code==0 ){
                          cache.end( $templateCache.get('kayak_get_all') );
                      }else{
                          cache.end({success: false, error: data});
                      }
                    })
                }, 'kayak_get_all', 1
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



