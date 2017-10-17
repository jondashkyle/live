var html = require('choo/html')

module.exports = chat

function chat (state, emit) {
  return html`
    <div>
      <form>
        <input
          type="text"
          value="${state.chat.user.message}"
          oninput=${handleInput}
          style="border: 1px solid #ccc"
        />
        <button onclick=${handleClick}>send</button>
      </form>
      <div>
        <div>${state.chat.messages.map(function (message) {
          return html`
            <div>${message.message}</div>
          `
        })}</div>
      </div>
    </div>
  `

  function handleInput (event) {
    emit(state.events.CHAT_USER, {
      message: event.target.value
    })
  }

  function handleClick (event) {
    emit(state.events.CHAT_SEND, state.chat.user)
    emit(state.events.CHAT_USER, { message: '' })
    event.preventDefault()
  }
}