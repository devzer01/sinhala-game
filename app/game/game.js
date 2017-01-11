'use strict';


var ignoreKeyCodes = [16, 17, 18];

angular.module('com.github.devzer01.typeMaster.game', ['ngRoute', 'com.github.devzer01.typeMaster.core', 'pascalprecht.translate'])
    .config(['$routeProvider', '$coreProvider', function($routeProvider, $coreProvider) {
      $routeProvider.when('/game', {
        templateUrl: 'game/game.html',
        controller: 'GameCtrl'
      });


    }])

    .controller('GameCtrl', ['$scope', '$interval', '$core', '$window', '$analytics', '$coreService', '$translate', 'facebookService', '$rootScope',
        function ($scope, $interval, $core, $window, $analytics, $coreService, $translate, facebookService, $rootScope) {

            $scope.difficulty = $core.level;

            $scope.levels = $core.levels;

            $scope.$coreService = $coreService;
            
            $translate.use($core.pack);

            angular.element(document).ready(function () {
                //$scope.start();
                console.log($core);
                $coreService.setup($core.data[$core.pack].words[$core.level], $core.data[$core.pack].filter, $core.data[$core.pack].keyboard);
                $analytics.pageTrack('/games');
                $scope.countdownStart();
                //$analytics.eventTrack('firstTry', {  category: gameCore.level, label: 'level' });
                //$analytics.eventTrack('eventName', {  category: 'category', label: 'label' });
            });

            $scope.start = function () {
                $coreService.reset();
                $scope.countdownCounter = 2;
                $scope.roundTimer = $scope.roundTime;
                $scope.gameResult = false;
                $coreService.setup($core.words[$core.level], $core.filter, $core.keyboard);
                $scope.countdownStart();
            };

            var stop; var cancel;
            $scope.gameStart = function() {
                if ( angular.isDefined(stop) ) return;
                if (!$coreService.active) {
                    $coreService.active = true;
                    $coreService.getNextWord(); //යැරටැරට
                }
                cancel = false;
                stop = $interval(function() {
                    if (!cancel && ($scope.roundTimer == 0.1 || $coreService.active === false)) {

                        cancel = !cancel;
                        $interval.cancel(stop);
                        stop = undefined;
                        return $scope.gameStop();
                    }
                    $window.document.getElementById("type-here").focus();
                    $scope.roundTimer -= 0.1;
                }, 100);
            };

            $scope.setLevel = function (v) {
                $scope.difficulty = v;
                $core.level = v;
            };

            var countdown;
            $scope.countdownStart = function () {
                if ( angular.isDefined(countdown) ) return;
                countdown = $interval(function() {
                    $scope.countdownCounter -= 1;
                    if ($scope.countdownCounter === 0) {
                        $interval.cancel(countdown);
                        countdown = undefined;
                        $scope.gameStart();
                    }
                }, 1000);
            };

            $scope.gameStop = function () {
                if ($scope.gameResult) return;
                $scope.gameResult = true;
                if ($coreService.req !== $coreService.correct) {
                    $translate("LOOSE").then(function (result) {
                        $scope.result = result;
                    }, function (id) {
                        $scope.result = id;
                    });
                }

                $analytics.eventTrack('stop');

                if ($coreService.progress.length === 0) {
                    $scope.rate = 0;
                } else {
                    var r = $coreService.progress.reduce(function (aclw, word) {
                        var keyStrokes = word.char.reduce(function (acl, char) {
                            return acl + char.counter;
                        }, 0);
                        return (aclw + (keyStrokes / word.word.length));
                    }, 0.00);
                    $scope.rate = ($coreService.progress.length / r) * 100;
                }
                facebookService.putScore($rootScope.user.id, $coreService.score);

            };

            $scope.gameResult = false;

            $scope.rate = 0.00;

            $translate("WON").then(function (result) {
                $scope.result = result;
            }, function (id) {
                $scope.result = id;
            });

            $scope.active = false;

            $scope.progress = [];

            $scope.counter = 0;

            $scope.score = 0; //wordList;

            $scope.countdownCounter = 2;

            $scope.roundTime = 600.00;

            $scope.roundTimer = 600.00;
    }]);
