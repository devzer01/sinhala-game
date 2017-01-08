'use strict';

angular.module('com.github.devzer01.typeMaster.help', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/help', {
    templateUrl: 'help/help.html',
    controller: 'HelpCtrl'
  });
}])

.controller('HelpCtrl', function ($scope, $location) {
    $scope.game  = function() {
        $location.path('game');
    };

    $scope.welcome  = function() {
        $location.path('welcome');
    };
});