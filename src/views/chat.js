var html = require('choo/html')
var chat = require('../components/chat')

module.exports = view

function view (state, emit) {
  return html`
    <div class="x vh100 bgc-white fc-black">
      <div class="c12">
        ${state.chat.active ? chat(state, emit) : ''}
      </div>
    </div>
  `
}