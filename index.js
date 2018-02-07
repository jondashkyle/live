var choo = require('choo')
var html = require('choo/html')
var css = require('sheetify')
var wrapper = require('./src/components/wrapper')

var app = choo()
css('./src/design.js')

if (process.env.NODE_ENV === 'production') {
  // app.use(require('choo-service-worker')())
} else {
  // fuck w/ this and i fuck w/ u
  app.route('/scratch', wrapper(require('./src/views/scratch-editor')))
  app.use(require('choo-log')())
}

app.use(require('./src/stores/app'))
app.use(require('./src/stores/chat'))

app.route('*', wrapper(require('./src/views/main')))
app.route('/', wrapper(require('./src/views/main')))
app.route('/stream', wrapper(require('./src/views/hang')))
app.route('/chat', wrapper(require('./src/views/chat')))


if (module.parent) module.exports = app
else app.mount('body')