(function () {

    'use strict';

    App.controller('CalcController',
        [
            '$scope','calcService','$timeout',
            CalcController
        ]
    );




    function CalcController($scope,calcService,$timeout) {
        $scope.calc = calcService.Create();

        $scope.env = {

            canoeService : $scope.calc.getCanoeService(),
            equipmentService : $scope.calc.getEquipmentService(),
            model:{
                date: {
                    begin: {
                        value:$scope.calc.getBeginDate('YYYY/MM/DD'),
                        onShow:function(object){
                            $scope.env.model.date.begin.picker = object;
                            object.setOptions( {'minDate':$scope.calc.getBeginDate('YYYY/MM/DD') } )
                        },
                        picker:null
                    },
                    end: {
                        value:$scope.calc.getEndDate('YYYY/MM/DD'),
                        onShow:function(object){
                            object.setOptions( {'minDate': $scope.calc.getBeginDate('YYYY/MM/DD') });
                            $scope.env.model.date.end.picker = object;
                        },
                        picker:null
                    }
                }
            }
        };


        $scope.$watchCollection(function(){return [$scope.env.model.date.begin.value,$scope.env.model.date.end.value]},function(){
            $scope.calc.setBeginDate( $scope.env.model.date.begin.value,'YYYY-MM-DD HH:mm' );
            $scope.calc.setEndDate( $scope.env.model.date.end.value,'YYYY-MM-DD HH:mm' );

            if ( $scope.env.model.date.end.picker ){
                $scope.env.model.date.end.picker.setOptions( {'minDate':$scope.calc.getBeginDate('YYYY/MM/DD') })
            }
        });

        $timeout(function(){
            //  костыль для angular, который забывает иногда обновить представление
            $scope.$apply();
        },1000)


    }


})();