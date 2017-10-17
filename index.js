var choo = require('choo')
var html = require('choo/html')
var css = require('sheetify')
var wrapper = require('./src/components/wrapper')

var app = choo()
css('./src/design.js')

app.use(require('./src/plugins/app'))
app.use(require('./src/plugins/chat'))

app.route('*', wrapper(require('./src/views/main')))
app.route('/', wrapper(require('./src/views/main')))
app.route('/stream', wrapper(require('./src/views/hang')))

if (module.parent) module.exports = app
else app.mount('body')