var Backbone = require('backbone')
var	Song = require('../models/song')

module.exports = Backbone.Collection.extend({
  model: Song
})
