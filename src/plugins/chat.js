var WebSocket = require('../lib/ws')
var xtend = require('xtend')

module.exports = chat

function chat (state, emitter) {
  var ws
  state.chat = {
    address: 'ws://plucky-basin.glitch.me',
    active: false,
    messages: [ ],
    scratch: '',
    editing: false,
    user: {
      name: 'nice',
      message: ''
    }
  }

  state.events.CHAT_READY = 'chat:ready'
  state.events.CHAT_SEND = 'chat:send'
  state.events.CHAT_MESSAGE = 'chat:message'
  state.events.CHAT_USER = 'chat:user'
  state.events.CHAT_SCRATCH = 'chat:scratch'

  emitter.on(state.events.DOMCONTENTLOADED, function () {
    ws = new WebSocket(state.chat.address)

    ws.addEventListener('open', function (event) {
      state.chat.active = true
      emitter.emit(state.events.CHAT_READY)
      emitter.emit(state.events.RENDER)
    })

    ws.addEventListener('message', function (event) {
      var data = JSON.parse(event.data)

      // scratch
      if (!state.chat.editing && data.scratch !== undefined) {
        state.chat.scratch = data.scratch
      }

      // messages
      if (data.messages) {
        state.chat.messages = state.chat.messages.concat(data.messages)
      }

      // message
      if (data.message) {
        state.chat.messages.push(data)
        if (data.message === state.chat.user.message) {
          emitter.emit(state.events.CHAT_USER, { message: '' })
        }
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

  emitter.on(state.events.CHAT_SCRATCH, function (data) {
    if (data && data.scratch) {
      state.chat.editing = true
      state.chat.scratch = data.scratch
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