(function () {

    'use strict';

    App.controller('CalcController',
        [
            '$scope', '$rootScope', '$location', 'AuthenticationService', 'UserService','Flash',
            CalcController
        ]
    );




    function CalcController($scope, $rootScope, $location, AuthenticationService, UserService,Flash) {

            //  executed after send login form
        $scope.actions = {
        };
        $scope.env = {
            user:null,
            password:null,
            data_loading:false
        };

        $scope.model = {
            time_begin:null,
            time_end:null
        };


        (function initController() {

        })();





    }


})();