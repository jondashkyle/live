var choo = require('choo')
var html = require('choo/html')
var css = require('sheetify')
var wrapper = require('./components/wrapper')

var app = choo()

css('ress/ress.css')
css('./design.js')

app.use(require('./stores/app'))
app.use(require('./stores/chat'))

app.route('*', wrapper(require('./views/main')))
app.route('/', wrapper(require('./views/main')))
app.route('/stream', wrapper(require('./views/hang')))
app.route('/chat', wrapper(require('./views/chat')))


if (module.parent) module.exports = app
else app.mount('body')