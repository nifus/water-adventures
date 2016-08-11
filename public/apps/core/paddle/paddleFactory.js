(function (angular, window) {

    'use strict';

    angular.module('core')
        .factory('paddleFactory', paddleFactory);
    paddleFactory.$inject = ['$http', 'cacheService','$templateCache'];

    function paddleFactory( $http, cacheService, $templateCache) {

        return {
            getAll:getAll
        };

        function getAll(){
            var cache  = cacheService(
                function(){
                    $http.get('/backend/paddle').success(function (response) {
                        var result = [];
                        var i;
                        for( i in response ){
                            result.push( (response[i]) );
                        }
                        $templateCache.put('paddle_get_all', result);
                        cache.end( result );
                    }).error(function (data, code) {
                        if ( code==0 ){
                            cache.end( $templateCache.get('paddle_get_all') );
                        }else{
                            cache.end({success: false, error: data});
                        }
                    })
                }, 'paddle_getAll', 1
            );
            return cache.promise;
        }
    }
})(angular, window);



