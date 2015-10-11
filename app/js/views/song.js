IvMusic.Views.Song = Backbone.View.extend({

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
		IvMusic.app.actionPlay.model.set(this.model.toJSON());
	}
});