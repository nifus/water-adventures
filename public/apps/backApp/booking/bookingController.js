(function () {
    'use strict';
    angular.module('backApp').controller('bookingController', bookingController);

    bookingController.$inject = ['$scope', '$q', 'schedulerFactory', 'kayakFactory', 'equipmentFactory', '$state', 'paddleFactory', 'bagFactory'];

    function bookingController($scope, $q, schedulerFactory, kayakFactory, equipmentFactory, $state, paddleFactory, bagFactory) {
        $scope.env = {
            kayaks: [],
            busyKayaks: [],
            freeKayaks: [],
            price: 0,
            paddles: [],
            bags: [],
            id: $state.params.id,
            order: null
        };
        $scope.model = {
            city_of_renting: 'г. Приозерск',
            place_of_renting: 'оз. Вуокса',
            city_of_return: 'г. Приозерск',
            place_of_return: 'оз. Вуокса',
        };

        var schedulerPromise = schedulerFactory.getAll().then(function (response) {
            $scope.env.orders = response;
        });


        if ($scope.env.id) {
            schedulerFactory.getById($scope.env.id).then(function (response) {
                $scope.env.order = response;
                $scope.model = response;
                var kayaks = [];
                for (var j in $scope.model.kayak) {
                    kayaks.push($scope.model.kayak[j].id)
                }
                $scope.model.kayak = kayaks;

            })
        }


        var kayakPromise = kayakFactory.getAll().then(function (response) {
            $scope.env.kayaks = response;
        });
        var equipmentPromise = equipmentFactory.getAll().then(function (response) {
            $scope.env.equipments = response;
        });

        var bagPromise = bagFactory.getAll().then(function (response) {
            $scope.env.bags = response;
        });

        var paddlePromise = paddleFactory.getAll().then(function (response) {
            $scope.env.paddles = response;
        });

        $q.all([schedulerPromise, kayakPromise, equipmentPromise, bagPromise, paddlePromise]).then(function () {
            if (!$scope.model.id) {
                $scope.setDate(getNextWeekend().begin.toDate(), getNextWeekend().end.toDate())
            } else {

            }
        });

        $scope.save = function (data) {

            data.begin_rent = moment(data.begin_rent).format('YYYY-MM-DD');
            data.end_rent = moment(data.end_rent).format('YYYY-MM-DD');

            if ( $scope.env.id ){
                $scope.env.order.update(data).then(function (response) {
                    alertify.success("Бронь изменена");
                    $state.go('dashboard')
                });

            }else{
                schedulerFactory.store(data).then(function (response) {
                    alertify.success("Бронь добавлена");
                    $state.go('dashboard')
                });
            }

        };

        $scope.changeDate = function () {
            $scope.setDate($scope.model.begin_rent, $scope.model.end_rent)
        };
        $scope.updatePrice = function () {
            var selected_kayaks = [];
            for (var i in  $scope.env.kayaks) {
                if ($scope.model.kayak.indexOf($scope.env.kayaks[i].id) != -1) {
                    selected_kayaks.push($scope.env.kayaks[i])
                }
            }
            $scope.env.price = updatePrice($scope.model.begin_rent, $scope.model.end_rent, selected_kayaks, $scope.model.old_client)
        };

        function updatePrice(begin, end, selected_kayaks, is_old_client) {
            var price = 0;
            var number_of_days = moment(end).diff(begin, 'days');
            var number_on_days = 0;
            var number_off_days = 0;

            for (var i = 0; i <= number_of_days; i++) {
                if (isWeekend(moment(begin).add(i, 'days'))) {
                    number_off_days++;
                } else {
                    number_on_days++;
                }
            }
            for (var i in selected_kayaks) {
                var kayak_price = selected_kayaks[i].price;
                price = price + (kayak_price * number_off_days) + ( (kayak_price / 2) * number_on_days )
            }
            if (number_of_days > 4) {
                price = price - (price / 100) * 10;
            }

            if (is_old_client == true) {
                price = price - (price / 100) * 5;
            }
            return price;
        }

        $scope.setDate = function (start, end) {
            $scope.model.begin_rent = start;
            if (moment(start).isAfter(end) || end == undefined) {
                $scope.model.end_rent = moment(start).add(2, 'days').toDate();
            } else {
                $scope.model.end_rent = end;
            }


            var startMoment = moment(start).subtract(1, 'hour');
            var endMoment = moment(end).add(1, 'hour');
            $scope.env.busyKayaks = $scope.env.orders.filter(function (order) {

                if (order.status == 'canceled' || order.status == 'closed') {
                    return false;
                }
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
            updatePrice($scope.model.begin_rent, $scope.model.end_rent, $scope.model.kayak)

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

        $scope.isFreeKayak = function (kayak) {
            for (var i in $scope.env.freeKayaks) {
                if ($scope.env.freeKayaks[i].id == kayak.id) {
                    return true;
                }
            }
            return false;
        }

        function getNextWeekend() {
            var date = moment();
            var day = date.day();
            if (day == 6) {
                return {
                    begin: date.subtract('1', 'days'),
                    end: moment(date).add('3', 'days')
                };
            } else if (day == 7) {
                return {
                    begin: date.subtract('2', 'days'),
                    end: moment(date).add('3', 'days')
                };
            } else {
                return {
                    begin: date.add(5 - day, 'days'),
                    end: moment(date).add(7 - day, 'days')
                };
            }
        }

        function isWeekend(date) {
            var day = moment(date).format('d');
            if (day == 0 || day == 6) {
                return true;
            }
            return false
        }

    }
})();

