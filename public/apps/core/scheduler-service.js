(function () {
    'use strict';

    angular
        .module('schedulerApp')
        .factory('schedulerService', schedulerService);

    schedulerService.$inject = ['$http'];
    function schedulerService($http) {
        var service = {};
        service.create = create;
        return service;


        function create() {
            return new Scheduler({'$http': $http});
        }
    }

    function Scheduler(services) {
        this.services = services;
        this.rows = {};
        this.cols = [];
        this.range = {begin:null,end:null};
    }

    Scheduler.prototype = {

        setTimeRange: function (end) {

            var beginMoment = moment().subtract(2, 'weeks');
            this.range.begin = angular.copy(beginMoment);

            var endMoment = moment().add(end, 'weeks');
            this.range.end = angular.copy(endMoment);

            var dateRangeDiff = endMoment.diff(beginMoment, 'days');

            var i;
            for (i = 0; i <= dateRangeDiff; i++) {
                this.cols.push( {date: angular.copy(beginMoment.add(1, 'day'))});
            }

            this.getSchedules();
        },

        setKayaks: function (kayaks) {
            kayaks.forEach(function(kayak){
                //if ()
            })

            this.rows.kayaks = kayaks;
            this.getSchedules();
        },

        getSchedules: function () {
            var begin = this.range.begin.format('YYYY-MM-DD');
            var  end = this.range.end.format('YYYY-MM-DD');
            var kayaks = this.rows;
            var days = this.cols;
            this.services.$http.post('/scheduler', {begin: begin, end: end}).success(function (result) {
                result.forEach(function (row) {
                    var begin = moment(row.begin_rent, 'YYYY-MM-DD');
                    var end = moment(row.end_rent, 'YYYY-MM-DD');
                    kayaks.forEach(function (kayak) {

                        days.forEach(function (day) {
                            var now = moment(day.date, 'YYYY-MM-DD');
                            if( now.isBetween(begin,end)  ) {
                                row.kayak.forEach(function(k){
                                    if (k.id==kayak.id){
                                        day.red = true;
                                    }
                                })


                                //console.log(now.format('YYYY-MM-DD')+' . '+begin.format('YYYY-MM-DD')+' . '+end.format('YYYY-MM-DD') )
                            }else{
                                day.red = false;
                            }
                        })
                    })
                });
            })

        }


    }
})();