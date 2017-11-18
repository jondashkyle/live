var html = require('choo/html')

var intermission = require('./break')
var walk = require('./walk')

module.exports = main

function main(state, emit) {
 if (state.chat.live) {
    return walk(state, emit)
  } else {
    return intermission(state, emit)
  }
}
