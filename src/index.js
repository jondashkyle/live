var choo = require('choo')
var html = require('choo/html')
var css = require('sheetify')

var app = choo()
css('./design.js')

app.use(require('./plugins/chat'))
app.route('*', require('./views/main'))

if (module.parent) module.exports = app
else app.mount('body')