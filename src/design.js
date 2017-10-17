var gr8 = require('gr8')
var fs = require('fs')
var ress = fs.readFileSync('node_modules/ress/ress.css', 'utf8')

var custom = `
  html { font-size: 100% }
`

var gr8css = gr8({

})

module.exports = ress + gr8css + custom