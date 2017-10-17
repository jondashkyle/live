var html = require('choo/html')
var raw = require('bel/raw')

module.exports = scratch

function scratch (state, emit) {
  return html`
    <div>
      <textarea
        class="ff-sans lh1-5 p1 vh100 vw100"
        style="outline: 0"
        oninput=${handleInput}
      >${raw(state.chat.scratch)}</textarea>
    </div>
  `

  function handleInput (event) {
    emit(state.events.CHAT_SCRATCH, {
      scratch: event.target.value
    })
  }
}