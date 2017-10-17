var html = require('choo/html')

var intermission = require('./break')
var channel = require('../components/channel')
var chat = require('../components/chat')

module.exports = main

function main(state, emit) {
  return html`
    <body class="ff-sans">
      ${content()}
    </body>
  `

  function content () {
    if (state.app.live) {
      return [
        channel(),
        state.chat.active ? chat(state, emit) : ''
      ]
    } else {
      return intermission(state, emit)
    }
  }
}
