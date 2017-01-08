'use strict';

var typeMaster = typeMaster || {module: {}};
typeMaster['module']['si_LK'] = 'com.github.devzer01.typeMaster.core.data.sinhala';

angular.module('com.github.devzer01.typeMaster.core.data.sinhala', ['com.github.devzer01.typeMaster.core.locale.sinhala'])
    .provider('sinhala', ['localeSiProvider',function(typeMasterLocaleProvider) {
        this.$get = {
            locale: 'si_LK',
            name: 'Basic Sinhala',
            localName: 'සරල සිංහල',
            filter: typeMasterLocaleProvider.$get().filter,
            keyboard: typeMasterLocaleProvider.$get().keyboard,
            level: "constant",
            defaultLevel: "constant",
            levels: { "constant" : "ව්‍යංජන",  "vowels" : "ස්වර",  "easy": "වචන" },
            words: {
                constant: "ටවරමඩබඅජඩඉපලගඑහමසදචනකතව".split(""),
                vowels: ["අ","ආ","ඇ","ඈ","ඉ","ඊ","උ","\u0D8C","එ","ඔ","ඕ"],
                easy: ["අම්මා", "මගුල් කෑම", "රැකියාව", "අලුත් අවුරුද්ද", "මිතුරා", "ජනාවාස", "සවාරිය", "ජනාධිපතිතුමා", "පියතුමා", "සිරිත් විරිත්"]
            },
            translation: {
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
                'EFFICIENCY': '',
                'TIME': '',
                'SCORE': '',
                'LOOSE': 'LOOSE',
                'WON': 'WON',
                'PLAY_AGAIN': ''
            }
        };
}]);