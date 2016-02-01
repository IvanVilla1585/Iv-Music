var Backbone = require('backbone')
var $ = require('jquery')

function stateCyrcleInit (pos) {
  var arra = Backbone.app.listSongs
  console.log(arra[pos])
  var state = $('.state')
  var circle = $('.circle')
  var dura = Backbone.app.songs.models[pos].get('length')
  var res = dura.split(':')
  var seg = (parseInt(res[0]) * 60) + parseInt(res[1])
  state.css('animation', seg + 's state infinite linear')
  circle.css('animation', '1s circle infinite')
}

function stateCyrclePaused () {
  var state = $('.state')
  var circle = $('.circle')
  state.css('animation-play-state', 'paused')
  circle.css('animation-play-state', 'paused')
}

function stateCyrcleRunning () {
  var state = $('.state')
  var circle = $('.circle')
  state.css('animation-play-state', 'running')
  circle.css('animation-play-state', 'running')
}

module.exports = {
  stateCyrcleInit: stateCyrcleInit,
  stateCyrclePaused: stateCyrclePaused,
  stateCyrcleRunning: stateCyrcleRunning
}
