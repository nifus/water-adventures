(function () {
    'use strict';

    angular
        .module('App')
        .factory('calcService', calcService);

    calcService.$inject = ['$http', 'canoeService', 'equipmentService'];
    function calcService($http, canoeService, equipmentService) {
        var service = {};
        service.Create = Create;
        return service;


        function Create() {
            return new Calc({'canoeService': canoeService, 'equipmentService': equipmentService})
        }
    }


    function Calc(services) {
        this.selected = {
            canoes: [],
            equipments: []
        };
        this.date = {
            begin: moment().add(this.__numberDaysBeforeWeekend(), 'days').hours(0).minutes(0).seconds(0),
            end: moment().add(this.__numberDaysBeforeWeekend() + 2, 'days').hours(0).minutes(0).seconds(0)
        };
        //  загружаем все байдарки и уже занятые
        this.canoeService = new services.canoeService.create();

        //  загружаем все снаряжение и уже занятое
        this.equipmentService = new services.equipmentService.create();

        this.detail = [];
        this.price = 0;
    }

    Calc.prototype = {

        rematch: function () {
            var rows = this.__rematchCanoes();
            this.detail = rows;
            this.price = this.__getPrice();
        },


        __rematchCanoes: function () {
            //console.log(this.__getDays());
            var i;
            var rows = [];
            for (i in this.selected.canoes) {
                var price = this.selected.canoes[i].get('price')*1;
                console.log(price);
                var j;
                var detail = [];
                /// дни на которые будет аренда
                var days = this.__getDays();
                var all_price = 0;
                for (j in days) {
                    if ( days[j].discount>0 ){
                        all_price += (price - (price / days[j].discount));
                    }else{
                        all_price += price ;

                    }
                    detail[detail.length] = 'День, скидка, причина скидки';
                }
                rows[rows.length] = {
                    title: this.selected.canoes[i].get('title'),
                    count: 1,
                    price: all_price,
                    detail: detail
                }
            }
            console.log(rows);
            //console.log(this.canoeService);
            return rows;
        },

        /**
         * Расчитываем скидку
         * @returns {Array}
         * @private
         */
        __getDays: function () {
            var begin = angular.copy(this.date.begin).hours(0).minutes(0).seconds(0);
            var end = angular.copy(this.date.end).hours(0).minutes(0).seconds(0);
            var diff = end.diff(begin, 'days');
            var discount_diff = diff;
            var days = [];

            if (this.date.begin.hours() > 18) {
                discount_diff--;
            }
            var main_discount = 0;
            var main_discount_comment = null;
            if (discount_diff >= 4 && discount_diff < 10) {
                main_discount = 10;
                main_discount_comment = 'Скидка 10%';
            } else if (discount_diff >= 10) {
                main_discount = 15;
                main_discount_comment = 'Скидка 15%';
            }

            if (this.date.begin.hours() > 18 && this.date.begin.hours() < 21) {
                days[days.length] = {
                    discount: 50 + main_discount,
                    day: this.date.begin.format('YYYY-MM-DD HH:mm'),
                    comment: 'После 18 часа скидка 50%' + main_discount_comment
                };
            } else if (this.date.begin.hours() > 21) {
                days[days.length] = {
                    discount: 100,
                    day: this.date.begin.format('YYYY-MM-DD HH:mm'),
                    comment: 'После 21 часа бесплатно'
                };
            } else if (this.date.begin.hours() < 18) {
                days[days.length] = {
                    discount: main_discount,
                    day: this.date.begin.format('YYYY-MM-DD HH:mm'),
                    comment: main_discount_comment
                };
            }


            var i;
            var day = angular.copy(begin);

            for (i = 1; i <= diff; i++) {
                day.add(1, 'days');
                var discount = main_discount;

                if (day.format('E') < 5) {
                    discount = main_discount + 50;
                    days[days.length] = {
                        discount: discount,
                        day: (i == diff) ? this.date.end.format('YYYY-MM-DD HH:mm') : day.format('YYYY-MM-DD HH:mm'),
                        comment: 'В будни 50%' + main_discount_comment
                    };
                } else {
                    days[days.length] = {
                        discount: discount,
                        day: (i == diff) ? this.date.end.format('YYYY-MM-DD HH:mm') : day.format('YYYY-MM-DD HH:mm'),
                        comment: main_discount_comment
                    };
                }
            }
            return days;
        },
        /**
         * Возвращаем цену
         * @returns {number}
         */
        __getPrice: function () {
            var rows = this.__rematchCanoes();
            var i;
            var price = 0;
            for( i in rows ){
                price+=rows[i].price;
            }
            return price;
        },

        selectEquipment: function (equipment) {
            this.selected.equipments[this.selected.equipments.length] = equipment;
            this.rematch();
        },
        isSelectEquipment: function (equipment) {
            var i;
            for (i in this.selected.equipments) {
                if (this.selected.equipments[i] == equipment) {
                    return true;
                }
            }
            return false;
        },
        unSelectEquipment: function (equipment) {
            var i;
            for (i in this.selected.equipments) {
                if (this.selected.equipments[i] == equipment) {
                    delete this.selected.equipments[i];
                }
            }
            this.rematch();
            return false;
        },

        selectCanoe: function (canoe) {
            this.selected.canoes[this.selected.canoes.length] = canoe;
            this.rematch();
        },
        isSelectCanoe: function (canoe) {
            var i;
            for (i in this.selected.canoes) {
                if (this.selected.canoes[i] == canoe) {
                    return true;
                }
            }
            return false;
        },
        unSelectCanoe: function (canoe) {
            var i;
            for (i in this.selected.canoes) {
                if (this.selected.canoes[i] == canoe) {
                    this.selected.canoes.splice(i,1);
                }
            }
            this.rematch();
            return false;
        },

        getCanoeService: function () {
            return this.canoeService;
        },
        getEquipmentService: function () {
            return this.equipmentService;
        },

        getBeginDate: function (format) {
            if (format == undefined) {
                format = this.__dateFormat(this.date.begin);
            }
            return this.date.begin.format(format);
        },
        getEndDate: function (format) {
            if (format == undefined) {
                format = this.__dateFormat(this.date.end);
            }
            return this.date.end.format(format);

        },
        /**
         * Устанавливаем дату начала
         * @param date
         */
        setBeginDate: function (date, format) {
            this.date.begin = moment(date, format);
            this.rematch();
        },

        setEndDate: function (date, format) {
            this.date.end = moment(date, format);
            this.rematch();
        },


        /**
         * Возвращает количество дней до начала выходных
         * @returns {number}
         * @private
         */
        __numberDaysBeforeWeekend: function () {
            var now_day = moment().format('d');
            var add_days = 0;
            if (now_day > 1 && now_day < 5) {
                add_days = 5 - now_day;
            } else if (now_day == 0) {
                add_days = 5;
            } else if (now_day == 5) {
                add_days = 7;
            } else if (now_day == 6) {
                add_days = 8;
            }
            return add_days;
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