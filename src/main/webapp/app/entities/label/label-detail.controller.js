(function() {
    'use strict';

    angular
        .module('quizcatApp')
        .controller('LabelDetailController', LabelDetailController);

    LabelDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Label'];

    function LabelDetailController($scope, $rootScope, $stateParams, previousState, entity, Label) {
        var vm = this;

        vm.label = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('quizcatApp:labelUpdate', function(event, result) {
            vm.label = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
