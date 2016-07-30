(function (angular, window) {
    'use strict';
    angular.module('core').service('equipmentService', equipmentService);
    equipmentService.$inject = ['$http', '$q'];

    function equipmentService($http, $q) {
        return function (data) {
            var Object = data;
            Object.waiting = false;
            Object.Begin = moment(Object.begin_rent);
            Object.End = moment(Object.end_rent);


            Object.update = function(data){
                Object.waiting = true;
                return $http.get('/backend/equipment/'+this.id,data).then(
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

