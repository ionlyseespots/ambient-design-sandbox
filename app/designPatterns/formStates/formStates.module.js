var formStates = angular.module('formStates', []);

formStates.controller('formStatesCtrl', ['$scope',function($scope) {

}]);

formStates.service('usernameService',['$http','$q','$timeout',function($http,$q,$timeout){
this.checkAvailability=function(username){
    //Simulating async call to check availability. Always reject here.
    var deferred=$q.defer();
    $timeout(function(){
        deferred.reject('Not Available');
    },2000);

    return deferred.promise;

}
}]);

formStates.directive('usernameValidator',['usernameService',function(usernameService){
return {
    restrict:'AE',
    require:'ngModel',
    link:function($scope,elem,attrs,ngModel){
        ngModel.$validators.username=function(modelValue,viewValue){
            var value=modelValue || viewValue;
            return /^[a-zA-Z0-9]+$/.test(value);
        }

        ngModel.$asyncValidators.usernameAvailability=function(modelValue,viewValue){
            var value=modelValue || viewValue;
            return usernameService.checkAvailability(value);
        }

    }
}
}]);