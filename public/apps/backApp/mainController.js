(function() {
    'use strict';
    angular.module('backApp').controller('mainController', mainController);

    mainController.$inject=['$scope', 'configFactory', '$q','userFactory'];

    function mainController($scope, configFactory, $q, userFactory) {
        
        $scope.loading = true;
        $scope.config = [];
        $scope.promises = [];
        $scope.user = null;
           

        var configPromise = configFactory.getAll().then(function(response){
            $scope.config = response;
        });
        $scope.promises.push(configPromise);


        var userPromise =  userFactory.getAuthUser().then( function(user){
            checkAccess(user);
            $scope.user = user;
        });
        $scope.promises.push(userPromise);


        $q.all($scope.promises).then(function () {
            $scope.loading = false;
        });

        function checkAccess(user){
           /* if ( user== null ){
                window.location.href='/'
            }

            if (value['accessSection'] != undefined ) {
                if ( user == null || !user.hasAccess(value['accessSection'],value['accessType']) ){
                    window.history.back();
                    return;
                }
            }*/
        }
    }
})();

