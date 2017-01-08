'use strict';

angular.module('com.github.devzer01.typeMaster.selection', ['ngRoute', 'com.github.devzer01.typeMaster.core', 'pascalprecht.translate'])

.config(['$routeProvider', '$coreProvider', function($routeProvider, $coreProvider) {

    $routeProvider.when('/selection', {
        templateUrl: 'selection/selection.html',
        controller: 'SelectionCtrl'
    });


}])

    .controller('SelectionCtrl', ['$scope' , '$location', '$core', '$translate', '$window', '$injector', function ($scope, $location, $core, $translate, $window, $injector) {

        $translate.use('en');

        $scope.packs = $core.packs.map(function (v) {
            return {
                locale: v,
                localName: $core.data[v].localName,
                name: $core.data[v].name
            };
        });

        $scope.setPack = function (v) {
            $translate.use(v);
            $core.setPack(v);
            $core.setConfig($core.data[v]);
            $location.path('welcome');
        };
    }]);
