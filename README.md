## Letters.js

This is a library to animate words.
It's inspired by [Codedoodles](http://www.codedoodl.es).  

# Installation

You can pick the library from this repo (letters.min.js or letters.js) or install it with:

```
npm install letters
bower install letters
```

# Usage

```
new Letters(container, words [, options ]);
```

# Examples

#### Array of words
```
let letters = new Letters(document.body, ["Array", "Of", "Words"]);
```

#### Array of arrays

Use an array of words to change the word after the previous word's animation is done.
```
let words = [
  ["FirstWord", "SecondWord"],
  ["FirstWord", "SecondWord"]
];
let letters = new Letters(document.body, words);
```

#### Mix

You can mix single words with arrays of words. No matter the order.
```
let words = [
  "Single",
  ["FirstWord", "SecondWord"],
  ["FirstWord", "SecondWord"]
];
let letters = new Letters(document.body, words);
```

## Options

###### duration:
- Type: `int` (default is `2`)
- Usage: This is the period during which the letters will be animated
- Warning: this is the number of seconds

###### paused:
- Type: `int` (default is `10`)
- Usage: This is the time during which your words will be displayed in their original state
- Warning: this is the number of seconds

###### once:
- Type: `boolean` (default is `false`)
- Usage: If true, the letters animation will ocurred just once

###### mode:
- Type: `String` (default is `shuffle`)
- Usage:
  - `shuffle`: each letter will be replaced by another letter from the same word
  - `alphabet`: each letter will be replaced by a random letter
