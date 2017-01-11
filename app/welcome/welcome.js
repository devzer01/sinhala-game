'use strict';

angular.module('com.github.devzer01.typeMaster.welcome', ['ngRoute', 'com.github.devzer01.typeMaster.core', 'pascalprecht.translate'])

.config(['$routeProvider', '$coreProvider', function($routeProvider, $coreProvider) {

    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });

}])

    .controller('WelcomeCtrl', ['$scope' , '$location', '$core', '$translate', '$window', function ($scope, $location, $core, $translate, $window) {

        if ($core.pack === null) {
            return $location.path('selection');
        }

        $scope.getMyLastName = function() {
            facebookService.getMyLastName()
                .then(function(response) {
                        $scope.last_name = response.last_name;
                    }
                );
        };


        $scope.pack = $core.pack;

        var lng = $core.data[$core.pack];

        $scope.difficulty = lng.defaultLevel;

        $scope.levels =  lng.levels;

        $scope.isTh = ($translate.use() === "th_TH");

        $scope.help = function () {
            $location.path('help');
        };

        $scope.setLevel = function (v) {
            $core.level = v;
            $scope.difficulty = v;
        };

        $scope.game = function () {

            if ($window.document.getElementById('GOOGLE_INPUT_CHEXT_FLAG') !== null) {
                console.log("Google Input Tools Found");
            }
            $translate.use($scope.pack);
            $core.level = $scope.difficulty;
            $location.path('game');
        };
    }]);
