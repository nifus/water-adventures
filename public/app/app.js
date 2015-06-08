var App = angular.module('App', ['ngRoute','flash']);


(function () {
    'use strict';

    App.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]).config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: '/app/login/login.html',
                    controller: 'LoginController'
                }).when('/logout', {
                    templateUrl: '/app/login/login.html',
                    controller: 'LogoutController'
                }).when('/main', {
                    templateUrl: '/app/dashboard/index.html',
                    controller: 'ParseController'
                }).
                when('/admin/orders', {
                    templateUrl: '/app/order/administrator/order.html',
                    controller: 'OrderController'
                }).
                when('/florist/orders', {
                    templateUrl: '/app/order/florist/order.html',
                    controller: 'OrderController'
                })/*.
             otherwise({
             redirectTo: '/'
             })*/;
        }]).filter('GetById', function () {
        return function (items, id) {
            var i = 0;
            var filtered = [];
            for (i in items) {
                if (items[i].id == id) {
                    filtered.push(items[i]);
                }
            }
            if (filtered.length == 1) {
                return filtered[0]
            }
            return null;
        }
    })
})();