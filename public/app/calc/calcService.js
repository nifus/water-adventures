(function () {
    'use strict';

    angular
        .module('App')
        .factory('calcService', calcService);

    calcService.$inject = ['$http','canoeService','equipmentService'];
    function calcService($http,canoeService,equipmentService) {
        var service = {};
        service.Create = Create;
        return service;


        function Create() {
            return new Calc({'canoeService':canoeService,'equipmentService':equipmentService})
        }
    }


    function Calc(services) {
        this.selected = {
            canoes:[],
            equipments:[]
        };
        this.date = {
            begin:  moment().add(this.__numberDaysBeforeWeekend(),'days').hours(0).minutes(0).seconds(0),
            end:    moment().add(this.__numberDaysBeforeWeekend()+2,'days').hours(0).minutes(0).seconds(0)
        };
            //  загружаем все байдарки и уже занятые
        this.canoeService = new services.canoeService.create();

            //  загружаем все снаряжение и уже занятое
        this.equipmentService = new services.equipmentService.create();

    }

    Calc.prototype = {

        /**
         * Возвращаем массив с детальным описанием цены
         * @returns {Array}
         */
        getDetailPrice:function(){
            return [];
        },

        /**
         * Возвращаем цену
         * @returns {number}
         */
        getPrice:function(){

            return 1;
        },

        selectEquipment : function(equipment){
            this.selected.equipments[ this.selected.equipments.length ]= equipment;
        },
        isSelectEquipment : function(equipment){
            var i;
            for( i in this.selected.equipments ){
                if ( this.selected.equipments[i]==equipment ){
                    return true;
                }
            }
            return false;
        },
        unSelectEquipment : function(equipment){
            var i;
            for( i in this.selected.equipments ){
                if ( this.selected.equipments[i]==equipment ){
                    delete this.selected.equipments[i];
                    return true;
                }
            }
            return false;
        },

        selectCanoe : function(canoe){
            this.selected.canoes[ this.selected.canoes.length ]= canoe;
        },
        isSelectCanoe : function(canoe){
            var i;
            for( i in this.selected.canoes ){
                if ( this.selected.canoes[i]==canoe ){
                    return true;
                }
            }
            return false;
        },
        unSelectCanoe : function(canoe){
            var i;
            for( i in this.selected.canoes ){
                if ( this.selected.canoes[i]==canoe ){
                    delete this.selected.canoes[i];
                    return true;
                }
            }
            return false;
        },

        getCanoeService : function(){
            return this.canoeService;
        },
        getEquipmentService : function(){
            return this.equipmentService;
        },

        getBeginDate:function(format){
            if ( format==undefined ){
                format = this.__dateFormat(this.date.begin);
            }
            return this.date.begin.format(format);
        },
        getEndDate:function(format){
            if ( format==undefined ){
                format = this.__dateFormat(this.date.end);
            }
            return this.date.end.format(format);

        },
        /**
         * Устанавливаем дату начала
         * @param date
         */
        setBeginDate:function(date,format){
            this.date.begin = moment(date,format);
        },

        setEndDate:function(date,format){
            this.date.end = moment(date,format);
        },




        /**
         * Возвращает количество дней до начала выходных
         * @returns {number}
         * @private
         */
        __numberDaysBeforeWeekend:function(){
            var now_day = moment().format('d');
            var add_days = 0;
            if ( now_day>1 && now_day<5 ){
                add_days = 5-now_day;
            }else if( now_day==0 ){
                add_days = 5;
            }else if( now_day==5 ){
                add_days = 7;
            }else if( now_day==6 ){
                add_days = 8;
            }
            return  add_days;
        },

        __dateFormat: function (date) {

            if (date.format('HH:mm') == '00:00') {
                return date.format('dddd, DD MMM')
            } else {
                return date.format('dddd, DD MMM. В HH:mm')
            }
        }
    }
})();