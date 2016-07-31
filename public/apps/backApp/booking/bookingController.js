(function () {
    'use strict';
    angular.module('backApp').controller('bookingController', bookingController);

    bookingController.$inject = ['$scope', '$q', 'schedulerFactory', 'kayakFactory', 'equipmentFactory', '$state'];

    function bookingController($scope, $q, schedulerFactory, kayakFactory, equipmentFactory, $state) {
        $scope.env = {
            kayaks: [],
            busyKayaks:[],
            freeKayaks:[]
        };
        $scope.model = {};


        var schedulerPromise = schedulerFactory.getAll().then(function (response) {
            $scope.env.orders = response;
        });

        var kayakPromise = kayakFactory.getAll().then(function (response) {
            $scope.env.kayaks = response;
        });
        var equipmentPromise = equipmentFactory.getAll().then(function (response) {
            $scope.env.equipments = response;
        });
        $q.all([schedulerPromise, kayakPromise, equipmentPromise]).then(function () {

        });

        $scope.save = function (data) {
            data.begin_rent = moment(data.begin_rent).format('YYYY-MM-DD');
            data.end_rent = moment(data.end_rent).format('YYYY-MM-DD');
            schedulerFactory.store(data).then(function (response) {
                alertify.success("Бронь добавлена");
                $state.go('dashboard')
            });
        };

        $scope.changeDate = function(){
            $scope.setDate($scope.model.begin_rent, $scope.model.end_rent)

        };

        $scope.setDate = function (start, end) {

            if ( moment(start).isAfter(end) || end==undefined ){
                $scope.model.end_rent = moment(start).add(2,'days').toDate();
            }




            var startMoment = moment(start).subtract(1, 'hour');
            var endMoment = moment(end).add(1, 'hour');
            $scope.env.busyKayaks = $scope.env.orders.filter(function (order) {
                if (order.Begin.isBetween(startMoment, endMoment)) {
                    return true
                }
                if (order.End.isBetween(startMoment, endMoment)) {
                    return true
                }

                if (order.Begin.isSameOrBefore(startMoment) && order.End.isSameOrAfter(endMoment)) {
                    return true
                }


                return false;
            });
            $scope.env.freeKayaks = getFreeKayaks($scope.env.busyKayaks, $scope.env.kayaks);
            console.log($scope.env.busyKayaks)
            console.log($scope.env.freeKayaks)

        };

        function getFreeKayaks(orders, kayaks) {
            return $scope.env.kayaks.filter(function (kayak) {
                for (var i in orders) {
                    var order = orders[i];
                    for (var j in order.kayak) {
                        var busy = order.kayak[j];
                        if (busy.id == kayak.id) {
                            return false;
                        }
                    }
                }
                return true;
            })
        }
        $scope.isFreeKayak = function(kayak){
            for( var i in $scope.env.freeKayaks ){
                if ( $scope.env.freeKayaks[i].id==kayak.id ){
                    return true;
                }
            }
            return false;
        }

    }
})();

