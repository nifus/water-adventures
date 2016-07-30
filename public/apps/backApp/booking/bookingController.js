(function () {
    'use strict';
    angular.module('backApp').controller('bookingController', bookingController);

    bookingController.$inject = ['$scope', '$q','schedulerFactory','kayakFactory','equipmentFactory','$state'];

    function bookingController($scope, $q, schedulerFactory, kayakFactory, equipmentFactory, $state) {
        $scope.env = {
            kayaks:[]
        };
        $scope.model = {};


        var schedulerPromise = schedulerFactory.getAll().then(function(response){
            $scope.env.orders = response;
        });

        var kayakPromise = kayakFactory.getAll().then(function(response){
            $scope.env.kayaks = response;
        });
        var equipmentPromise = equipmentFactory.getAll().then(function(response){
            $scope.env.equipments = response;
        });
        $q.all([schedulerPromise, kayakPromise, equipmentPromise]).then( function(){

        });

        $scope.save = function(data){
            schedulerFactory.store(data).then(function(response){
                alertify.success("Success notification");
               // $state.go('dashboard')
            });
        }




    }
})();

