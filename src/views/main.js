var html = require('choo/html')

var intermission = require('./break')
var walk = require('./walk')
var hang = require('./hang')

module.exports = main

function main(state, emit) {
  if (state.chat && state.chat.live) {
    return hang(state, emit)
  } else {
    return intermission(state, emit)
  }
}
