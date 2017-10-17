var html = require('choo/html')

var intermission = require('./break')
var hang = require('./hang')

module.exports = main

function main(state, emit) {
  return content()

  function content () {
    if (state.app.live) {
      return hang(state, emit)
    } else {
      return intermission(state, emit)
    }
  }
}
