var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var xhr = require('xhr')

var style = css`
  .line { height: 1px; background: #000; }
  .photo { width: 33.3% }
  .photo:hover { z-index: 2; width: 100%; left: 0!important; }
  .blink {
    animation: blink 500ms steps(1, end) infinite;
  }

  @keyframes blink {
    0% { opacity: 0; }
    50% { opacity: 1; }
  }

`

module.exports = class Walk extends Nanocomponent {
  constructor () {
    super()

    this.tick
    this.state = {
      api: 'https://api.are.na/v2/channels/walk-17-11-18',
      contents: [ ],
      timeline: {
        start: '2017-11-18T20:00:00.216Z',
        end: '2017-11-19T04:00:00.216Z',
        heightHour: 1000
      }
    }

    this.refresh = this.refresh.bind(this)
  }

  load () {
    this.refresh()
    this.tick = setInterval(this.refresh, 1000 * 60)
  }

  unload () {
    clearInterval(this.tick)
  }

  refresh () {
    var self = this
    window.scrollTo(0, window.scrollY + 16)
    xhr(this.state.api + '?' + new Date().getTime() / 1000, function (err, resp) {
      if (err) throw err
      var data = JSON.parse(resp.body, { }, 2)
      self.state.contents = data.contents.map(function (entry) {
        entry.left = Math.random() * 75
        return entry
      })
      self.rerender()
    })
  }

  scroll () {

  }

  createElement (props) {
    var self = this
    var timeNow = new Date().getTime() / 1000
    var timeStart = new Date(this.state.timeline.start).getTime() / 1000
    var timeEnd = new Date(this.state.timeline.end).getTime() / 1000
    var startHour = new Date(this.state.timeline.start).getHours()
    var hours = (timeEnd - timeStart) / (1000 * 60 * 60) * 1000
    var height = hours * this.state.timeline.heightHour
    var positionNow = ((timeNow - timeStart) / (timeEnd - timeStart) * hours) * self.state.timeline.heightHour

    return html`
      <div class="psr w100 z1" style="height: ${height}px">
        <div class="psf b0 l0 pen p1 ff-mono ttu blink">
          LIVE
        </div>
        <div class="c2 pen psr z2">
          ${Array(hours).fill(null).map(function (hour, i) {
            return html`
              <div
                class="ff-mono ttu psr p1"
                style="height: ${self.state.timeline.heightHour}px"
              >
                <div>${i + startHour}:00pst</div>
                <div class="psa t0 l0 c12 line"></div>
                <div class="psa l0 c6 line" style="top: 25%"></div>
                <div class="psa l0 c8 line" style="top: 50%"></div>
                <div class="psa l0 c6 line" style="top: 75%"></div>
              </div>
            `
          })}
        </div>
        <div class="psa line l0 r0 pen z2" style="background: #f33; top: ${positionNow}px"></div>
        ${this.state.contents.map(function (entry) {
          if (!entry.image) return
          var timeEntry = new Date(entry.created_at).getTime() / 1000
          var position = ((timeEntry - timeStart) / (timeEnd - timeStart) * hours) * self.state.timeline.heightHour
          return html`
            <div
              class="psa photo p2"
              style="top: ${position}px; left: ${entry.left}%"
            >
              <a href="${entry.image.original.url}" target="_blank"><img src="${entry.image.large.url}" class="c12"></a>
              <div class="pt1">${entry.title}</div>
            </div>
          `
        })}
      </div>
    `
  }

  update () {
    return false
  }
}
