(function () {

    'use strict';

    App.controller('LoginController',
        [
            '$scope', '$rootScope', '$location', 'AuthenticationService', 'UserService','Flash',
            LoginController
        ]
    );

    App.controller('LogoutController',
        [
            '$scope', '$rootScope', '$location', 'AuthenticationService',
            LogoutController
        ]
    );


    function LoginController($scope, $rootScope, $location, AuthenticationService, UserService,Flash) {

            //  executed after send login form
        $scope.actions = {
            login:login
        };
        $scope.env = {
            user:null,
            password:null,
            data_loading:false
        };

        (function initController() {
            var user = AuthenticationService.CurrentUser();
            //  redirect to dashboard for users
            redirect(user);
                //  login form for anonimus
        })();


        function redirect(user) {
            UserService.IsAdmin(
                user,
                function (result) {
                    var redirect = null;
                    if (true == result) {
                        redirect = '/admin/orders';
                    } else if (false == result && user) {
                        redirect = '/florist/orders';
                    }
                    if (redirect != null) {
                        $rootScope.$apply(function () {
                            $location.path(redirect)
                        })
                    }
                });
        }

        function login() {
            $scope.env.data_loading = true;
            Flash.create('info', 'Wait...');
            AuthenticationService.Login($scope.env.username, $scope.env.password, function (response) {
                if ( response.success ) {
                    redirect(response.user)
                } else {
                    $rootScope.$apply(function () {
                        $scope.env.data_loading = false;
                    });
                    Flash.create('danger', response.error.message);
                }
            });
        }


    }

    function LogoutController( $scope, $rootScope, $location,AuthenticationService ){
        AuthenticationService.Logout();
        $location.path('/')
    }
})();