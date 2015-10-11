IvMusic.Views.Albums = Backbone.View.extend({

	el: $("#albums"),

	template: Handlebars.compile($("#album-template").html()),

	initialize: function () {
		this.listenTo(this.collection, "add", this.addOne, this);

	},

	addOne: function (album) {
		var albumView = new IvMusic.Views.Album({ model: album });
		this.$el.append(albumView.render().el);
	},

	render: function () {
		this.collection.forEach(this.addOne, this);
	}
});