var choo = require('choo')
var html = require('choo/html')
var css = require('sheetify')
var wrapper = require('./components/wrapper')

var app = choo()

css('ress/ress.css')
css('./design.js')

if (process.env.NODE_ENV === 'production') {
  // app.use(require('choo-service-worker')())
} else {
  // fuck w/ this and i fuck w/ u
  // app.route('/scratch', wrapper(require('./views/scratch-editor')))
  // app.use(require('choo-log')())
}

// app.use(require('./stores/app'))
// app.use(require('./stores/chat'))

// app.route('*', wrapper(require('./views/main')))
app.route('/', wrapper(require('./views/main')))
// app.route('/stream', wrapper(require('./views/hang')))
// app.route('/chat', wrapper(require('./views/chat')))


if (module.parent) module.exports = app
else app.mount('body')