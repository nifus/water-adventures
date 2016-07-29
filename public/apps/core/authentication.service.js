(function () {
    'use strict';

    App
        .factory('AuthenticationService', ['$http', 'UserService',AuthenticationService]);


    function AuthenticationService($http, UserService) {
        var service = {};
        service.Login = Login;
        service.Logout = Logout;
        service.ClearCredentials = ClearCredentials;
        service.CurrentUser = CurrentUser;

        return service;

        function Logout(){
            Parse.User.logOut();
        }

        function CurrentUser(){
            return Parse.User.current();
        }

        function Login(username, password, callback) {
            Parse.User.logIn(username, password, {
                success: function(user){
                    callback(
                        {
                            success:true,
                            user:user
                        }
                    )
                } ,
                error:function(user,error){
                    callback(
                        {
                            success:false,
                            user:user,
                            error:error
                        }
                    )
                }
            });

        }

        function ClearCredentials() {
            Parse.User.logOut();
        }
    }



})();