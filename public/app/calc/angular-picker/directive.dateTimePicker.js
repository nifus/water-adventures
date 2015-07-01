(function(){
   'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length-1].src;

    angularDateTimePicker.directive('angularPicker', function ($timeout) {
        return {
            restrict: 'E',
            require : 'ngModel',
            templateUrl : currentScriptPath.replace('directive.dateTimePicker.js','template.dateTimePicker.html'),
            scope:{
                ngModel:'=',
                onShow:'=',
                onChange:'=',
                format:'@',
                lang:'@',
                defaultTime:'@'
            },
            link: function (scope, element, attrs, ngModelCtrl){
                scope.env = {
                    id: "angular_picker_"+attrs.ngModel.replace(/\./g,'_'),
                    init:false,
                    obj:null,
                    startDate:moment(scope.ngModel,attrs.format).format('YYYY/MM/DD')
                };
                $timeout( function() {

                    $(function(){

                        $('input[name="'+scope.env.id+'"]').datetimepicker({
                            lang: attrs.lang,
                            format: 'Y/m/d H:i',
                            startDate: scope.env.startDate,
                            inline: true,
                            dayOfWeekStart:1,
                            allowTimes:[
                                '05:00',
                                '06:00',
                                '07:00',
                                '08:00',
                                '09:00',
                                '10:00',
                                '11:00',
                                '12:00',
                                '13:00',
                                '14:00',
                                '15:00',
                                '16:00',
                                '17:00',
                                '18:00',
                                '19:00',
                                '20:00',
                                '21:00',
                                '22:00',
                                '23:00'
                            ],
                            onGenerate: function(dp, $input){
                                if ( scope.env.init==true ){
                                    return false;
                                }

                                scope.env.obj = this;
                                if ( scope.onShow!=undefined ){
                                    scope.onShow(this)
                                }
                                scope.env.init = true;
                            },
                            onChangeDateTime: function (dp, $input) {
                                if ( scope.onChange!=undefined ){
                                    scope.onChange(dp,this)
                                }
                                ngModelCtrl.$setViewValue(
                                    moment(dp).format(attrs.format)
                                );

                            }

                        })
                    })
                },500)
            }
        }
    });




    function initPicker(id,startDate,callback){

    }

}())
