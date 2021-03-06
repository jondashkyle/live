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
      <div class="x xdc c8 bgc-black fc-white">
        ${channel()}
        ${state.chat.active
          ? scratch({ text: state.chat.scratch })
          : loading()
        }
      </div>
      <div class="c4 h100">
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
    <div class="p1 os xx bgc-black fc-white md lh1-5 scratch" data-scratch>
      ${raw(md.render(props.text))}
    </div>
  `
}