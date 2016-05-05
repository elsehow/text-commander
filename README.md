# text-commander

tiny library for text-based interactions (e.g. MUDs, text-based adventure games, etc)

## install

```javascript
npm install text-commander
```

## use

```javascript
var cmdr = require('text-commander')([
  {
    '/look at {thing}': (obj) => {
      return `looking at ${obj.thing}!`
    }
  },
  {
    '/use {thing} on {otherThing}': (obj) => {
      return `using ${obj.thing} on ${obj.otherThing}!`
    }
  }
])

console.log(cmdr('/look at sun'))
// looking at sun!
console.log(cmdr('/use glove on lever'))
// using glove on lever!
```

(see [templateer](https://www.npmjs.com/package/templateer), on which this is built)

**protip** you can use [es6 destructuring syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to make your functions a little nicer. e.g., 

```javascript
var cmdr = require('text-commander')([
  {'link {thing} with {otherThing}': ({thing, otherThing}) => {
    // do stuff...
    // return stuff...
  }}
])
```
## api

### var cmdr = require('text-commander')([ {'some {template}': ({template}) => { }}, ... ])

text-commander takes a list of objects `{ templateString: function }`.  when `templateString` is matched, `function` will execute on the the template match. (see [templateer](https://www.npmjs.com/package/templateer), on which this is built)

### cmdr('some command')

will try to match each template string, **in order**, executing the appropriate function if a match is found. 

cmdr will pass the match object as arguments to the appropriate function, and return whatever that function returns.

**if no match is found, cmdr will return `undefined`**. 

## license

BSD
