'use strict';
var templateer = require('templateer')

var firstKey = (obj) => Object.keys(obj)[0]
var firstVal = (obj) => obj[firstKey(obj)]

var seeFormatError = new Error('Commandeer: argument to commandeer should be a list [ { string: fn }]. See README.')

module.exports = (templates) => {

  // verify that template is an ok format
  if (!templates.length)
    throw seeFormatError

  // turn each string in `templates` into a templateer string
  let matchers = templates.map(t => {
    let templateString = firstKey(t)
    if (!templateString)
      throw seeFormatError
    let f = firstVal(t)
    if (typeof f !== 'function' || !f)
      throw seeFormatError
    let mtchr = templateer(templateString)
    return {
      matcher: mtchr,
      fn: f,
    }
  })

  return (cmd) => {
    for (let matcher of matchers) {
      let m = matcher.matcher(cmd)
      if (m) {
        return matcher.fn(m)
      }
    }
    return
  }
}
