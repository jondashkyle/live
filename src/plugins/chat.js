var WebSocket = require('../lib/ws')
var xtend = require('xtend')

module.exports = chat

function chat (state, emitter) {
  var ws
  state.chat = {
    address: 'ws://plucky-basin.glitch.me',
    active: false,
    messages: [ ],
    user: {
      name: 'nice',
      message: ''
    }
  }

  state.events.CHAT_READY = 'chat:ready'
  state.events.CHAT_SEND = 'chat:send'
  state.events.CHAT_MESSAGE = 'chat:message'
  state.events.CHAT_USER = 'chat:user'

  emitter.on(state.events.DOMCONTENTLOADED, function () {
    ws = new WebSocket(state.chat.address)

    ws.addEventListener('open', function (event) {
      state.chat.active = true
      emitter.emit(state.events.CHAT_READY)
      emitter.emit(state.events.RENDER)
    })

    ws.addEventListener('message', function (event) {
      var data = JSON.parse(event.data)
      if (data.messages) {
        state.chat.messages = state.chat.messages.concat(data.messages.map(message => JSON.parse(message)))
        // console.log(state.chat.messages)
      } else {
        state.chat.messages.push(data)
      }
      emitter.emit(state.events.CHAT_MESSAGE)
      emitter.emit(state.events.RENDER)
    })

  })

  emitter.on(state.events.CHAT_SEND, function (data) {
    if (data && data.name && data.message) {
      data.timestamp = new Date()
      ws.send(JSON.stringify(data))
    }
  })

  emitter.on(state.events.CHAT_USER, function (data) {
    if (!data) return
    state.chat.user = xtend(state.chat.user, data)
    emitter.emit(state.events.RENDER)
  })

  emitter.on(state.events.CHAT_MESSAGE, function (data) {

  })
}