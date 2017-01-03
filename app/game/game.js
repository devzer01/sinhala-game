'use strict';


var ignoreKeyCodes = [16, 17, 18];

var sinhala = {
    3458: [["x", false, false]],
    3459: [["X", true, false]],
    3461: [["w", false, false]],
    3462: [["w", false, false], ["d", false, false]],
    3463: [["w", false, false], ["e", false, false]],
    3464: [["w", false, false], ["e", true, false]],
    3465: [["b", false, false]],
    3466: [["b", true, false]],
    3467: [["w", true, false]],
    3468: [["w", true, false], ["a", true, false]],
    3469: [["r", true, false]],
    3470: [["r", true, false], ["d", true, false]],
    3471: [[",", false, true]],
    3472: [[",", false, true], ["d", true, false]],
    3473: [["t", false, false]],
    3474: [["t", false, false], ["a", false, false]],
    3475: [["t", false, false], ["f", false, false]],
    3476: [["t", true, false]],
    3477: [["t", true, false], ["a", false, false]],
    3478: [["t", true, false], ["a", true, false]],
    3482: [["l", false, false]],
    3483: [["l", true, false]],
    3484: [[".", false, false]],
    3485: [[".", true, false]],
    3486: [["v", false, true]], //revisit "ඞ":{"code":3486}
    3487: [[".", false, true]],
    3488: [["p", false, false]],
    3489: [["p", true, false]],
    3490: [["c", false, false]],
    3491: [["c", true, false]],
    3492: [["[", false, false]],
    3493: [["[", true, false]],
    3494: [["c", false, true]],
    3495: [["g", false, false]],
    3496: [["g", true, false]],
    3497: [["v", false, false]],
    3498: [["v", true, false]],
    3499: [["k", true, false]],
    3500: [["v", false, true]],
    3501: [[";", false, false]],
    3502: [[";", true, false]],
    3503: [["o", false, false]],
    3504: [["o", true, false]],
    3505: [["k", false, false]],
    3507: [["o", false, true]],
    3508: [["m", false, false]],
    3509: [["m", true, false]],
    3510: [["n", false, false]],
    3511: [["n", true, false]],
    3512: [["u", false, false]],
    3513: [["u", true, false]],
    3514: [["h", false, false]],
    3515: [["r", false, false]],
    3517: [[",", false, false]],
    3520: [["j", false, false]],
    3521: [["y", true, false]],
    3522: [["i", true, false]],
    3523: [["i", false, false]],
    3524: [["y", false, false]],
    3525: [[",", true, false]],
    3526: [["f", true, false]],
    3530: [["a", false, false]],
    3535: [["d", false, false]],
    3536: [["e", false, false]],
    3537: [["e", true, false]],
    3538: [["s", false, false]],
    3539: [["s", true, false]],
    3540: [["q", false, false]],
    3542: [["q", true, false]],
    3544: [["d", true, false]],
    3545: [["f", false, false]],
    3546: [["f", false, false], ["a", false, false]],
    3547: [["f", false, false], ["f", false, false]],
    3548: [["f", false, false], ["d", false, false]],
    3549: [["f", false, false], ["d", false, false], ["a", false, false]],
    3550: [["f", false, false], ["d", true, false]],
    3551: [["a", true, false]],
    3571: [["d", true, false]],
    3570: [["d", true, false], ["d", true, false]]};

