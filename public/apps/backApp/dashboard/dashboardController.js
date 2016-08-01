(function () {
    'use strict';
    angular.module('backApp').controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$scope', '$q', 'schedulerFactory', 'kayakFactory'];

    function dashboardController($scope, $q, schedulerFactory, kayakFactory) {
        $scope.env = {
            loading: true,
            calendar: {},
            promises: $scope.$parent.promises,
            weekend: getNextWeekend(),
            hideCalendar: false,
            orders: [],
            busyKayaks: [],
            freeKayaks: [],
            begin_task: null,
            end_task: null,
            tasks:[]
        };


        //$scope.env.promises.push(schedulerPromise);

        /* $q.all([agentsPromise]).then(function () {
         deferred.resolve();
         });*/
        $scope.changeDate = function () {
            $scope.setDate($scope.env.startDate, $scope.env.endDate)
        }

        $scope.setDate = function (start, end) {

            if ( moment(start).isAfter(end) ){
                end = start
            }
            $scope.env.weekend = moment(start, 'D-MM-YYYY').add(2, 'days');
            $scope.env.calendar = generateCalendar($scope.env.weekend);
            $scope.env.hideCalendar = true;

            $scope.env.startDate = start;
            $scope.env.endDate = end;


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

        };


        function generateCalendar(nextWeekend) {
            var result = {};
            var months = [4, 5, 6, 7, 8, 9, 10];
            var year = moment().format('YYYY');
            var start = null;
            var end = null;
            var now_m = moment().format('M') * 1;
            for (var i in months) {
                if (now_m > months[i]) {
                    continue;
                }
                for (var j = 0; j <= 4; j++) {

                    var day = moment((j * 7) + 1 + '.' + months[i] + '.' + year, 'D-MM-YYYY').day();
                    if (day == 5) {
                        //пятница
                        start = moment((j * 7) + 1 + '.' + months[i] + '.' + year, 'D-MM-YYYY');
                        end = moment((j * 7) + 1 + '.' + months[i] + '.' + year, 'D-MM-YYYY').add(4, 'days')
                    } else if (day < 5) {
                        start = moment((j * 7) + 1 + '.' + months[i] + '.' + year, 'D-MM-YYYY').add(5 - day, 'days');
                        end = moment((j * 7) + 1 + '.' + months[i] + '.' + year, 'D-MM-YYYY').add((5 - day) + 4, 'days')

                    } else if (day > 5) {
                        start = moment((j * 7) + 1 + '.' + months[i] + '.' + year, 'D-MM-YYYY').add(day - 5, 'days');
                        end = moment((j * 7) + 1 + '.' + months[i] + '.' + year, 'D-MM-YYYY').add((day - 5) + 4, 'days')
                    }
                    if (start.month() + 1 != months[i]) {
                        continue;
                    }
                    var key = start.format('MMMM');
                    if (result[key] == undefined) {
                        result[key] = [];
                    }
                    result[key].push(
                        {
                            isNow: nextWeekend.isBetween(start, end),
                            display: ( start.format('DD') + ' - ' + end.format('DD MMM')),
                            start: start.format('DD-MM-YYYY'),
                            end: end.format('DD-MM-YYYY')
                        }
                    )
                }


            }
            return result;

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


        var schedulerPromise = schedulerFactory.getAll().then(function (response) {
            $scope.env.orders = response;
        })

        var kayakPromise = kayakFactory.getAll().then(function (response) {
            $scope.env.kayaks = response;
        });
        $q.all([schedulerPromise, kayakPromise]).then(function () {

            $scope.setDate($scope.env.weekend.begin.toDate(), $scope.env.weekend.end.toDate());
            $scope.env.freeKayaks = getFreeKayaks($scope.env.busyKayaks, $scope.env.kayaks);

            $scope.setTaskDate(moment().toDate(), moment().add(1,'days').toDate());

        });


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

        $scope.setWorkStatus = function(order){
            alertify.confirm("Уверен ли ты работник, что заказ у клиента?", function (e) {
                if (e) {
                    order.setWorkingStatus()
                }
            });
        }
        $scope.setCloseStatus = function(order){
            alertify.confirm("Уверен ли ты работник, что клиент вернул тебе все и не спиздил ни грамма?", function (e) {
                if (e) {
                    order.setClosedStatus()
                }
            });
        }

        $scope.changeTaskDate = function(){
            $scope.setTaskDate($scope.env.begin_task, $scope.env.end_task)
        }

        $scope.setTaskDate = function (start, end) {

            if ( moment(start).isAfter(end) ){
                end = start
            }
            $scope.env.weekend = moment(start, 'D-MM-YYYY').add(1, 'days');

            $scope.env.begin_task = start;
            $scope.env.end_task = end;


            var startMoment = moment(start).subtract(1, 'hour');
            var endMoment = moment(end).add(1, 'hour');
            console.log($scope.env.orders)
            $scope.env.tasks = $scope.env.orders.filter(function (order) {
                if (order.Begin.isBetween(startMoment, endMoment)) {
                    return true
                }
                if (order.End.isBetween(startMoment, endMoment)) {
                    return true
                }

                return false;
            });
            console.log($scope.env.tasks)
            //$scope.env.freeKayaks = getFreeKayaks($scope.env.busyKayaks, $scope.env.kayaks);

        };
    }
})();

