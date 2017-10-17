var html = require('choo/html')

module.exports = channel

function channel (props) {
  return html`
    <div class="psr w100" style="padding-bottom: 62.25%">
      <iframe
        src="https://player.twitch.tv/?channel=jondashkyle"
        class="psa t0 l0 h100 w100"
        frameborder="0"
        allowfullscreen="true"
        scrolling="no"
        height="378"
        width="620"
      ></iframe>
    </div>
  `
}