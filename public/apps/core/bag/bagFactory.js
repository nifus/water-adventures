(function (angular, window) {

    'use strict';

    angular.module('core')
        .factory('bagFactory', bagFactory);
    bagFactory.$inject = ['$http', 'cacheService','$templateCache'];

    function bagFactory( $http, cacheService, $templateCache) {

        return {
            getAll:getAll
        };

        function getAll(){
            var cache  = cacheService(
                function(){
                    $http.get('/backend/bag').success(function (response) {
                        var result = [];
                        var i;
                        for( i in response ){
                            result.push( (response[i]) );
                        }
                        $templateCache.put('bag_get_all', result);

                        cache.end( result );
                    }).error(function (data, code) {
                        if ( code==0 ){
                            cache.end( $templateCache.get('bag_get_all') );
                        }else{
                            cache.end({success: false, error: data});
                        }
                    })
                }, 'bag_getAll', 1
            );
            return cache.promise;
        }



    }


})(angular, window);



