var Backbone = require('backbone'),
		Handlebars  = require('handlebars'),
		$ = require('jquery'),
		AlbumView = require('../views/album');

module.exports = Backbone.View.extend({

	el: $("#albums"),

	template: Handlebars.compile($("#album-template").html()),

	initialize: function () {
		this.listenTo(this.collection, "add", this.addOne, this);

	},

	addOne: function (album) {
		var albumView = new AlbumView({ model: album });
		this.$el.append(albumView.render().el);
	},

	render: function () {
		this.collection.forEach(this.addOne, this);
	}
});
