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
        }).state('stat', {
            url: '/stat',
            templateUrl: '../apps/backApp/stat/stat.html',
            controller: 'statController'
        })
    }).run(function ($templateCache, $http) {
       // $http.get('../apps/backApp/dashboard/dashboard.html', { cache: $templateCache });
       // $http.get('../apps/backApp/booking/booking.html', { cache: $templateCache });
    }).filter('tel', function () {
        return function (tel) {
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+| |\-|\(|\)/g, '');
           // value = tel.toString().trim().replace(/ /g, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 10: // +1PPP####### -> C (PPP) ###-####
                    country = 1;
                    city = value.slice(0, 3);
                    number = value.slice(3);
                    break;

                case 11: // +CPPP####### -> CCC (PP) ###-####
                    country = value[0];
                    city = value.slice(1, 4);
                    number = value.slice(4);
                    break;

                case 12: // +CCCPP####### -> CCC (PP) ###-####
                    country = value.slice(0, 3);
                    city = value.slice(3, 5);
                    number = value.slice(5);
                    break;

                default:
                    return tel;
            }

            if (country == 1) {
                country = "";
            }

            number = number.slice(0, 3) + '-' + number.slice(3);

            return (country + " (" + city + ") " + number).trim();
        };
    });


})(angular);


