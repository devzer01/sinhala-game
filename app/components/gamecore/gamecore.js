'use strict';

angular.module('com.github.devzer01.Training.gamecore', [])
    .provider('com.github.devzer01.Training.gamecore', function () {
        var level = "constant";
        var defaultLevel = "constant";

        var wordList = {};
        wordList.constant = "ටවරමඩබඅජඩඉපලගඑහමසදචනකතව".split("");
        wordList.vowels = ["අ","ආ","ඇ","ඈ","ඉ","ඊ","උ","\u0D8C","එ","ඔ","ඕ"];
        wordList.foo = ["ඨ්", "ඨ", "ළු", "ඛ", "ඊ", "ඟ"];
        wordList.testx = ["ආ", "ඇ", "ඈ"];
        wordList.easy = ["අම්මා", "මගුල් කෑම", "රැකියාව", "අලුත් අවුරුද්ද", "මිතුරා", "ජනාවාස", "සවාරිය", "ජනාධිපතිතුමා", "පියතුමා", "සිරිත් විරිත්"];

//wordList.medium = ["සාමර්ථ්‍යය", "අතුරුබාධනය", "කෘෂිකර්මය", "භූගෝලවිද්‍යාව", "පාර්ලිමේන්තුව", "දේශපාලන විද්‍යාව", "මාර්ගදර්ශකයා", "ලංකාදීපය", "කථානායක", "සනීතිඥයා"];
//wordList.hard = ["පෞරාණික", "නෂ්ටාවශේෂ", "ගරාවැටුණු ගොඩනැඟිලි ආදිය", "විශ්වවිද්‍යාලයයේ විද්‍යාංශය", "ඡ්‍යෝතිෂ්ශාස්ත්‍රය", "තාරකාශාස්ත්‍රය", "ගුවන් විදුලිය ප්‍රචාරය", "එකිනෙකා නසාගන්නා", "ලිංගික", "ආකාශයාත්‍රාව"];
//wordList.expert = ["අපකීර්තියට පමුණවනවා", "සාක්ෂරතාව", "මුහුදු රාජාලියා", "විශ්වවිද්‍යාලය", "විශ්ව විද්‍යාලයයක මහාචාර්යවරයා", "මූලධර්මය", "කාබොහයිඩේ‍්‍රට් පරිවෘත්තිය", "මරණීය දණ්ඩනය", "අතන්ද්‍රතාව", "ශුක්‍රාණුව"];


        this.$get = function () {
          return {level: "constant", defaultLevel: "constant", levels: {
              "constant" : "ව්‍යංජන",
              "vowels" : "ස්වර",
              "easy": "වචන"
          },
          getWordList: function () {
              //return shuffleArray(wordList.testx.slice());
              return shuffleArray(wordList[this.level].slice());
          }
          };
        };
    });


var shuffleArray = function(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
};
//constant
