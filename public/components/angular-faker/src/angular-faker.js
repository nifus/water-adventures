(function (angular, undefined) {
    'use strict';

    var FAKER_MODULE = angular.module('angular-faker', []);

    FAKER_MODULE.factory('Faker', function () {

        var faker = {};
        return faker;

    });

    FAKER_MODULE.directive('fakerLorem', function () {
        return {

        };
    });

})(window.angular);
