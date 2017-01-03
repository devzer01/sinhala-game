'use strict';

angular.module('com.github.devzer01.Training.welcome', ['ngRoute', 'com.github.devzer01.Training.gamecore', 'pascalprecht.translate'])

.config(['$routeProvider', 'com.github.devzer01.Training.gamecoreProvider', function($routeProvider, gamecoreProvider) {

    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });



}])

    .controller('WelcomeCtrl', ['$scope' , '$location', 'com.github.devzer01.Training.gamecore', '$translate', function ($scope, $location, gamecore, $translate) {


        $scope.difficulty = gamecore.defaultLevel;

        $scope.levels = gamecore.levels;

        $scope.help = function () {
            $location.path('help');
        };

        $scope.setLevel = function (v) {
            console.log($translate.uses());
            $scope.difficulty = v;
            gamecore.level = v;
        };

        $scope.game = function () {
            gamecore.level = $scope.difficulty;
            $location.path('game');
        };
    }]);
