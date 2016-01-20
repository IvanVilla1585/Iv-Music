var Backbone    = require('backbone'),
		Handlebars  = require('handlebars'),
		$						= require('jquery'),
		app					= Backbone.app;

module.exports = Backbone.View.extend({

	tagName: 'li',

	className: 'item border_buttom',

	events: {
		'click .song': 'action'
	},

	template: Handlebars.compile($("#song-template").html()),

	initialize: function () {
		this.listenTo(this.model, "change", this.render, this);
	},

	render: function () {
		var song = this.model.toJSON();
		var html = this.template(song);
		this.$el.html(html);
		return this;
	},

	action: function (){
		Backbone.app.actionPlay.model.set(this.model.toJSON());
		var array = Backbone.app.songs.models;
		Backbone.app.isActive = true;
		Backbone.app.totalSongs = array.length;
		for (var i = 0; i < array.length; i++){

			if (array[i].get("name") == this.model.get("name")){
				Backbone.app.actual = i;
				i = array.length;
			}
		}
		$("#audio").attr('autoplay', 'autoplay');
	}
});
