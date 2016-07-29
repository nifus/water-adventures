(function (angular, window) {
    'use strict';
    angular.module('core').service('kayakService', kayakService);
    kayakService.$inject = ['$http', '$q'];

    function kayakService($http, $q) {
        return function (data) {
            var Object = data;
            Object.waiting = false;
            Object.Begin = moment(Object.begin_rent);
            Object.End = moment(Object.end_rent);


            Object.update = function(data){
                Object.waiting = true;
                return $http.get('/backend/kayak/'+this.id,data).then(
                    function(response){
                        Object.waiting = false;
                        return response.data;
                    }
                )
            };

            return Object;
        }
    }
})(angular, window);

