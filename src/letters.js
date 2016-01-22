export default class Letters {

  constructor( container, words, options = {} ) {

    let defaultOptions = {
      duration: options.duration || 2,
      paused: options.paused || 10,
      mode: options.mode || "alphabet",
      once: options.once || false,
      alphabet: options.alphabet || "abcdefghijklmnopqrstuvwxyz0123456789&é~\"#'{}[]()-|è``_\\ç^à@=+°$£€¤µ*%ù§!/:.;?,><".split('')
    };

    this.options = defaultOptions;
    this.container  = ( typeof container == "string" ) ? document.getElementById(container) : container;
    this.words      = words;
    this.wordsCount = this.words.length;
    this.wordsDom   = {};

    this.start      = null;

    for (let i = 0; i < this.wordsCount; i++) {
      let words = this.words[ i ];
      let single = true;
      if ( typeof this.words[ i ] == "object" ) {
        single = false;
      }

      if (single) {
        let name = words.toLowerCase();
        let wordContainer = document.createElement("span");
        wordContainer.className = name + "-container word-container";
        this.wordsDom[ name ] = [];
        for (let j = 0; j < name.length; j++) {
          let span = document.createElement("span");
          span.className = name + "-" + j;
          wordContainer.appendChild(span);
          this.wordsDom[ name ][ j ] = {
            element: span,
            animating: false,
            original: words.substr(j, 1),
            single: true
          };
          span.addEventListener('mouseover', this.mouseOnLetter.bind( this ));
          span.addEventListener('mouseout', this.mouseOutLetter.bind( this ));
        }

        this.container.appendChild(wordContainer);
      } else {
        let max = 0;
        let name = "";
        for (let j = 0; j < words.length; j++) {
          name = words[ j ].length > max ? words[ j ].toLowerCase() : name;
          max = words[ j ].length > max ? words[ j ].length : max;
        }

        let wordContainer = document.createElement("span");
        wordContainer.className = name + "-container word-container";
        this.wordsDom[ name ] = [];

        for (let j = 0; j < name.length; j++) {
          let span = document.createElement("span");
          span.className = name + "-" + j;
          wordContainer.appendChild(span);
          this.wordsDom[ name ][ j ] = {
            element: span,
            animating: false,
            original: j < words[ 0 ].length ? words[ 0 ].substr(j, 1) : "",
            currentWord: words[ 0 ],
            currentIndex: 0,
            maxIndex: words.length - 1,
            words: words,
            all: words,
            single: false
          };
          span.addEventListener('mouseover', this.mouseOnLetter.bind( this ));
          span.addEventListener('mouseout', this.mouseOutLetter.bind( this ));
        }

        this.container.appendChild(wordContainer);

      }
    }
  }

  init() {
    this.start = null;
    this.animate();
    this.animateLetter();
  }

  animate( ts ) {
    let stopped = false;

    if ( ts ) {
      if (this.start === null) this.start = ts;
      let elapsed = parseInt( ( ts - this.start ) / 1000 );
      stopped = elapsed != 0 && ( elapsed % this.options.duration ) == 0;
      for (let i = 0; i < this.wordsCount; i++) {
        let word = this.words[ i ];
        let single = true;
        if ( typeof this.words[ i ] == "object" ) {
          single = false;
        }
        if (single) {

          if ( !stopped ) {
            let alphabet = this.options.mode == "shuffle" ? this.shuffle( word.split("") ) : this.getSomeLetters( word.length );
            this.replace( word.toLowerCase(), alphabet );
          } else {
            this.replace( word.toLowerCase(), word.split("") );
          }

        } else {

          let max = 0;
          let name = "";
          for (let j = 0; j < word.length; j++) {
            name = word[ j ].length > max ? word[ j ].toLowerCase() : name;
            max = word[ j ].length > max ? word[ j ].length : max;
          }
          if ( !stopped ) {
            let alphabet = this.options.mode == "shuffle" ? this.shuffle( word.split("") ) : this.getSomeLetters( name.length );
            this.replace( name.toLowerCase(), alphabet );
          } else {
            let currentWord = this.wordsDom[ name ][ 0 ].currentWord;
            this.replace( name.toLowerCase(), currentWord.split("") );
          }

        }
      }
    }

    if (stopped) {
      if ( !this.options.once ) {
        setTimeout(() => {
          this.start = null;
          for (let i = 0; i < this.wordsCount; i++) {
            let word = this.words[ i ];
            let single = true;
            if ( typeof this.words[ i ] == "object" ) {
              single = false;
            }
            if (!single) {
              let max = 0;
              let name = "";
              for (let j = 0; j < word.length; j++) {
                name = word[ j ].length > max ? word[ j ].toLowerCase() : name;
                max = word[ j ].length > max ? word[ j ].length : max;
              }
              let currentIndex = this.wordsDom[ name ][ 0 ].currentIndex;
              let maxIndex = this.wordsDom[ name ][ 0 ].maxIndex;
              let nextWord = this.wordsDom[ name ][ 0 ].all[ currentIndex ];
              let nextIndex = currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
              for (let j = 0; j < this.wordsDom[ name ].length; j++) {
                this.wordsDom[ name ][ j ].currentWord = nextWord;
                this.wordsDom[ name ][ j ].currentIndex = nextIndex;
                this.wordsDom[ name ][ j ].original = j < nextWord.length ? nextWord.substr(j, 1) : "";
              }
            }
          }
          this.animate();
        }, this.options.paused * 1000);
      }
    } else {
      window.requestAnimationFrame( this.animate.bind(this) );
    }


  }

  replace(word, clone) {
    let elements = this.wordsDom[ word ];

    for (let i = 0; i < elements.length; i++) {
      if ( elements[ i ].animating )
        elements[ i ].animating = false;
      if (clone[ i ]) {
        elements[ i ].element.classList.remove('letter-hidden');
        elements[ i ].element.innerHTML = clone[ i ];
      } else {
        elements[ i ].element.classList.add('letter-hidden')
      }
    }
  }

  animateLetter() {

    // if (this.start == null) {
      Object.keys(this.wordsDom).forEach((item, index) => {
        let letter = this.getSomeLetters( 1 );
        for (let elem of this.wordsDom[ item ]) {
          if (elem.animating === true) {
            elem.element.innerHTML = letter;
          }
        }
      });
    // }

    window.requestAnimationFrame( this.animateLetter.bind(this) );
  }

  mouseOnLetter( e ) {
    e.target.classList.add('animating');
    let name = e.target.className.replace(/(-([0-9])*|animating|letter-hidden)/g, "").trim();
    for (let elem of this.wordsDom[ name ]) {
       if (elem.element.className == e.target.className) {
         elem.animating = true;
       }
    }
  }

  mouseOutLetter( e ) {
    e.target.classList.remove('animating');
    let name = e.target.className.replace(/(-([0-9])*|animating|letter-hidden)/g, "").trim();
    for (let elem of this.wordsDom[ name ]) {
       if (elem.element.className == e.target.className) {
         elem.animating = false;
         elem.element.innerHTML = elem.original;
       }
    }
  }

  getSomeLetters( length ) {
    return this.array_rand( this.options.alphabet, length );
  }

  shuffle(o) {
    for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  array_rand(input, num_req) {
    //  discuss at: http://phpjs.org/functions/array_rand/
    // original by: Waldo Malqui Silva
    //   example 1: array_rand( ['Kevin'], 1 );
    //   returns 1: 0
    let indexes = [];
    let ticks = num_req || 1;
    let checkDuplicate = function(input, value) {
      let exist = false,
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
        let rand = Math.floor((Math.random() * input.length));
        if (indexes.length === ticks) {
          break;
        }
        if (!checkDuplicate(indexes, rand)) {
          indexes.push(input[ rand ]); // Modified to get value instead of key
        }
      }
    } else {
      indexes = null;
    }

    return ((ticks == 1) ? indexes.join() : indexes);
  }

}
