var Backbone = require('backbone')
var	Handlebars = require('handlebars')
var	$	= require('jquery')
var	app	= Backbone.app
var	StateCyrcle = require('../lib/StateCyrcle')

module.exports = Backbone.View.extend({

	tagName: 'li',

	className: 'item border_buttom',

	events: {
		'click .song': 'action'
	},

	template: Handlebars.compile($('#song-template').html()),

	initialize: function () {
		this.listenTo(this.model, 'change', this.render, this)
	},

	render: function () {
		var song = this.model.toJSON()
		var html = this.template(song)
		this.$el.html(html)
		return this
	},

	action: function () {
		Backbone.app.actionPlay.model.set(this.model.toJSON())
		var array = Backbone.app.listSongs
		Backbone.app.isActive = true
		Backbone.app.totalSongs = Backbone.app.songs.models.length
		for (var i = 0; i < Backbone.app.totalSongs;  i++) {

			if (Backbone.app.songs.models[i].get('name') == this.model.get('name')) {
				Backbone.app.actual = i
				i = array.length
			}
		}
		StateCyrcle.stateCyrcleInit(Backbone.app.actual)
		$('#audio').attr('autoplay', 'autoplay')
	}
})
