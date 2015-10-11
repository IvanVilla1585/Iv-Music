IvMusic.Views.Action = Backbone.View.extend({
	el: $(".music > .controls"),

	events:{
		'click .icon-play': 'play',
		'click .icon-prev': 'prev',
		'click .icon-next': 'next',
		'click .icon-vol': 'vol'
	},

	template: Handlebars.compile($("#action-play-template").html()),

	initialize: function (){
		this.listenTo(this.model, "change", this.render, this);
	},

	render: function (){
		var action = this.model.toJSON();
		this.$el.html(this.template(action));
	},

	play: function(even){
		even.preventDefault();
		alert("Estamos desde el play");
	},

	prev: function(even){
		even.preventDefault();
		alert("Estamos desde el play");
	},

	next: function(even){
		even.preventDefault();
		alert("Estamos desde el play");
	},

	vol: function(even){
		even.preventDefault();
		alert("Estamos desde el play");
	}
});
