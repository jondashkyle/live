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
        The next hang is on October 18th (Wednesday) at 11:00am PST.<br><br>

        I’ll be live-coding an ultralight p2p cms inside Beaker Browser, and answering questions related to the future of publishing on the p2p web.<br><br>

        See you then ✌️
      </div>
    </div>
  `
}