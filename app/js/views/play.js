IvMusic.Views.Playing = Backbone.View.extend({

	el: $(".music"),

	template: Handlebars.compile($("#player-template").html()),

	initialize: function (){
		this.listenTo(this.model, "change", this.render, this);
	},

	render: function (){
		var play = this.model.toJSON();
		var html = this.template(play);
		this.$el.html(html);
		return this;
	}
});