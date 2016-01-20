var Backbone    = require('backbone'),
		Handlebars  = require('handlebars'),
		$						= require('jquery'),
		_						= require('underscore'),
		app					= Backbone.app;

module.exports = Backbone.View.extend({

	tagName: 'article',

	className: 'song',

	events: {
		'click': 'navigate'
	},

	template: Handlebars.compile($("#album-template").html()),

	initialize: function () {
		this.listenTo(this.model, "change", this.render, this);
	},

	render: function () {
		var album = this.model.toJSON();
		var html = this.template(album);
		this.$el.html(html);
		return this;
	},

	navigate: function () {
	  var albu = Backbone.app.jsonData["this.model.get('name')"];
		Backbone.app.navigate("album/" + this.model.get("name"), { trigger: true });
		Backbone.app.play.model.set( this.model.toJSON() );
		Backbone.app.listSongs = _.toArray(Backbone.app.songs.models);
		Backbone.app.actionPlay.model.set(Backbone.app.listSongs[0].toJSON());
		Backbone.app.actual = -1;
	}
});
