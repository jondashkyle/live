var externalLinks = require('markdown-it-external-links')
var markdown = require('markdown-it')
var html = require('choo/html')
var raw = require('bel/raw')

var channel = require('../components/channel')
var chat = require('../components/chat')

var md = new markdown()

md.use(externalLinks, {
  externalTarget: ['_blank']
})

module.exports = view

function view (state, emit) {
  return html`
    <div class="x vh100">
      <div class="x xdc c12 bgc-black fc-white" sm="c8">
        ${channel()}
        ${state.chat.active
          ? scratch({ text: state.chat.scratch })
          : loading()
        }
      </div>
      <div class="dn c4 h100" sm="db">
        ${state.chat.active
          ? chat(state, emit)
          : loading()
        }
      </div>
    </div>
  `
}

function loading () {
  return html`
    <div class="x xx xjc xac h100">
      <div>
        LOADING
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