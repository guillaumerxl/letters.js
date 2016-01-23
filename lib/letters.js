var Letters =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Letters = function () {
	  function Letters() {
	    var words = arguments.length <= 0 || arguments[0] === undefined ? ["PROVIDE", "WORDS"] : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Letters);

	    var defaultAlphabet = "abcdefghijklmnopqrstuvwxyz0123456789&é~\"#'{}[]()-|è``_\\ç^à@=+°$£€¤µ*%ù§!/:.;?,><".split('');
	    var defaultOptions = {
	      duration: options.duration || 2,
	      paused: options.paused || 10,
	      mode: options.mode || "alphabet",
	      once: options.once || false,
	      container: options.container || document.body,
	      alphabet: options.alphabet ? typeof options.alphabet == "string" ? options.alphabet.split('') : options.alphabet : defaultAlphabet
	    };
	    console.log(options);
	    this.options = defaultOptions;
	    this.container = typeof this.options.container == "string" ? document.getElementById(this.options.container) : this.options.container;
	    this.words = words;
	    this.wordsCount = this.words.length;
	    this.wordsDom = {};

	    this.start = null;

	    for (var i = 0; i < this.wordsCount; i++) {
	      var _words = this.words[i];
	      var single = true;
	      if (_typeof(this.words[i]) == "object") {
	        single = false;
	      }

	      if (single) {
	        var name = _words.toLowerCase();
	        var wordContainer = document.createElement("span");
	        wordContainer.className = name + "-container word-container";
	        this.wordsDom[name] = [];
	        for (var j = 0; j < name.length; j++) {
	          var span = document.createElement("span");
	          span.className = name + "-" + j;
	          wordContainer.appendChild(span);
	          this.wordsDom[name][j] = {
	            element: span,
	            animating: false,
	            original: _words.substr(j, 1),
	            single: true
	          };
	          span.addEventListener('mouseover', this.mouseOnLetter.bind(this));
	          span.addEventListener('mouseout', this.mouseOutLetter.bind(this));
	        }

	        this.container.appendChild(wordContainer);
	      } else {
	        var max = 0;
	        var name = "";
	        for (var j = 0; j < _words.length; j++) {
	          name = _words[j].length > max ? _words[j].toLowerCase() : name;
	          max = _words[j].length > max ? _words[j].length : max;
	        }

	        var wordContainer = document.createElement("span");
	        wordContainer.className = name + "-container word-container";
	        this.wordsDom[name] = [];

	        for (var j = 0; j < name.length; j++) {
	          var span = document.createElement("span");
	          span.className = name + "-" + j;
	          wordContainer.appendChild(span);
	          this.wordsDom[name][j] = {
	            element: span,
	            animating: false,
	            original: j < _words[0].length ? _words[0].substr(j, 1) : "",
	            currentWord: _words[0],
	            currentIndex: 0,
	            maxIndex: _words.length - 1,
	            words: _words,
	            all: _words,
	            single: false
	          };
	          span.addEventListener('mouseover', this.mouseOnLetter.bind(this));
	          span.addEventListener('mouseout', this.mouseOutLetter.bind(this));
	        }

	        this.container.appendChild(wordContainer);
	      }
	    }
	  }

	  _createClass(Letters, [{
	    key: "init",
	    value: function init() {
	      this.start = null;
	      this.animate();
	      this.animateLetter();
	    }
	  }, {
	    key: "animate",
	    value: function animate(ts) {
	      var _this = this;

	      var stopped = false;

	      if (ts) {
	        if (this.start === null) this.start = ts;
	        var elapsed = parseInt((ts - this.start) / 1000);
	        stopped = elapsed != 0 && elapsed % this.options.duration == 0;
	        for (var i = 0; i < this.wordsCount; i++) {
	          var word = this.words[i];
	          var single = true;
	          if (_typeof(this.words[i]) == "object") {
	            single = false;
	          }
	          if (single) {

	            if (!stopped) {
	              var alphabet = this.options.mode == "shuffle" ? this.shuffle(word.split("")) : this.getSomeLetters(word.length);
	              this.replace(word.toLowerCase(), alphabet);
	            } else {
	              this.replace(word.toLowerCase(), word.split(""));
	            }
	          } else {

	            var max = 0;
	            var name = "";
	            for (var j = 0; j < word.length; j++) {
	              name = word[j].length > max ? word[j].toLowerCase() : name;
	              max = word[j].length > max ? word[j].length : max;
	            }
	            var currentWord = this.wordsDom[name][0].currentWord;
	            if (!stopped) {
	              var alphabet = this.options.mode == "shuffle" ? this.shuffle(currentWord.split("")) : this.getSomeLetters(name.length);
	              this.replace(name.toLowerCase(), alphabet);
	            } else {
	              this.replace(name.toLowerCase(), currentWord.split(""));
	            }
	          }
	        }
	      }

	      if (stopped) {
	        if (!this.options.once) {
	          setTimeout(function () {
	            _this.start = null;
	            for (var i = 0; i < _this.wordsCount; i++) {
	              var word = _this.words[i];
	              var single = true;
	              if (_typeof(_this.words[i]) == "object") {
	                single = false;
	              }
	              if (!single) {
	                var max = 0;
	                var name = "";
	                for (var j = 0; j < word.length; j++) {
	                  name = word[j].length > max ? word[j].toLowerCase() : name;
	                  max = word[j].length > max ? word[j].length : max;
	                }
	                var currentIndex = _this.wordsDom[name][0].currentIndex;
	                var maxIndex = _this.wordsDom[name][0].maxIndex;
	                var nextWord = _this.wordsDom[name][0].all[currentIndex];
	                var nextIndex = currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
	                for (var j = 0; j < _this.wordsDom[name].length; j++) {
	                  _this.wordsDom[name][j].currentWord = nextWord;
	                  _this.wordsDom[name][j].currentIndex = nextIndex;
	                  _this.wordsDom[name][j].original = j < nextWord.length ? nextWord.substr(j, 1) : "";
	                }
	              }
	            }
	            _this.animate();
	          }, this.options.paused * 1000);
	        }
	      } else {
	        window.requestAnimationFrame(this.animate.bind(this));
	      }
	    }
	  }, {
	    key: "replace",
	    value: function replace(word, clone) {
	      var elements = this.wordsDom[word];

	      for (var i = 0; i < elements.length; i++) {
	        if (elements[i].animating) elements[i].animating = false;
	        if (clone[i]) {
	          elements[i].element.classList.remove('letter-hidden');
	          elements[i].element.innerHTML = clone[i];
	        } else {
	          elements[i].element.classList.add('letter-hidden');
	        }
	      }
	    }
	  }, {
	    key: "animateLetter",
	    value: function animateLetter() {
	      var _this2 = this;

	      Object.keys(this.wordsDom).forEach(function (item, index) {
	        var letter = _this2.getSomeLetters(1);
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = _this2.wordsDom[item][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var elem = _step.value;

	            if (elem.animating === true) {
	              elem.element.innerHTML = letter;
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      });
	      window.requestAnimationFrame(this.animateLetter.bind(this));
	    }
	  }, {
	    key: "mouseOnLetter",
	    value: function mouseOnLetter(e) {
	      e.target.classList.add('animating');
	      var name = e.target.className.replace(/(-([0-9])*|animating|letter-hidden)/g, "").trim();
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.wordsDom[name][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var elem = _step2.value;

	          if (elem.element.className == e.target.className) {
	            elem.animating = true;
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  }, {
	    key: "mouseOutLetter",
	    value: function mouseOutLetter(e) {
	      e.target.classList.remove('animating');
	      var name = e.target.className.replace(/(-([0-9])*|animating|letter-hidden)/g, "").trim();
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = this.wordsDom[name][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var elem = _step3.value;

	          if (elem.element.className == e.target.className) {
	            elem.animating = false;
	            elem.element.innerHTML = elem.original;
	          }
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	  }, {
	    key: "getSomeLetters",
	    value: function getSomeLetters(length) {
	      return this.array_rand(this.options.alphabet, length);
	    }
	  }, {
	    key: "shuffle",
	    value: function shuffle(o) {
	      for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
	      return o;
	    }
	  }, {
	    key: "array_rand",
	    value: function array_rand(input, num_req) {
	      //  discuss at: http://phpjs.org/functions/array_rand/
	      // original by: Waldo Malqui Silva
	      //   example 1: array_rand( ['Kevin'], 1 );
	      //   returns 1: 0
	      var indexes = [];
	      var ticks = num_req || 1;
	      var checkDuplicate = function checkDuplicate(input, value) {
	        var exist = false,
	            index = 0,
	            il = input.length;
	        while (index < il) {
	          if (input[index] === value) {
	            exist = true;
	            break;
	          }
	          index++;
	        }
	        return exist;
	      };

	      if (Object.prototype.toString.call(input) === '[object Array]' && ticks <= input.length) {
	        while (true) {
	          var rand = Math.floor(Math.random() * input.length);
	          if (indexes.length === ticks) {
	            break;
	          }
	          if (!checkDuplicate(indexes, rand)) {
	            indexes.push(input[rand]); // Modified to get value instead of key
	          }
	        }
	      } else {
	          indexes = null;
	        }

	      return ticks == 1 ? indexes.join() : indexes;
	    }
	  }]);

	  return Letters;
	}();

	exports.default = Letters;
	module.exports = exports['default'];

/***/ }
/******/ ]);