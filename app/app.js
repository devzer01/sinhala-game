'use strict';

// Declare app level module which depends on views, and components
var $modules = [
    'ngRoute',
    'com.github.devzer01.typeMaster.selection',
    'com.github.devzer01.typeMaster.welcome',
    'com.github.devzer01.typeMaster.help',
    'com.github.devzer01.typeMaster.game',
    'com.github.devzer01.typeMaster.version',
    'com.github.devzer01.typeMaster.core',
    'angulartics',
    'angulartics.google.analytics',
    'pascalprecht.translate'];

var locales = [];

if (typeof typeMaster !== "undefined" && typeof typeMaster.module !== "undefined") {
    locales = Object.keys(typeMaster.module);
    for (var i=0; i < locales.length; i++) {
        $modules.push(typeMaster.module[locales[i]]);
    }
}

angular.module('com.github.devzer01.typeMaster', $modules)
    .config(['$locationProvider', '$routeProvider', '$compileProvider', '$analyticsProvider', '$translateProvider', '$coreProvider', '$injector',
    function($locationProvider, $routeProvider, $compileProvider, $analyticsProvider, $translateProvider, $coreProvider, $injector)
    {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/selection'});


        $compileProvider.debugInfoEnabled(true);
        $analyticsProvider.virtualPageviews(false);

        for (var i=0; i < locales.length; i++) {
            var _m = typeMaster.module[locales[i]].split(".");
            var _lang = _m[_m.length - 1] + "Provider";
            var _prov = $injector.get(_lang);
            $coreProvider.register(locales[i], _prov.$get);
            $translateProvider.translations(locales[i], $coreProvider.data[locales[i]].translation);
        }
}]);


