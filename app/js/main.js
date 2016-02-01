var Backbone = require('backbone')
var Router = require('./routers/router')
var $ = require('jquery')
Backbone.$ = $

$(function () {
  Backbone.app = new Router()
})
