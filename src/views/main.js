var html = require('choo/html')

var channel = require('../components/channel')
var chat = require('../components/chat')

module.exports = main

function main(state, emit) {
  return html`
    <body class="ff-sans">
      ${channel()}
      ${chat(state, emit)}
    </body>
  `
}
