var html = require('choo/html')

module.exports = channel

function channel (props) {
  return html`
    <iframe
      src="https://player.twitch.tv/?channel=jondashkyle"
      frameborder="0"
      allowfullscreen="true"
      scrolling="no"
      height="378"
      width="620"
    ></iframe>
  `
}