angular.module('com.github.devzer01.Training.game', ['ngRoute', 'com.github.devzer01.Training.gamecore'])
    .config(['$routeProvider', 'com.github.devzer01.Training.gamecoreProvider', function($routeProvider, gamecoreProvider) {
      $routeProvider.when('/game', {
        templateUrl: 'game/game.html',
        controller: 'GameCtrl'
      });
    }])

    .controller('GameCtrl', ['$scope', '$interval', 'com.github.devzer01.Training.gamecore', '$window',
        function ($scope, $interval, gameCore, $window) {

            $scope.difficulty = gameCore.level;;

            $scope.levels = gameCore.levels;

            angular.element(document).ready(function () {
                $scope.start();
            });

            var stop;
            $scope.gameStart = function() {
                if ( angular.isDefined(stop) ) return;
                if (!$scope.active) {
                    $scope.active = true;
                    $scope.getNextWord(); //යැරටැරට
                }
                stop = $interval(function() {
                    if ($scope.roundTimer <= 0.01 || $scope.active === false) {
                        $interval.cancel(stop);
                        stop = undefined;
                        return $scope.gameStop();
                    }
                    $window.document.getElementById("type-here").focus();
                    $scope.roundTimer -= 0.01;
                }, 10);
            };

            $scope.setLevel = function (v) {
                $scope.difficulty = v;
                gameCore.level = v;
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
                $scope.active = false;
                if ($scope.req !== $scope.correct) {
                    $scope.result = "පැරදි";
                }

                if ($scope.progress.length === 0) {
                    $scope.rate = 0;
                } else {
                    var r = $scope.progress.reduce(function (aclw, word) {
                        var keyStrokes = word.char.reduce(function (acl, char) {
                            return acl + char.counter;
                        }, 0);
                        return (aclw + (keyStrokes / word.word.length));
                    }, 0.00);
                    $scope.rate = ($scope.progress.length / r) * 100;
                }

                $scope.gameResult = true;
            };

            $scope.gameResult = false;

            $scope.getNextWord = function () {
                $scope.current.init($scope.gameWords.pop());
                //console.log($scope.gameWords);
            };

            $scope.reset = function() {
                $scope.score = 0;
                $scope.roundTimer = $scope.roundTime;
                $scope.countdownCounter = 2;
                $scope.gameResult = false;
                $scope.result = "දිනුම්";
                $scope.correct = 0;
                $scope.req = 0;
                $scope.progress = [];
            };

            $scope.start = function () {
                $scope.reset();
                $scope.countdownStart();
                $scope.gameWords = gameCore.getWordList();
                $scope.req = $scope.gameWords.length;
            };

            $scope.stop = function () {
                if (!$scope.active) return;
                $interval.cancel(stop);
                stop = undefined;
                $scope.active = false;
                $scope.gameStop();
            };

            $scope.$on('$destroy', function() {
                $scope.stop();
            });

            $scope.correct = 0;
            $scope.req = 0;

            $scope.current = {
                score: 0,
                code: 0,
                keyCode: 0,
                stat: {hint: false, key: false},
                codes: [],
                char: [],
                word: null,
                display: null,
                input: null,
                _length: 0,
                index: -1,
                hint: "",
                charInit: function () {
                    return this.char[this.index + 1];
                },
                init: function (word) {
                    this.input = null;
                    $window.document.getElementById("type-here").value = "";
                    this.display = word;
                    this.score = 0;
                    this.code = 0;


                    var filter = {
                        3462: ["අ", "ා"],
                        3463: ["අ" , "ැ"],
                        3464: ["අ", "ෑ"],
                        3477: ["ඔ", "්"],
                        3468: ["උ", "\u0DDF"]
                    };

                    var k = Object.keys(filter);
                    for (var _k = 0; _k < k.length; _k++) {
                        var _replace = filter[k[_k]];
                        var _idx = parseInt(k[_k]);
                        var _rep = getCodeArray(word).indexOf(_idx);
                        while (_rep >= 0) {
                            var letters = word.split("");
                            letters.splice(_rep, 1, _replace[0], _replace[1]);
                            word = letters.join("");
                            _rep = getCodeArray(word).indexOf(_idx);
                        }
                    }
                    console.log(word);
                    this.word = word;
                    this.codes = getCodeArray(word);
                    this.char = this._setCharArray();
                    this.stat = this.char[0];
                    this.hint = this.stat.hint;
                },
                _setCharArray: function () {
                    var _temp = [];
                    for (var i=0; i < this.word.length; i++) {
                        var _code = this.codes[i];
                        _temp[i] = ({
                            index: i,
                            hint: sinhala[this.codes[i]],
                            answered: false,
                            first: true,
                            score: 0,
                            counter: 0,
                            expected: _code,
                            history: [],
                            key: this.word[i],
                            code: 0
                        });
                    }
                    return _temp;
                },
                progress: function () {
                    this.input = $window.document.getElementById("type-here").value;
                    if (this.input.length === 0 || this.input.length > this.word.length) return true;
                    this.index = this.input.length - 1;
                    if (this.stat.index !== this.index) {
                        this.char[this.stat.index] = Object.assign({}, this.stat);
                        this.stat = Object.assign({}, this.char[this.index]);
                    }
                    this.stat.input = this.input.charCodeAt(this.index);
                    if (this.stat.history !== undefined) {
                        this.stat.history.push(this.stat.input);
                    }

                    this.stat.counter++;

                    if (this.stat.expected === this.stat.input) {

                        if (!this.stat.answered) {
                            if (this.stat.first) {
                                this.stat.score += 100;
                            }
                            this.stat.score = this.stat.score += 10;
                            this.stat.answered = true;
                            this.score += this.stat.score;
                        }

                        this.char[this.stat.index] = Object.assign({}, this.stat);
                        this.stat = Object.assign({}, this.char[this.input.length]);

                    } else {
                        this.stat.first = false;
                        this.score -= this.stat.counter * 3;
                    }

                    this.complete();

                },
                handler: function (e) {
                    console.log($window.document.getElementById("type-here").value);
                    this.keyCode = e.keyCode;
                    this.progress();
                }, 
                complete: function () {
                    var done = (this.word.length === this.input.length && this.word === this.input);
                    var done2 = (this.display.length === this.input.length && this.display === this.input);
                    if (!done && !done2) return false;

                    $scope.correct++;
                    $scope.score = $scope.current.score;
                    $scope.progress[$scope.counter++] = Object.assign({}, $scope.current);
                    if ($scope.gameWords.length !== 0) {
                        $scope.getNextWord();
                    }  else {
                        $scope.active = false;
                    }
                }
            };

            $scope.rate = 0.00;

            $scope.result = "දිනුම්";

            $scope.active = false;

            $scope.progress = [];

            $scope.counter = 0;

            $scope.score = 0; //wordList;

            $scope.countdownCounter = 2;

            $scope.roundTime = 600.00;

            $scope.roundTimer = 600.00;
    }]);


var getCodeArray = function(word) {
    var tempArray = [];
    for (var i=0; i < word.length; i++) {
        tempArray[i] = fixedCharCodeAt(word, i);
    }
    return tempArray;
};

var fixedCharCodeAtWithCode = function(code) {
    var hi, low;

    if (0xD800 <= code && code <= 0xDBFF) {
        hi = code;
        low = str.charCodeAt(idx + 1);
        if (isNaN(low)) {
            throw 'High surrogate not followed by low surrogate in fixedCharCodeAt()';
        }
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
        return false;
    }
    return code;
};

var fixedCharCodeAt = function(str, idx) {
    idx = idx || 0;
    var code = str.charCodeAt(idx);
    var hi, low;

    if (0xD800 <= code && code <= 0xDBFF) {
        hi = code;
        low = str.charCodeAt(idx + 1);
        if (isNaN(low)) {
            throw 'High surrogate not followed by low surrogate in fixedCharCodeAt()';
        }
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
        return false;
    }
    return code;
};