var html = require('choo/html')
var css = require('sheetify')
var raw = require('bel/raw')

var chat = require('../components/chat')

var style = css`
  :host {
    cursor: pointer;
    height: 2rem;
    width: 2rem;
    border-radius: 1rem;
  }
`

module.exports = scratch

function scratch (state, emit) {
  return html`
    <div class="x xdc vh100">
      <div class="psf t0 r0 b0 p1 pen">
        <div
          class="pea ${style} ${state.chat.live ? 'bgc-green' : 'bgc-red'}"
          onclick=${handleLiveClick}
        ></div>
      </div>
      <div class="x xx c12" style="min-height: 50vh">
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

  function handleLiveClick (event) {
    emit(state.events.CHAT_LIVE, {
      live: !state.chat.live
    })
  }
}