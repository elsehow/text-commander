var test = require('tape')
var commandeer = require('..')

test('import comandeer function', t=> {
  t.deepEqual(typeof commandeer, 'function')
  t.end()
})

test('can pass in a list of objects {template: fn}', t=>{
  var cmdr = commandeer([
    {'fall through the {thing}': ({thing}) => {
      t.deepEqual(thing, 'book')
      t.end()
    }}
  ])
  cmdr('fall through the book')
})

test('will respect iteration order, matching one command at a time', t=>{
  var cmdr = commandeer([
    {'link {thing} with {otherThing}': ({thing, otherThing}) => {
      t.deepEqual(thing, 'one')
      t.deepEqual(otherThing, 'the other')
      t.end()
    }},
    {'link {thing} with {otherThing}': ({thing, otherThing}) => {
      t.notOk(thing)
      t.end()
    }}
  ])
  // this command will match both of the functions
  // but, the way they are ordered, we should only see one get executed
  cmdr('link one with the other')
})


// nice to have

test('check that input is a list', t => {
  t.throws(() => {
    commandeer({
      '{thing}': ({thing}) => console.log('woo')
    })
  })
  t.end()
})

test('check each item in list for schema', t => {
  t.throws( () => {
    commandeer([{
      'some {thing}': 'not a fn'
    }])
  })
  t.end()
})
