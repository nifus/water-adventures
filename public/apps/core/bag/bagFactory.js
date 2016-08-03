(function (angular, window) {

    'use strict';

    angular.module('core')
        .factory('bagFactory', bagFactory);
    bagFactory.$inject = ['$http', 'cacheService'];

    function bagFactory( $http, cacheService) {

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
                        cache.end( result );
                    }).error(function (data, code) {
                        cache.end({success: false, error: data.error});
                    })
                }, 'bag_getAll', 1
            );
            return cache.promise;
        }



    }


})(angular, window);



