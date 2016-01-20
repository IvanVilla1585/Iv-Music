var Backbone 		= require('backbone'),
		$ 					= require('jquery'),
		Handlebars  = require('handlebars'),
		SongView 		= require('../views/song');

module.exports = Backbone.View.extend({

	el: $(".playlist > .list"),

	initialize: function () {
		this.listenTo(this.collection, "add", this.addOne, this);
		this.listenTo(this.collection, "reset", this.render, this);
	},

	render: function () {
		this.$el.empty();
		this.addAll();
	},

	addOne: function (song) {
		var songView = new SongView({ model: song });
		this.$el.append(songView.render().el);
	},

	addAll: function () {
		this.collection.forEach(this.addOne, this);
		$(".playlist").css({"overflow-y": "scroll", "max-height": "40.4em"});
	}
});
