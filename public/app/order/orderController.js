( function () {

    'use strict';

    App.controller('OrderController',
        [
           '$scope','$rootScope','$location','OrderService','UserService','ParseOrderService',
            OrderController
        ]
    );



    function OrderController($scope,$rootScope,$location,OrderService,UserService,ParseOrderService){
        var vm = $scope;



        vm.actions = {
            GetOrders:GetOrders,
        };
        vm.env = {
            orders:null,
            florists:null,
            limit:'30',
            sort:'updatedAt'
        };

        ( function initController(){
            vm.$watchCollection( function(){ return [vm.env.sort,vm.env.limit]},function(value){
                vm.actions.GetOrders(vm.env.sort,vm.env.limit)
            });

            UserService.GetAllByRole('Florist',function(data){
                if ( data.success ){
                    $rootScope.$apply( function(){
                        vm.env.florists = data.users;
                    })
                }
            })
        }())



        function GetOrders(limit,sort){
            OrderService.GetAll( sort,limit, function(data){

                if ( data.success ){
                    $rootScope.$apply( function(){
                        vm.env.orders = ParseOrderService.construct( data.orders );
                    })
                }
            });
        }
    }
})();