(function (angular, window) {
    'use strict';

    angular.module('backApp', ['ui.router', 'core']).
    config(function ($stateProvider, $urlRouterProvider) {
        moment.locale('ru');

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('dashboard', {
            url: '/',
            templateUrl: '../apps/backApp/dashboard/dashboard.html',
            controller: 'dashboardController',
        })


    });

})(angular, window);


