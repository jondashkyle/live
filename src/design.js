var gr8 = require('gr8')
var fs = require('fs')
var ress = fs.readFileSync('node_modules/ress/ress.css', 'utf8')

var utils = [ ]
var custom = `
  html { font-size: 100% }
`

var typography = {
  sans: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace'
}

utils.push({
  prop: 'font-family',
  join: '-',
  vals: typography
})


var gr8css = gr8({
  utils: utils
})

module.exports = ress + gr8css + custom