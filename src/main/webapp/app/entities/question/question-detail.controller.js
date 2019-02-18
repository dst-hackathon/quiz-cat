(function() {
    'use strict';

    angular
        .module('quizcatApp')
        .controller('QuestionDetailController', QuestionDetailController);

    QuestionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Question', 'Attachment', 'Label'];

    function QuestionDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Question, Attachment, Label) {
        var vm = this;

        vm.question = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('quizcatApp:questionUpdate', function(event, result) {
            vm.question = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
