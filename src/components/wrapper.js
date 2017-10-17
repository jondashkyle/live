var html = require('choo/html')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return html`
      <body class="ff-sans">
        ${view(state, emit)}
      </body>
    `
  }
}