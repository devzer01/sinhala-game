'use strict';

// Declare app level module which depends on views, and components
angular.module('com.github.devzer01.Training', [
    'ngRoute', 'com.github.devzer01.Training.welcome', 'com.github.devzer01.Training.help',
    'com.github.devzer01.Training.game', 'com.github.devzer01.Training.version', 'com.github.devzer01.Training.gamecore']).
config(['$locationProvider', '$routeProvider', '$compileProvider', function($locationProvider, $routeProvider, $compileProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/welcome'});
  //$compileProvider.debugInfoEnabled(false);
}]);


