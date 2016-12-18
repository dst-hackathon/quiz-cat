(function() {
    'use strict';

    angular
        .module('quizcatApp')
        .controller('QuizDetailController', QuizDetailController);

    QuizDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Quiz', 'Question', 'Label'];

    function QuizDetailController($scope, $rootScope, $stateParams, previousState, entity, Quiz, Question, Label) {
        var vm = this;

        vm.quiz = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('quizcatApp:quizUpdate', function(event, result) {
            vm.quiz = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
