(function (angular, window) {
    'use strict';
    angular.module('core').service('schedulerService', schedulerService);
    schedulerService.$inject = ['$http', '$q'];

    function schedulerService($http, $q) {
        return function (data) {
            var Object = data;
            Object.waiting = false;
            Object.Begin = moment(Object.begin_rent);
            Object.BeginShort = Object.Begin.format('DD MMM(ddd)');
            Object.End = moment(Object.end_rent);
            Object.EndShort = Object.End.format('DD MMM(ddd)');




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


            Object.updateNote = function(note){
                Object.waiting = true;
                return $http.put('/backend/scheduler/'+this.id+'/note',{note:note}).then(
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

