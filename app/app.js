'use strict';

var APPID = '1737582193227816';

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

var app = angular.module('com.github.devzer01.typeMaster', $modules)
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

app.factory('DMVAST', function () {

    return {
        init: function () {
            DMVAST.client.cappingFreeLunch = 10;
        },
        get: function (url, cb) {
            DMVAST.client.cappingFreeLunch = 2;
            return DMVAST.client.get(url, cb);
        }
    };



});

app.factory('facebookService', ['$rootScope', '$q',  function($rootScope, $q) {
        return {
            id: 0,
            getMyLastName: function() {
                var deferred = $q.defer();
                FB.api('/me', {
                    fields: 'last_name'
                }, function(response) {
                    if (!response || response.error) {
                        deferred.reject('Error occured');
                    } else {
                        deferred.resolve(response);
                    }
                });
                return deferred.promise;
            },
            putScore: function (id, score) {
                var deferred = $q.defer();
                FB.api('/' + id + '/scores', "POST", {
                    score: score
                }, function (response) {
                    console.log(response);
                });
                return deferred.promise;
            },
            getScores: function (cb) {
                FB.api('/' + APPID + '/scores', "GET", {

                }, cb);
            }

        }
    }]);


app.run(['$rootScope', '$window', 'facebookService',
    function($rootScope, $window, facebookService) {

        $rootScope.user = {};

        $rootScope.scores = {};

        /*$window.fbAsyncInit = function() {
            FB.init({
                //appId: '1737582193227816', '1739145769738125'
                appId: APPID,
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.8'
            });

            function onLogin(response) {
                if (response.status == 'connected') {
                    FB.api('/me?fields=first_name,id,last_name', function(data) {
                        var welcomeBlock = document.getElementById('fb-welcome');
                        welcomeBlock.innerHTML = 'Hello, ' + data.first_name + '!';
                        $rootScope.user = data;

                        facebookService.getScores(function (data) {
                            $rootScope.scores = data.data;
                        });

                    });

                }
            }

            FB.getLoginStatus(function(response) {
                // Check login status on load, and if the user is
                // already logged in, go directly to the welcome message.
                if (response.status == 'connected') {
                    onLogin(response);
                } else {
                    // Otherwise, show Login dialog first.
                    FB.login(function(response) {
                        onLogin(response);
                    }, {scope: 'user_friends, email, user_games_activity, publish_actions'});
                }
            });
        };

        (function(d){
            // load the Facebook javascript SDK

            var js,
                id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/sdk.js";

            ref.parentNode.insertBefore(js, ref);

        }(document));*/

    }]);


