IvMusic.Views.Songs = Backbone.View.extend({

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
		var songView = new IvMusic.Views.Song({ model: song });
		this.$el.append(songView.render().el);
	},

	addAll: function () {
		this.collection.forEach(this.addOne, this);
	}
});