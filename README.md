# commandeer

tiny library for text-based interactions (e.g. MUDs, text-based adventure games, ..)

## install

```javascript
npm install commandeer
```

## use

```javascript
var cmdr = commandeer([
  {
    '/look at {thing}': (obj) => {
      console.log(`looking at ${obj.thing}!`)
    }
  },
  {
    '/use {thing} on {otherThing}': (obj) => {
      console.log(`using ${obj.thing} on ${obj.otherThing}!`)
    }
  }
])

cmdr('/look at sun')
// looking at sun!
cmdr('/use glove on lever')
// using glove on lever!
```

(see [templateer](https://www.npmjs.com/package/templateer), on which this is built)

**protip** you can use [es6 destructuring syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to make your functions a little nicer. e.g., 

```javascript
var cmdr = commandeer([
  {'link {thing} with {otherThing}': ({thing, otherThing}) => {
    // do stuff...
  }}
])
```
## api

### var cmdr = commander([ {'some {template}': ({template}) => { }}, ... ])

commandeer takes a list of objects `{ templateString: function }`.  when `templateString` is matched, `function` will execute on the the template match. (see [templateer](https://www.npmjs.com/package/templateer), on which this is built)

### cmdr('some command')

will try to match each template string, **in order**, executing the appropriate function if a match is found.

## license

BSD
