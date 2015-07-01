(function () {
    'use strict';

    angular
        .module('App')
        .factory('equipmentService', equipmentService);

    //equipmentService.$inject = ['$http'];
    function equipmentService() {
        var service = {};
        service.create = create;
        return service;


        function create() {
            var e = new Equipment();
            e.loadAllEquipments();
            e.loadBusyEquipments();
            return e;
        }
    }

    function Equipment() {
        this.equipments = null;
        this.busy = null;
    }

    Equipment.prototype = {

        loadAllEquipments: function () {
            var equipmentObject = this;
            var Equipment = Parse.Object.extend("equipment");
            var equipmentQuery = new Parse.Query(Equipment);
            equipmentQuery.ascending("order");
            equipmentQuery.find({
                success: function (result) {
                    equipmentObject.equipments = result
                },
                error: function () {

                }
            })
        },

        loadBusyEquipments: function () {
            var equipmentObject = this;

            var Order = Parse.Object.extend("order");
            var orderQuery = new Parse.Query(Order);
            orderQuery.include("order.equipment");
            orderQuery.find({
                success: function (result) {
                    var i, equipments = [];
                    for (i in result) {
                        if (result[i].get('equipmentId') == undefined) {
                            continue;
                        }
                        equipments[equipments.length] = result[i];
                    }
                    equipmentObject.busy = equipments
                },
                error: function () {

                }
            })
        },
    }
})();