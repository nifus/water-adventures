(function () {
    'use strict';

    angular
        .module('App')
        .factory('canoeService', canoeService);

    //canoeService.$inject = ['$http'];
    function canoeService() {
        var service = {};
        service.create = create;
        return service;


        function create() {
            var c = new Canoe();
            c.loadAllCanoes();
            c.loadBusyCanoes();
            return c;
        }
    }

    function Canoe() {
        this.canoes = null;
        this.busy = null;
    }

    Canoe.prototype = {

        loadAllCanoes: function () {
            var canoeObject = this;
            var Canoe = Parse.Object.extend("canoe");
            var canoe_query = new Parse.Query(Canoe);
            canoe_query.ascending("price");
            canoe_query.find({
                success: function (canoes) {
                    canoeObject.canoes = canoes
                },
                error: function () {

                }
            })
        },

        loadBusyCanoes: function () {
            var canoeObject = this;

            var Order = Parse.Object.extend("order");
            var order_query = new Parse.Query(Order);
            order_query.include("order.canoe");
            //order_query.notEqualTo('canoeId',undefined);
            order_query.find({
                success: function (result) {
                    var i, canoes = [];
                    for (i in result) {
                        if (result[i].get('canoeId') == undefined) {
                            continue;
                        }
                        canoes[canoes.length] = result[i];
                    }
                    canoeObject.busy = canoes
                },
                error: function () {

                }
            })
        },
    }
})();