/* 
   angular-faker v0.0.1
   git://github.com/mrzepinski/angular-faker.git
   MIT License
 */

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
