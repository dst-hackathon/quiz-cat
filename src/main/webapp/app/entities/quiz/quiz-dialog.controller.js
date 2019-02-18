(function() {
    'use strict';

    angular
        .module('quizcatApp')
        .controller('QuizDialogController', QuizDialogController);

    QuizDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Quiz', 'Question', 'Label'];

    function QuizDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Quiz, Question, Label) {
        var vm = this;

        vm.quiz = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.questions = Question.query();
        vm.labels = Label.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.quiz.id !== null) {
                Quiz.update(vm.quiz, onSaveSuccess, onSaveError);
            } else {
                Quiz.save(vm.quiz, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('quizcatApp:quizUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.generateDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
