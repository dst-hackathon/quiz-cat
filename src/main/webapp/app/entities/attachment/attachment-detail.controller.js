(function() {
    'use strict';

    angular
        .module('quizcatApp')
        .controller('AttachmentDetailController', AttachmentDetailController);

    AttachmentDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Attachment', 'Question'];

    function AttachmentDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Attachment, Question) {
        var vm = this;

        vm.attachment = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('quizcatApp:attachmentUpdate', function(event, result) {
            vm.attachment = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
