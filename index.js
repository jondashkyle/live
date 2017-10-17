var choo = require('choo')
var html = require('choo/html')
var css = require('sheetify')

var app = choo()
css('./src/design.js')

app.use(require('./src/plugins/chat'))
app.route('*', require('./src/views/main'))

if (module.parent) module.exports = app
else app.mount('body')