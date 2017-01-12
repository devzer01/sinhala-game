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

        angular.element(document).ready(function () {
            /*DMVAST.get("https://ssd.appprizes.com/foobar/foobar/foobar/foobar/fc.php?script=apVideo:vast2&foo=1158", function (error, response) {
                console.log(error);
                console.log(response);
            });*/

                        //1631
        });

        /**
         *  Ih = function(a, b) {
            var c = function(a, c, d) {
                    var e = b.createElement("param");
                    e.name = c;
                    e.value = d;
                    a.appendChild(e)
                },
                d = Hh(a),
                e = b.createElement("object");
            e.type = "application/x-shockwave-flash";
            e.data = d;
            c(e, "movie", d);
            c(e, "allowscriptaccess", "always");
            c(e, "wmode", "opaque");
            e.style.visibility = "s" == a.l ? "" : "hidden";
            e.style.opacity = 0;
            return e
         */

        $scope.playAd = function () {

            /*var vid1 = videojs("my-player", {}, function () {
                /!*var player = this;
                var vastPlugin = player.vastClient({
                    adTagUrl: "//ssd.appprizes.com/foobar/foobar/foobar/foobar/fc.php?script=apVideo:vast2&foo=1631",
                    playAdAlways: true,
                    adCancelTimeout: 60000,
                    vpaidFlashLoaderPath: './VPAIDFlash.swf'
                });
                player.on('reset', function () {
                    console.log('vast-plugin enabled - ' +  vastPlugin.isEnabled() ? 'true' : 'false')
                    if (!vastPlugin.isEnabled()) {
                        vastPlugin.enable();
                    } else {
                        vastAd.disable();
                    }
                });*!/
            });

            vid1.muted(true);
            vid1.ads();
            vid1.vast({
                url: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/1004091/Mobile_Pre_Roll&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]'
            });

            var vid = videojs("vid1");
            vid.on("ended", function(){
                vid.posterImage.show();
                vid.currentTime(0);
            })
*/
            /*


            vid1.vast(
                {url: "https://ssd.appprizes.com/foobar/foobar/foobar/foobar/fc.php?script=apVideo:vast2&foo=1631"}
            );

            DMVAST.get("https://ssd.appprizes.com/foobar/foobar/foobar/foobar/fc.php?script=apVideo:vast2&foo=1631", function (response, error) {
                console.log(error);
                console.log(response);

                var vid = document.getElementById("vid2");
                console.log(vid);
                var mediaFile = response.ads[0].creatives[0].mediaFiles[0];
                if (mediaFile.mimeType === "application/x-shockwave-flash") {

                    swfobject.embedSWF(mediaFile.fileURL, "dads", "300", "140");

                } else {
                    vid.src = response.ads[0].creatives[0].mediaFiles[0].fileURL;
                    vid.play();
                }
            });
*/
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
