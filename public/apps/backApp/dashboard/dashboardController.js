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
            total:0,
            busyKayaks: [],
            freeKayaks: [],
            begin_task: null,
            end_task: null,
            tasks: [],
            total_tasks: 0,
            transfers:[],
            action: 'orders',
            startDate: null,
            endDate:null,
            waiting_orders:[]
        };


        //$scope.env.promises.push(schedulerPromise);

        /* $q.all([agentsPromise]).then(function () {
         deferred.resolve();
         });*/
        $scope.setToday = function () {
            $scope.setDate(moment().toDate(), moment().toDate())
        };
        $scope.setTomorrow = function () {
            $scope.setDate(moment().add(1,'day').toDate(), moment().add(1,'day').toDate())
        };

        $scope.setCurrentHolidays = function () {
            var now = moment();
            var day_of_week = now.format('E');
            var start, end;
            if ( day_of_week<5 ){
                start = moment().add((5-day_of_week) ,'days');
                end = moment().add((7-day_of_week), 'days');
            }else if( day_of_week>=5 ){
                start = moment().subtract(day_of_week-5 ,'days');
                end = moment().subtract(day_of_week-7 ,'days');
            }
            $scope.setDate(start.toDate(), end.toDate())
        };

        $scope.setNextHolidays = function () {
            var now = moment();
            var day_of_week = now.format('E');
            var start, end;
            if ( day_of_week<5 ){
                start = moment().add((5-day_of_week) ,'days');
                end = moment().add((7-day_of_week), 'days');
            }else if( day_of_week>=5 ){
                start = moment().subtract(day_of_week-5 ,'days');
                end = moment().subtract(day_of_week-7 ,'days');
            }
            $scope.setDate(start.toDate(), end.toDate())
        };

        $scope.changeDate = function () {
            $scope.setDate($scope.env.startDate, $scope.env.endDate)
        };

        function updateTransfers() {
            var count =  moment($scope.env.endDate).diff( moment($scope.env.startDate), 'days' )+1;
            var total_tasks = 0;
            var date;
            var tasks;
            var total = [];
            for( var i=0; i<count; i++ ){
                date = moment($scope.env.startDate).add(i,'days');
                tasks = [];
                $scope.env.busyKayaks.forEach(function (order) {
                    if (order.status=='canceled' || order.status=='waiting' ){
                        return;
                    }
                    if ( moment(order.begin_rent).isSame(date,'day')==true ){
                        if ( order.status=='working' ||  order.status=='closed'){
                            tasks.push( {type:'closed', order: order} );
                            total_tasks++;
                        }else{
                            if ( order.delivery_from=='1' ){
                                tasks.push( {type:'transfer_to', order: order} );
                                total_tasks++;
                            }else{
                                tasks.push( {type:'order_to', order: order} );
                                total_tasks++;
                            }
                        }

                    }

                    if ( moment(order.end_rent).isSame(date,'day')==true ){

                        if ( order.status=='closed'){
                            tasks.push( {type:'closed', order: order} );
                            total_tasks++;
                        }else{
                            if ( order.delivery_to=='1' ){
                                tasks.push( {type:'transfer_from', order: order} );
                                total_tasks++;
                            }else{
                                tasks.push( {type:'order_from', order: order} );
                                total_tasks++;
                            }
                        }


                    }

                });
                total.push({date:date.format('dddd, D MMM'), tasks:tasks})
            }

            $scope.env.tasks = total;
            $scope.env.total_tasks = total_tasks;


            //console.log(total)
        }

        function updateTotal(orders) {
            var total = 0;
            for( var i in orders ){
                var order = orders[i];
                if ( order.status!='canceled' && order.status!='waiting' ){
                    total+=parseFloat(order.price);
                }
            }
            $scope.env.total = total;
        }

        $scope.setAction = function (action) {
            $scope.env.action = action;
        }
        $scope.changeStatus = function (status) {
            if (status == '') {
                $scope.changeDate()
            } else {
                $scope.env.busyKayaks = $scope.env.orders.filter(function (order) {
                    if (order.status == status) {
                        return true
                    }
                    return false;
                });
            }
        };

        $scope.setDate = function (start, end) {
            if (moment(start).isAfter(end)) {
                end = start
            }
            $scope.env.weekend = moment(start, 'D-MM-YYYY').add(2, 'days');
            $scope.env.calendar = generateCalendar($scope.env.weekend);
            $scope.env.hideCalendar = true;

            $scope.env.startDate = moment(start).hours(0).minutes(0).toDate();
            $scope.env.endDate = moment(end).hours(23).minutes(59).toDate();



            var startMoment = moment(moment($scope.env.startDate).format('YYYY-MM-D'));
            var endMoment = moment($scope.env.endDate);




            $scope.env.busyKayaks = $scope.env.orders.filter(function (order) {

                if (order.status=='waiting') {
                    return false
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
                if (order.Begin.isSame(startMoment) || order.End.isSame(endMoment)) {
                    return true
                }
                return false;
            });

            $scope.env.freeKayaks = getFreeKayaks($scope.env.busyKayaks, $scope.env.kayaks);
            updateTransfers()

            updateTotal( $scope.env.busyKayaks);

            updateWaiting(startMoment, endMoment, $scope.env.orders);
        };

        function updateWaiting(startMoment, endMoment , orders) {

            var waiting_orders =[];
            orders = orders.filter(function (order) {
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

            for( var i in orders ){
                if ( orders[i].status=='waiting' ){
                    waiting_orders.push(orders[i])
                }
            }
            $scope.env.waiting_orders = waiting_orders;

        }

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
        });

        var kayakPromise = kayakFactory.getAll().then(function (response) {
            $scope.env.kayaks = response;
        });
        $q.all([schedulerPromise, kayakPromise]).then(function () {

            $scope.setDate($scope.env.weekend.begin.toDate(), $scope.env.weekend.end.toDate());
            $scope.env.freeKayaks = getFreeKayaks($scope.env.busyKayaks, $scope.env.kayaks);

           // $scope.setTaskDate(moment().toDate(), moment().add(1, 'days').toDate());

        });


        function getFreeKayaks(orders, kayaks) {
            return $scope.env.kayaks.filter(function (kayak) {
                for (var i in orders) {
                    var order = orders[i];
                    if (order.status!='waiting' && order.status!='canceled' && order.status!='closed' ){
                        for (var j in order.kayak) {
                            var busy = order.kayak[j];
                            if (busy.id == kayak.id) {
                                return false;
                            }
                        }
                    }

                }
                return true;
            })
        }

        $scope.setWorkStatus = function (order) {
            alertify.confirm("Уверен ли ты работник, что заказ у клиента?", function (e) {
                if (e) {
                    order.setWorkingStatus()
                }
            });
        };
        $scope.setCloseStatus = function (order) {
            alertify.confirm("Уверен ли ты работник, что клиент вернул тебе все и не спиздил ни грамма?", function (e) {
                if (e) {
                    order.setClosedStatus()
                }
            });
        };
        $scope.setCanceledStatus = function (order) {
            alertify.confirm("Отменить заказ?", function (e) {
                if (e) {
                    order.setCanceledStatus()
                }
            });
        }




    }
})();

