'use strict';

describe('Controller Tests', function() {

    describe('Quiz Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockQuiz, MockQuestion, MockLabel;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockQuiz = jasmine.createSpy('MockQuiz');
            MockQuestion = jasmine.createSpy('MockQuestion');
            MockLabel = jasmine.createSpy('MockLabel');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Quiz': MockQuiz,
                'Question': MockQuestion,
                'Label': MockLabel
            };
            createController = function() {
                $injector.get('$controller')("QuizDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'quizcatApp:quizUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
