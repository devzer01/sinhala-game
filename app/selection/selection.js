'use strict';

angular.module('com.github.devzer01.typeMaster.selection', ['ngRoute', 'com.github.devzer01.typeMaster.core', 'pascalprecht.translate'])

.config(['$routeProvider', '$coreProvider', function($routeProvider, $coreProvider) {

    $routeProvider.when('/selection', {
        templateUrl: 'selection/selection.html',
        controller: 'SelectionCtrl'
    });


}])

    .controller('SelectionCtrl', ['$scope' , '$location', '$core', '$translate', '$window', '$injector', '$rootScope', 'DMVAST', function ($scope, $location, $core, $translate, $window, $injector, $rootScope, DMVAST) {

        $translate.use('en');


        $scope.playAd = function () {


        };

        $scope.packs = $core.packs.map(function (v) {
            return {
                locale: v,
                localName: $core.data[v].localName,
                name: $core.data[v].name
            };
        });

        $scope.setPack = function (v) {
            console.log($rootScope);
            $translate.use(v);
            $core.setPack(v);
            $core.setConfig($core.data[v]);
            $location.path('welcome');
        };
    }]);





function onLoad(err, adUnit) {
    if (err) {
        console.log(err);
        return;
    }

    adUnit.subscribe('AdLoaded', onInit);

    [
        'AdStopped',
        'AdSkipped',
        'AdSizeChange',
        'AdLinearChange',
        'AdDurationChange',
        'AdExpandedChange',
        'AdRemainingTimeChange', // [Deprecated in 2.0] but will be still fired for backwards compatibility
        'AdVolumeChange',
        'AdImpression',
        'AdVideoStart',
        'AdVideoFirstQuartile',
        'AdVideoMidpoint',
        'AdVideoThirdQuartile',
        'AdVideoComplete',
        'AdInteraction',
        'AdUserAcceptInvitation',
        'AdUserMinimize',
        'AdUserClose',
        'AdPaused',
        'AdPlaying',
        'AdLog',
        'AdError'
    ].forEach(function(event) {
        adUnit.subscribe(event, function() {
            console.log('---------------------------------------> ' + event, 'arguments:', arguments);
        })
    });

    adUnit.subscribe('AdSkippableStateChange', function () {
        skipAd.style.display = 'block';
        console.log('---------------------------------------> AdSkippableStateChange', 'arguments:', arguments);
    });


    adUnit.subscribe('AdClickThru', function (clickData) {
        console.log('---------------------------------------> AdClickThru', 'arguments:', arguments);
        if (clickData.playerHandles) {
            window.open(clickData.url, '_blank');
        }
    });

    adUnit.subscribe('AdStarted', function () {
        console.log('---------------------------------------> AdStarted');
        adUnit.setAdVolume(0);
    });

    skipAd.addEventListener('click', function() {
        adUnit.skipAd();
    });

    adUnit.handshakeVersion('2.0', onHandShake);

    function onHandShake(error, result) {
        console.log('-------------------------------> onHandShake');
        console.log('version:', result);
        adUnit.initAd(480, 360, 'normal', -1, {AdParameters: currentAd.adParameters}, {}, function(err) {
            console.log('error?', err);
        });
    }

    function onInit() {
        console.log('------------------------------> AdLoaded');
        adUnit.startAd(function (error) {
            console.log('startAd', error);
        });
    }
}