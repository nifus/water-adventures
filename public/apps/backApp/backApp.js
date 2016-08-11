(function (angular) {
    'use strict';

    angular.module('backApp', ['ui.router', 'core', 'ui.bootstrap.datetimepicker','checklist-model']).
    config(function ($stateProvider, $urlRouterProvider) {
        moment.locale('ru');

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('dashboard', {
            url: '/',
            templateUrl: '../apps/backApp/dashboard/dashboard.html',
            controller: 'dashboardController'
        }).state('booking', {
            url: '/booking',
            templateUrl: '../apps/backApp/booking/booking.html',
            controller: 'bookingController'
        }).state('order-edit', {
            url: '/booking/:id',
            templateUrl: '../apps/backApp/booking/booking.html',
            controller: 'bookingController'
        })
    }).run(function ($templateCache, $http) {
       // $http.get('../apps/backApp/dashboard/dashboard.html', { cache: $templateCache });
       // $http.get('../apps/backApp/booking/booking.html', { cache: $templateCache });
    }).provider('$templateCache', function(){
        this.$get = ['cacheFactoryLocalStorage', function($cacheFactoryLocalStorage) {
            return $cacheFactoryLocalStorage;
        }];
    }).factory('cacheFactoryLocalStorage',[
        '$cacheFactory',
        function($cacheFactory){
            var LocalStorageCache = {
                put: function(key, val){
                    if(!val) return;
                    var cacheVal = {
                        val: val,
                        time: new Date().getTime()
                    };

                   /* if(typeof templatesObj !== "undefined"){
                        cacheVal['md5'] = templatesObj[key];
                    }*/

                    var item = localStorage.getItem('appCache');
                    var tmpObj = {};
                    if(item){
                        tmpObj = JSON.parse(item);
                    }
                    tmpObj[key] = cacheVal;

                    localStorage.setItem('appCache', JSON.stringify(tmpObj));
                },
                get: function(key){
                    var item = localStorage.getItem('appCache');
                    if(!item) return;
                    var itemObj = JSON.parse(item);

                    if( itemObj[key]==undefined) return;

                    var templatesObjCache = itemObj[key];
                    var dateCurrent = new Date();
                    var dateItem = new Date(templatesObjCache.time);

                    /*if(dateCurrent.getDaysBetween(dateItem)>1) return;
                    if(typeof templatesObj !== "undefined" && typeof templatesObj[key] !== "undefined"){
                        if(templatesObj['md5'] != templatesObjCache[key]) return;
                    }
                    if(_.isEmpty(templatesObjCache['val'])) return;*/
                    return templatesObjCache['val'];

                },
                remove: function(){

                },
                removeAll: function(){

                },
                destroy: function() {

                },
                info: function() {
                }
            };
            //проверяем поддержку браузера если нет возвращаем дефолтный кешер
            return  window.localStorage ? LocalStorageCache : $cacheFactory('appCache');
        }]);
})(angular);


