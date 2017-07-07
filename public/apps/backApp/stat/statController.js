(function () {
    'use strict';
    angular.module('backApp').controller('statController', statController);

    statController.$inject = ['$scope', '$q', 'schedulerFactory'];

    function statController($scope, $q, schedulerFactory) {

        $scope.env = {
            profit: {
                2016: {
                    end: {},
                    future:{}
                },
                2017:{
                    end: {},
                    future:{}
                }
            },
            kayaks:{
                2016: {},
                2017:{}
            }
        }

        schedulerFactory.getStat().then(function (response) {
            for( var i in response){
                var time =  moment(response[i].begin_rent);

                if ( response[i].status=='closed'){
                    if ( !$scope.env.profit[ time.format('YYYY') ].end[ time.format('M') ] ){
                        $scope.env.profit[ time.format('YYYY') ].end[ time.format('M') ] = parseFloat(response[i].price)
                    }else{
                        $scope.env.profit[ time.format('YYYY') ].end[ time.format('M') ]+= parseFloat(response[i].price)

                    }
                }else if ( response[i].status=='new' || response[i].status=='working'){

                    if ( !$scope.env.profit[ time.format('YYYY') ].future[ time.format('M') ] ){

                        $scope.env.profit[ time.format('YYYY') ].future[ time.format('M') ] = 0
                    }
                    $scope.env.profit[ time.format('YYYY') ].future[ time.format('M') ]+= parseFloat(response[i].price)
                }
            }



            for( var i in response){
                var time =  moment(response[i].begin_rent);
                for( var j in response[i].kayak){
                    var kayak = response[i].kayak[j];
                    if ( response[i].status=='closed') {
                        if (!$scope.env.kayaks[time.format('YYYY')][kayak.vendor_code]) {
                            $scope.env.kayaks[time.format('YYYY')][kayak.vendor_code] = 1
                        } else {
                            $scope.env.kayaks[time.format('YYYY')][kayak.vendor_code] += 1
                        }
                    }
                }
            }

            //$scope.env.profit = response;
        })

    }
})();

