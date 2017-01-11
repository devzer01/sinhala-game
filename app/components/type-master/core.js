'use strict';

var gameData = null;

var stepsPerGame = 10;

var core = angular.module('com.github.devzer01.typeMaster.core', []);

core.config(function ($provide) {
    $provide.provider("$core", ['$injector', function () {

        this.data = {};
        
        this.packs = [];

        this.pack = null;

        this.register = function ($locale, $data) {
            this.data[$locale] = $data
            this.packs.push($locale);
        };

        this.setConfig = function (data) {
            gameData = data;
        };

        this.setPack = function ($pack) {
            this.pack = $pack;
        };

        this.$get = function () {
            return {
                gameData: gameData,
                register: this.register,
                setConfig: this.setConfig,
                setPack: this.setPack,
                packs: this.packs,
                data: this.data,
                pack: this.pack
            };
        };
    }]);
});

core.service('$coreService',['$interval', '$window', function ($interval, $window) {

        this.data = null;

        this.game = null;

        this.filter = null;

        this.keyboard = null;

        this.counter = 0;

        this.setup = function ($data, $filter, $keyboard) {
            this.data = $data;
            this.game = this.shuffle(this.data).slice(0, stepsPerGame);
            this.req = 10;
            this.filter = $filter;
            this.keyboard = $keyboard;
        };


        this.score = 0;

        this.countdownCounter = 2;
        this.gameResult = false;
        this.result = "WON";
        this.correct = 0;
        this.req = 0;
        this.progress = [];
         


        this.getNextWord = function () {
            this.init(this.game.pop());
        };

        this.reset = function() {
            //$analytics.eventTrack('resetTry', {  category: gameCore.level, label: 'level' });
            $window.document.getElementById("type-here").value = "";
            this.active = false;
            this.score = 0;
            this.countdownCounter = 2;
            this.gameResult = false;
            this.result = "WON";
            this.correct = 0;
            this.req = 0;
            this.progress = [];
            this.counter = 0;
            this.game = this.shuffle(this.data).slice(0, stepsPerGame);
        };

        this.current = {
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
            hint: ""
        };


        this.charInit = function () {
            return this.current.char[this.current.index + 1];
        };

        this.init = function (word) {
            this.current.input = null;
            this.current.display = word;
            this.current.score = 0;
            this.current.code = 0;

            var k = Object.keys(this.filter);
            for (var _k = 0; _k < k.length; _k++) {
                var _replace = this.filter[k[_k]];
                var _idx = parseInt(k[_k]);
                var _rep = this.getCodeArray(word).indexOf(_idx);
                while (_rep >= 0) {
                    var letters = word.split("");
                    letters.splice(_rep, 1, _replace[0], _replace[1]);
                    word = letters.join("");
                    _rep = this.getCodeArray(word).indexOf(_idx);
                }
            }
            //console.log(word);
            this.current.word = word;
            this.current.codes = this.getCodeArray(word);
            this.current.char = this._setCharArray();
            this.current.stat = this.current.char[0];
            this.current.hint = this.current.stat.hint;
        };

        this._setCharArray = function() {
            var _temp = [];
            for (var i=0; i < this.current.word.length; i++) {
                var _code = this.current.codes[i];
                _temp[i] = ({
                    index: i,
                    hint: this.keyboard[this.current.codes[i]],
                    answered: false,
                    first: true,
                    score: 0,
                    counter: 0,
                    expected: _code,
                    history: [],
                    key: this.current.word[i],
                    code: 0
                });
            }
            return _temp;
        };

        this._progress = function () {
            this.current.input = $window.document.getElementById("type-here").value;
            if (this.current.input.length === 0 || this.current.input.length > this.current.word.length) return true;
            this.current.index = this.current.input.length - 1;
            if (this.current.stat.index !== this.current.index) {
                this.current.char[this.current.stat.index] = Object.assign({}, this.current.stat);
                this.current.stat = Object.assign({}, this.current.char[this.current.index]);
            }
            this.current.stat.input = this.current.input.charCodeAt(this.current.index);
            if (this.current.stat.history !== undefined) {
                this.current.stat.history.push(this.current.stat.input);
            }

            this.current.stat.counter++;

            if (this.current.stat.expected === this.current.stat.input) {

                if (!this.current.stat.answered) {
                    if (this.current.stat.first) {
                        this.current.stat.score += 100;
                    }
                    this.current.stat.score += 10;
                    this.current.stat.answered = true;
                    this.current.score += this.current.stat.score;
                }

                this.current.char[this.current.stat.index] = Object.assign({}, this.current.stat);
                this.current.stat = Object.assign({}, this.current.char[this.current.input.length]);

            } else {
                this.current.stat.first = false;
                this.current.score -= this.current.stat.counter * 3;
            }

            this.complete();
        };

        this.handler = function (e) {
            return this._progress();
        };

        this.complete = function () {
            var done = (this.current.word.length === this.current.input.length && this.current.word === this.current.input);
            var done2 = (this.current.display.length === this.current.input.length && this.current.display === this.current.input);
            if (!done && !done2) return false;

            this.correct++;
            this.score += this.current.score;
            this.current.score = 0;
            this.progress[this.counter++] = Object.assign({}, this.current);
            if (this.game.length !== 0) {
                $window.document.getElementById("type-here").value = "";
                this.getNextWord();
            }  else {
                this.active = false;
            }
        };

        this.shuffle = function (arr) {
            var m = arr.length, t, i;

            while(m) {
                i = Math.floor(Math.random() * m--);
                t = arr[m];
                arr[m] = arr[i];
                arr[i] = t;
            }

            return arr;
        };

        this.getCodeArray = function(word) {
            var tempArray = [];
            for (var i=0; i < word.length; i++) {
                tempArray[i] = this.fixedCharCodeAt(word, i);
            }
            return tempArray;
        };

        this.fixedCharCodeAt = function(str, idx) {
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

    }]);