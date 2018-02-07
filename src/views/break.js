var html = require('choo/html')
var css = require('sheetify')

var style = css`
  :host {
    max-width: 24rem;
  }
`

module.exports = view

function view (state, emit) {
  return html`
    <div class="vhmn100 c12 x xjc xac lh1-5">
      <div class="${style}">
        ${getNote()}
      </div>
    </div>
  `

  function getNote () {
    return state.chat.messages.length > 0
      ? state.chat.messages[state.chat.messages.length - 1].message
      : 'loading'
  }
}