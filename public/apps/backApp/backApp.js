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
        })
    });
})(angular);


