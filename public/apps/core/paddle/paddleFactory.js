(function (angular, window) {

    'use strict';

    angular.module('core')
        .factory('paddleFactory', paddleFactory);
    paddleFactory.$inject = ['$http', 'cacheService'];

    function paddleFactory( $http, cacheService) {

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
                        cache.end( result );
                    }).error(function (data, code) {
                        cache.end({success: false, error: data.error});
                    })
                }, 'paddle_getAll', 1
            );
            return cache.promise;
        }
    }
})(angular, window);



