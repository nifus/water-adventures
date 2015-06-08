(function () {
    'use strict';

    angular
        .module('App')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.IsAdmin = IsAdmin;
        //service.GetAll = GetAll;
        service.GetById = GetById;
        //service.GetByUsername = GetByUsername;
        service.GetAllByRole = GetAllByRole;
       // service.Create = Create;
        //service.Update = Update;
        //service.Delete = Delete;

        return service;

        function GetAllByRole(role,callback){
            var Role = Parse.Role;
            var query = new Parse.Query(Role);
            query.equalTo('name',role)
            query.first({
                success:function(role){
                    var user =  Parse.Object.extend("User");
                    var query = new Parse.Query(user);
                    query.equalTo('role',role)
                    query.find( {
                        success:function(users){
                            callback({
                                success:true,
                                users:users
                            })
                        },
                        error:function(error){
                            callback({
                                success:false,
                                error:error
                            })
                        }
                    })
                },
                error:function(error){
                    callback({
                        success:false,
                        error:error
                    })
                }
            })
        }

        function IsAdmin(user,callback) {
            if ( !user ){
                callback(false);
                return false;
            }
            var role =  user.get('role');
            role.fetch({
                success: function(role) {
                    if ( role.get('name')=='Administrator' ){
                        callback(true);
                        return false;
                    }
                    callback(false);
                    return false;
                }
            });

        }
        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + user.id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(data) {
            return data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();