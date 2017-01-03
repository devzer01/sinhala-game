'use strict';

// Declare app level module which depends on views, and components
angular.module('com.github.devzer01.Training', [
    'ngRoute', 'com.github.devzer01.Training.welcome', 'com.github.devzer01.Training.help',
    'com.github.devzer01.Training.game', 'com.github.devzer01.Training.version', 'com.github.devzer01.Training.gamecore', 'angulartics', 'angulartics.google.analytics']).
config(['$locationProvider', '$routeProvider', '$compileProvider', '$analyticsProvider', function($locationProvider, $routeProvider, $compileProvider, $analyticsProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/welcome'});
    $compileProvider.debugInfoEnabled(false);
    $analyticsProvider.virtualPageviews(false);
}]);


