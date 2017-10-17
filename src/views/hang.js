var markdown = require('markdown-it')
var html = require('choo/html')
var raw = require('bel/raw')

var channel = require('../components/channel')
var chat = require('../components/chat')

var md = new markdown()

module.exports = view

function view (state, emit) {
  return html`
    <div class="x vh100">
      <div class="x xdc c8 bgc-black">
        ${channel()}
        ${scratch({ text: '# testing \n yo [what](http://hi.com) is up \n - one \n - two'})}
      </div>
      <div class="c4">
        ${state.chat.active ? chat(state, emit) : ''}
      </div>
    </div>
  `
}

function scratch (props) {
  props = props || { }
  return html`
    <div class="p1 os xx bgc-black fc-white md lh1-5">
      ${raw(md.render(props.text))}
    </div>
  `
}