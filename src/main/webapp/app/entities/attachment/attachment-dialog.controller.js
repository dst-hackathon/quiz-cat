(function() {
    'use strict';

    angular
        .module('quizcatApp')
        .controller('AttachmentDialogController', AttachmentDialogController);

    AttachmentDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Attachment', 'Question'];

    function AttachmentDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Attachment, Question) {
        var vm = this;

        vm.attachment = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.questions = Question.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.attachment.id !== null) {
                Attachment.update(vm.attachment, onSaveSuccess, onSaveError);
            } else {
                Attachment.save(vm.attachment, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('quizcatApp:attachmentUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setImage = function ($file, attachment) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        attachment.image = base64Data;
                        attachment.imageContentType = $file.type;
                    });
                });
            }
        };

        vm.setAttachment = function ($file, attachment) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        attachment.attachment = base64Data;
                        attachment.attachmentContentType = $file.type;
                    });
                });
            }
        };

    }
})();
