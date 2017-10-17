var html = require('choo/html')

var channel = require('../components/channel')
var chat = require('../components/chat')

module.exports = view

function view (state, emit) {
  return html`
    <div>
      ${channel()}
      ${state.chat.active ? chat(state, emit) : ''}
    </div>
  `
}
