var html = require('choo/html')

var channel = require('../components/channel')
var chat = require('../components/chat')

module.exports = main

function main(state, emit) {
  return html`
    <body>
      ${chat(state, emit)}
      ${channel()}
    </body>
  `
}
