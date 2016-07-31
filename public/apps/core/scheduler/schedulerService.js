(function (angular, window) {
    'use strict';
    angular.module('core').service('schedulerService', schedulerService);
    schedulerService.$inject = ['$http', '$q'];

    function schedulerService($http, $q) {
        return function (data) {
            var Object = data;
            Object.waiting = false;
            Object.Begin = moment(Object.begin_rent);
            Object.End = moment(Object.end_rent);




            Object.setWorkingStatus = function(data){
                Object.waiting = true;
                return $http.put('/backend/scheduler/'+this.id+'/status',{status:'working'}).then(
                    function(response){
                        Object.waiting = false;
                        Object.status = 'working';

                        return response.data;
                    }
                )
            };

            Object.setClosedStatus = function(data){
                Object.waiting = true;
                return $http.put('/backend/scheduler/'+this.id+'/status',{status:'closed'}).then(
                    function(response){
                        Object.waiting = false;
                        Object.status = 'closed';
                        return response.data;
                    }
                )
            };

            return Object;
        }
    }
})(angular, window);

