var markdown = require('markdown-it')
var html = require('choo/html')
var raw = require('bel/raw')

var md = new markdown()

module.exports = chat

function chat (state, emit) {
  return html`
    <div class="x xx h100 xdc psr">
      <div class="xx os" style="padding-bottom: 3rem" data-messages>
        ${state.chat.messages.map(elMessage)}
      </div>
      <form class="psa b0 l0 r0 p0-5 pt0 c12" onsubmit=${handleSubmit}>
        ${elInput()}
      </form>
    </div>
  `

  function elInput () {
    return html`
      <input
        type="text"
        value="${state.chat.user.message}"
        oninput=${handleInput}
        placeholder="message…"
        class="w100 fs1 ff-sans m0 px1 py0-5 bgc-black fc-white br1-5 lh1-5"
      />
    `
  }

  function elMessage (data) {
    return html`
      <div class="px1 py0-5 m0-5 bgc-grey_15 br1-5 lh1-5">
        ${raw(md.render(data.message))}
      </div>
    `
  }

  function handleInput (event) {
    emit(state.events.CHAT_USER, {
      message: event.target.value
    })
  }

  function handleSubmit (event) {
    emit(state.events.CHAT_SEND, state.chat.user)
    event.preventDefault()
  }
}