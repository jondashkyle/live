var externalLinks = require('markdown-it-external-links')
var markdown = require('markdown-it')
var html = require('choo/html')
var raw = require('bel/raw')

var Walk = require('../components/walk')
var chat = require('../components/chat')
var walk = new Walk()

module.exports = view

function view (state, emit) {
  return html`
    <div class="x vh100">
      <div class="c12 md-c8 psr">
        ${walk.render()}
      </div>
      <div class="c4 psf t0 r0 b0 h100 bgc-black fc-white md-db dn z3">
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