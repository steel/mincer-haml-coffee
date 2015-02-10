# Mincer Haml-Coffee

[haml-coffee syntax](https://github.com/sstephenson/haml-coffee) transformation engine for [Mincer](https://github.com/nodeca/mincer).

## Installation

Install from npm registry:

```
$ npm install mincer-haml-coffee
```

or add `mincer-haml-coffee` to your `package.json`:

```json
"dependencies": {
  "mincer-haml-coffee": "0.0.1"
}
```


## Usage

```js
var Mincer = require('mincer');

require('mincer-haml-coffee')(Mincer);
```

Now files with `.hamlc` extension will be compiled to using `haml-coffee` to JavaScript.