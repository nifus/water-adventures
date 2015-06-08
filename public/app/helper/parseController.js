( function () {

    'use strict';

    App.controller('ParseController',
        [
            '$scope',
            ParseController
        ]
    );



    function ParseController($scope){
        Parse.User.logIn('admin', 'testpass', {
            success: function(user){
                var User = Parse.Object.extend("User");

                var role = new Parse.Query(Parse.Role);
                role.get('lbxLkXx3K8',{
                    success:function(roleAdminObject){
                        roleAdminObject.getUsers().add(user);
                        roleAdminObject.save();

                        user.set('role',roleAdminObject);
                        user.save();


                        //  создаем нового юзера-админа

                        var second_admin = new User();
                        second_admin.set('username','second_admin');
                        second_admin.set('password','testpass');
                        second_admin.set('role',roleAdminObject);
                        second_admin.save();
                    }
                });


                role.get('MKm3JCyvur',{
                    success:function(roleObject){
                        var florist = new User();
                        florist.set('username','florist');
                        florist.set('password','testpass');
                        florist.set('role',roleObject);
                        florist.save();
                    }
                });

            }
        });
    }
})();