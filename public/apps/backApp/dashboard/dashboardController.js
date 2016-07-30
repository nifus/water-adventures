(function () {
    'use strict';
    angular.module('backApp').controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$scope', '$q','schedulerFactory','kayakFactory'];

    function dashboardController($scope, $q, schedulerFactory, kayakFactory) {
        $scope.env = {
            loading: true,
            calendar: {},
            promises: $scope.$parent.promises,
            weekend: getNextWeekend(),
            hideCalendar: false,
            orders:[],
            $scope:[],

        };

        //$scope.env.promises.push(schedulerPromise);

       /* $q.all([agentsPromise]).then(function () {
            deferred.resolve();
        });*/


        $scope.setDate = function(start, end){
            $scope.env.weekend = moment(start,'D-MM-YYYY').add(2, 'days');
            $scope.env.calendar = generateCalendar($scope.env.weekend);
            $scope.env.hideCalendar = true;
            $scope.env.startDate = moment(start,'D-MM-YYYY').format('D-MM-YYYY');
            $scope.env.endDate = moment(end,'D-MM-YYYY').format('D-MM-YYYY');
            var startMoment = moment(start,'D-MM-YYYY').subtract(1, 'hour');
            var endMoment = moment(end,'D-MM-YYYY').add(1, 'hour');
            $scope.env.orders = $scope.env.orders.filter( function(order){
                if ( order.Begin.isBetween(startMoment,endMoment) ){
                    return true
                }
                if ( order.End.isBetween(startMoment,endMoment) ){
                    return true
                }
                return false;
            });
        };

        function generateCalendar(nextWeekend) {
            var result = {};
            var months = [4,5, 6, 7, 8, 9, 10];
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
                    if ( start.month()+1!=months[i]){
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

        function getNextWeekend(){
            var date = moment();
            var day = date.day();
            if (day == 6) {
                return {
                    begin: date.subtract('1','days'),
                    end: moment(date).add('3','days')
                };
            }else if (day == 7) {
                return {
                    begin: date.subtract('2','days'),
                    end: moment(date).add('3','days')
                };
            } else{
                return {
                    begin: date.add(5 - day,'days'),
                    end: moment(date).add(7 - day,'days')
                };
            }
        }


        var schedulerPromise = schedulerFactory.getAll().then(function(response){
            $scope.env.orders = response;
        })

        var kayakPromise = kayakFactory.getAll().then(function(response){
            $scope.env.kayaks = response;
        });
        $q.all([schedulerPromise, kayakPromise]).then( function(){
            $scope.setDate($scope.env.weekend.begin.format('D-MM-YYYY'),$scope.env.weekend.end.format('D-MM-YYYY'));
            $scope.env.freeKayaks =  getFreeKayaks($scope.env.orders, $scope.env.kayaks);
            console.log($scope.env.freeKayaks)
        });


        function getFreeKayaks(orders,kayaks){
            return $scope.env.kayaks.filter(function(kayak){
                for( var i in orders){
                    var order = orders[i];
                    for( var j in order.kayak ){
                        var busy = order.kayak[j];
                        if ( busy.id==kayak.id){
                            return false;
                        }
                    }
                }
                return true;
            })
        }

    }
})();

