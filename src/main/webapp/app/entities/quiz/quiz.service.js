(function() {
    'use strict';
    angular
        .module('quizcatApp')
        .factory('Quiz', Quiz);

    Quiz.$inject = ['$resource', 'DateUtils'];

    function Quiz ($resource, DateUtils) {
        var resourceUrl =  'api/quizzes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.generateDate = DateUtils.convertDateTimeFromServer(data.generateDate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
