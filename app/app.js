'use strict';

// Declare app level module which depends on views, and components
angular.module('com.github.devzer01.typeMaster', [
    'ngRoute', 'com.github.devzer01.typeMaster.welcome', 'com.github.devzer01.typeMaster.help',
    'com.github.devzer01.typeMaster.game', 'com.github.devzer01.typeMaster.version',
    'com.github.devzer01.typeMaster.core',
    'angulartics',
    'angulartics.google.analytics',
    'pascalprecht.translate']).
config(['$locationProvider', '$routeProvider', '$compileProvider', '$analyticsProvider', '$translateProvider', '$coreProvider',
    function($locationProvider, $routeProvider, $compileProvider, $analyticsProvider, $translateProvider, $coreProvider)
    {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/welcome'});


        var locale = 'th_TH';

        $compileProvider.debugInfoEnabled(true);
        $analyticsProvider.virtualPageviews(false);

        $translateProvider.translations(locale, $coreProvider.data[locale].translation);
        $translateProvider.preferredLanguage(locale);

        $coreProvider.setConfig($coreProvider.data[locale]);
}]);


