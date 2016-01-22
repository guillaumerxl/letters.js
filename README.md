## Letters.js

This is a library to animate words.
It's inspired by [Codedoodles](http://www.codedoodl.es).  

# Installation

You can pick the library from this repo (lib/letters.min.js or lib/letters.js) or install it with:

```
npm install letters.js
```

# Usage

```
new Letters( words [, container] [, options ]);
```

# Examples

#### Array of words
```
let letters = new Letters(["Array", "Of", "Words"]);
```

#### Array of arrays

Use an array of words to change the word after the previous word's animation is done.
```
let words = [
  ["FirstWord", "SecondWord"],
  ["FirstWord", "SecondWord"]
];
let letters = new Letters(words);
```

#### Mix

You can mix single words with arrays of words. No matter the order.
```
let words = [
  "Single",
  ["FirstWord", "SecondWord"],
  ["FirstWord", "SecondWord"]
];
let letters = new Letters(words);
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

###### alphabet:
- Type: `String` or `Array` (default is `abcdefghijklmnopqrstuvwxyz0123456789&é~\"#'{}[]()-|è``_\\ç^à@=+°$£€¤µ*%ù§!/:.;?,><`)
- Usage: Pass the alphabet you want 

###### once:
- Type: `boolean` (default is `false`)
- Usage: If true, the letters animation will ocurred just once

###### mode:
- Type: `String` (default is `shuffle`)
- Usage:
  - `shuffle`: each letter will be replaced by another letter from the same word
  - `alphabet`: each letter will be replaced by a random letter
