var Backbone = require('backbone')
var	Album = require('../models/album')

module.exports = Backbone.Collection.extend({
  model: Album
})
