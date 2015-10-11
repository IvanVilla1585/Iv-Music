IvMusic.Views.Playing = Backbone.View.extend({

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
