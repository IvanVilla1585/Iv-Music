var Backbone = require('backbone') 
var	Handlebars = require('handlebars')
var	$	= require('jquery')
var	_	= require('underscore')
var	app = Backbone.app
var	StateCyrcle = require('../lib/StateCyrcle')

module.exports = Backbone.View.extend({
	el: $('.music > .controls'),

	events: {
		'click .icon-play': 'play',
		'click .icon-prev': 'prev',
		'click .icon-next': 'next',
		'click #mas': 'mas',
		'click #menos': 'menos',
		'click .icon-random': 'random'
	},

	template: Handlebars.compile($('#action-play-template').html()),

	initialize: function () {
		this.listenTo(this.model, 'change', this.render, this)
	},

	render: function () {
		var action = this.model.toJSON()
		this.$el.html(this.template(action))
	},

	play: function (even) {
		even.preventDefault()
		var actual = Backbone.app.actual
		if ( Backbone.app.isActive == true ) {
			$('#audio').trigger('pause')
			StateCyrcle.stateCyrclePaused()
			Backbone.app.isActive = false
		}else{
			if ( actual == -1) {
				Backbone.app.actual = 0
				StateCyrcle.stateCyrcleInit(Backbone.app.actual)
				$('#audio').trigger('play')
			}else{
				$('#audio').trigger('play')
				StateCyrcle.stateCyrcleRunning()
			}
			Backbone.app.isActive = true
		}

	},

	prev: function (even) {
		even.preventDefault()
		var cancion = Backbone.app.actual
		if ( cancion == 0 && Backbone.app.isActive == true ) {
			Backbone.app.actionPlay.model.set(Backbone.app.songs.models[array.length - 1].toJSON())
			cancion = Backbone.app.totalSongs
		}else{
			Backbone.app.actionPlay.model.set(Backbone.app.songs.models[cancion - 1].toJSON())
		}
		Backbone.app.actual = cancion - 1
		StateCyrcle.stateCyrcleInit(Backbone.app.actual)
		$('#audio').attr('autoplay', 'autoplay')
	},

	next: function (even) {
		even.preventDefault()
		var cancion = Backbone.app.actual
		if ( cancion == (Backbone.app.totalSongs - 1) && Backbone.app.isActive == true ) {
			Backbone.app.actionPlay.model.set(Backbone.app.songs.models[0].toJSON())
			cancion = 0
		}else{
			Backbone.app.actionPlay.model.set(Backbone.app.songs.models[cancion + 1].toJSON())
		}
		Backbone.app.actual = cancion + 1
		StateCyrcle.stateCyrcleInit(Backbone.app.actual)
		$('#audio').attr('autoplay', 'autoplay')
	},

	random: function (even) {
		even.preventDefault()
		var random = (Backbone.app.songs.models.length - 1)
		var cancion = Math.round((Math.random() *  random))
		Backbone.app.actionPlay.model.set( Backbone.app.songs.models[cancion].toJSON() )
		Backbone.app.actual = cancion
		StateCyrcle.stateCyrcleInit(Backbone.app.actual)
		$('#audio').attr('autoplay', 'autoplay')
	},

	mas: function (even) {
		even.preventDefault()
		alert('mas')
		var volume = $('#audio').trigger('volume') + 0.2
    if(volume > 1) {
        volume = 1
    }
    $('#audio').trigger('volume',volume)
	},

	menos: function (even) {
		even.preventDefault()
		var volume = $('#audio').trigger('volume') - 0.2
    if(volume < 0) {
        volume = 0
    }
    $('#audio').trigger('volume',volume)
	}
})
