var html = require('choo/html')
var raw = require('bel/raw')

var chat = require('../components/chat')

module.exports = scratch

function scratch (state, emit) {
  return html`
    <div class="x xdc vh100">
      <div class="x xx c12">
        ${editor()}
      </div>
      <div class="x xx c12">
        ${chat(state, emit)} 
      </div>
    </div>
  `

  function editor () {
    return html`
      <textarea
        class="bgc-black fc-white ff-sans lh1-5 p1 h100 w100"
        style="outline: 0"
        oninput=${handleInput}
      >${raw(state.chat.scratch.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"))}</textarea>
    `
  }

  function handleInput (event) {
    emit(state.events.CHAT_SCRATCH, {
      scratch: event.target.value
    })
  }
}