(function () {
    'use strict';

    angular
        .module('App')
        .factory('OrderService', OrderService);

    function OrderService(){

        function ParseOrder( order ) {
           this.order = order;
        }

        ParseOrder.prototype = {
            getBunch:function(key){
                return this.order.get('bunch').get(key);
            },
            getBunchDelivery:function(key){
                var delivery = this.order.get('order').get('delivery');
                if ( delivery==undefined ){
                    return undefined;
                }
                return delivery.get(key);

            },
            getOrderUser:function(key){
                var user = this.order.get('order').get('user');
                if ( user==undefined ){
                    return undefined;
                }
                return user.get(key);
            },
            getOrderPaymentMethod:function(key){
                var paymentMethod = this.order.get('order').get('paymentMethod');
                if ( paymentMethod==undefined ){
                    return undefined;
                }
                return paymentMethod.get(key);
            }
        };
        
        ParseOrder.construct = function( limit,sort,callback ) {

            var Order = Parse.Object.extend("OrderItem");

            var query = new Parse.Query(Order);
            //query.greaterThan('createdAt','2015-06-02T13:11:46.035Z')
            query.limit(limit)
            query.descending(sort);
            query.include("order");
            query.include("order.delivery");
            query.include("order.status");
            query.include("order.user");
            query.include("order.paymentMethod");
            query.include("bunch");
            query.include("bunch.size1");
            query.include("bunch.size2");
            query.find({
                success: function(orders) {

                    callback( {
                        success:true,
                        orders:orders
                    } )
                },
                error: function(query,error){
                    callback( {
                        success:false,
                        error:error
                    } )
                }
            });

            var orders = [];
            var i,order;
            for( i in data ){
                order = data[i];
                orders[ orders.length ] = new ParseOrder(order);
            }
            return orders;
        };

        return {
            construct: ParseOrder.construct
        }

    };

    angular
        .module('App')
        .factory('OrderService', OrderService);

    OrderService.$inject = ['$http'];
    function OrderService($http) {
        var service = {};

        service.GetAll = GetAll;
        //service.GetById = GetById;
        //service.GetByUsername = GetByUsername;
        //service.Create = Create;
        //service.Update = Update;
        //service.Delete = Delete;

        return service;

        function GetAll(limit,sort,callback) {
            var Order = Parse.Object.extend("OrderItem");

            var query = new Parse.Query(Order);
            //query.greaterThan('createdAt','2015-06-02T13:11:46.035Z')
            query.limit(limit)
            query.descending(sort);
            query.include("order");
            query.include("order.delivery");
            query.include("order.status");
            query.include("order.user");
            query.include("order.paymentMethod");
            query.include("bunch");
            query.include("bunch.size1");
            query.include("bunch.size2");
            query.find({
                success: function(orders) {

                    callback( {
                        success:true,
                        orders:orders
                    } )
                },
                error: function(query,error){
                    callback( {
                        success:false,
                        error:error
                    } )
                }
            });

        }

    }

})();