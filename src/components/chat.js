var markdown = require('markdown-it')
var html = require('choo/html')
var raw = require('bel/raw')

var md = new markdown()

module.exports = chat

function chat (state, emit) {
  return html`
    <div class="x xx h100 xdc">
      <div class="xx os">
        ${state.chat.messages.map(elMessage)}
      </div>
      <form>
        ${elInput()}
        <button class="dn" onclick=${handleClick}>send</button>
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
        class="w100 fs1 ff-sans m0 p1 bgc-grey_15"
      />
    `
  }

  function elMessage (data) {
    return html`
      <div class="p1 bb1-black lh1-5">
        ${raw(md.render(data.message))}
      </div>
    `
  }

  function handleInput (event) {
    emit(state.events.CHAT_USER, {
      message: event.target.value
    })
  }

  function handleClick (event) {
    emit(state.events.CHAT_SEND, state.chat.user)
    event.preventDefault()
  }
}