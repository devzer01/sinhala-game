'use strict';

// Declare app level module which depends on views, and components
angular.module('com.github.devzer01.Training', [
    'ngRoute', 'com.github.devzer01.Training.welcome', 'com.github.devzer01.Training.help',
    'com.github.devzer01.Training.game', 'com.github.devzer01.Training.version', 'com.github.devzer01.Training.gamecore', 'angulartics', 'angulartics.google.analytics', 'pascalprecht.translate']).
config(['$locationProvider', '$routeProvider', '$compileProvider', '$analyticsProvider', '$translateProvider', function($locationProvider, $routeProvider, $compileProvider, $analyticsProvider, $translateProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/welcome'});
    $compileProvider.debugInfoEnabled(false);
    $analyticsProvider.virtualPageviews(false);
    $translateProvider.translations('si_LK', {
        'VERSION': 'කාන්ඩය',
        'COPYRIGHT': 'ඕල් රයිට්ස් රිසව්ඩ් - පිටුව සහ අපි',
        'APPNAME' : 'පිටුව ටයිපින් ඇසිස්ටන්ට්',
        'GREETINGS' : 'ආයුබොවන්',
        'TAGLINE' : 'විනෝදාත්මක අධ්‍යාපනය',
        'HELPTITLE' : 'සිංහල යතුරු පුවරුවක් සඳහා අව්‍ශ්‍ය උපදෙස් බොත්තම කොටන්න',
        'HELP' : 'උපදෙස්',
        'HOWTOTITLE' : 'තරග වදින හැටි',
        'STEP1' : 'ආරම්භය කොටන්න',
        'STEP2' : 'දකින වචනය ටයිප් කරන්න',
        'STEP3' : 'ශුද්ධ සිංහල පමණි (ෆොනෙටික් භාවිතා නොකරන්න)',
        'START' : 'ආරම්භය',
        'FOO': 'This is a paragraph'
    });

    $translateProvider.translations('th_TH', {
        'VERSION': 'รุ่น',
        'COPYRIGHT': 'ลิขสิทธิ์',
        'APPNAME' : 'เรียนรู้ที่จะพิมพ์',
        'GREETINGS' : 'สวัสดี',
        'TAGLINE' : 'สนุกกับการเรียน',
        'HELPTITLE' : 'සිංහල යතුරු පුවරුවක් සඳහා අව්‍ශ්‍ය උපදෙස් බොත්තම කොටන්න',
        'HELP' : 'උපදෙස්',
        'HOWTOTITLE' : 'วิธีการเล่น',
        'STEP1' : 'กดปุ่มเริ่มต้น',
        'STEP2' : 'ประเภทคำที่คุณเห็น',
        'STEP3' : 'ใช้แป้นพิมพ์ดิบ - ไม่ออกเสียง',
        'START' : 'เริ่มต้น',
        'FOO': 'This is a paragraph'
    });

    $translateProvider.preferredLanguage('th_TH');
}]);


