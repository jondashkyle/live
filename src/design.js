var gr8 = require('gr8')
var fs = require('fs')
var ress = fs.readFileSync('node_modules/ress/ress.css', 'utf8')

var utils = [ ]


var typography = {
  sans: '"Lars Mono", Menlo, Consolas, "Liberation Mono", Menlo, Courier, monospace'
}

var colors = {
  white: '#fff',
  grey_15: '#eee',
  grey_20: '#ccc',
  red: '#f33',
  green: '#0FCE83',
  black: '#000'
}

var custom = `
  html { font-size: 100% }

  input { outline: 0 }

  .md h1,
  .md h2,
  .md h3 {
    font-size: 1rem;
    font-weight: normal;
  }

  .md > *+* {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .md ul { margin-left: 1rem }
  .md ul > li+li { margin-top: 1rem; margin-bottom: 1rem; }

  .md h1:before { content: '# ' }
  .md h2:before { content: '## ' }
  .md h3:before { content: '### ' }

  code,
  pre {
    background: #333;
    border-radius: 3px;
    font-family: ${typography.sans};
    line-height: 1.5;
  }

  .md .external-link:after {
    content: '→';
    display: inline-block;
    transform: rotate(-45deg);
    text-decoration: none;
  }

  code {
    padding: 0.25rem;
  }

  pre {
    padding: 1rem;
  }

  @font-face {
    font-family: 'Lars Mono';
    src: url('/assets/Lars-Mono.eot');
    src: url('/assets/Lars-Mono.eot?#iefix') format('embedded-opentype'),
         url('/assets/Lars-Mono.woff2') format('woff2'),
         url('/assets/Lars-Mono.woff') format('woff');
  }
`

var borderWeights = [1]
var borders = {}
borderWeights.forEach(border => {
  Object.keys(colors).forEach(key => {
    borders[border + '-' + key] = `${border}px solid ${colors[key]}`
  })
})

utils.push({
  prop: [
    'border',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left'
  ],
  vals: borders
})

utils.push({
  prop: { bgc: 'background-color' },
  join: '-',
  vals: colors
})

utils.push({
  prop: { fc: 'color' },
  join: '-',
  vals: colors
})

utils.push({
  prop: { fc: 'color' },
  tail: ' a',
  join: '-',
  vals: colors
})

utils.push({
  prop: 'border-radius',
  unit: 'rem',
  vals: [0, 1, 1.5]
})

utils.push({
  prop: 'font-family',
  join: '-',
  vals: typography
})

var gr8css = gr8({
  utils: utils,
  spacing: [0, 0.5, 1, 1.5, 2]
})

module.exports = ress + gr8css + custom