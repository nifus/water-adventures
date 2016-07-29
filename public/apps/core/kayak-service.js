(function () {
    'use strict';

    angular
        .module('schedulerApp')
        .factory('kayakService', kayakService);

    kayakService.$inject = ['$http'];
    function kayakService($http) {
        var service = {};
        service.create = create;
        return service;


        function create() {
            return new Kayak({'$http':$http});
        }
    }

    function Kayak(services) {
        this.services = services;

        this.canoes = null;
        this.busy = null;
    }

    Kayak.prototype = {

        getAll: function (callback) {
            this.services.$http.get('/kayak').success(function(data){
                var result=[];
                var kayaks = data;
                angular.forEach(kayaks, function(kayak){
                    var i;
                    for( i=0; i<kayak.number; i++){
                        result.push(kayak)
                    }
                });
                callback({success:true, data:result})
            }).error( function(){
                callback({success:false})
            })
        },

        isBusy: function (date) {

        }
    }
})();