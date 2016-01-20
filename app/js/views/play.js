var Backbone    = require('backbone'),
		Handlebars  = require('handlebars'),
		$						= require('jquery');

module.exports = Backbone.View.extend({

	el: $(".music > .play"),

	template: Handlebars.compile($("#player-template").html()),

	initialize: function (){
		this.listenTo(this.model, "change", this.render, this);
	},

	render: function (){
		var album = this.model.toJSON();
		this.$el.html(this.template(album));
	}
});
