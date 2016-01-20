var Backbone    = require('backbone'),
		Handlebars  = require('handlebars'),
		$						= require('jquery'),
		_						= require('underscore'),
		app					= Backbone.app;

module.exports = Backbone.View.extend({
	el: $(".music > .controls"),

	events:{
		'click .icon-play': 'play',
		'click .icon-prev': 'prev',
		'click .icon-next': 'next',
		'click #mas': 'mas',
		'click #menos': 'menos'
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
		var res = "";
		var dura = "";
		var seg;
		var state = $(".state");
		var circle = $(".circle");
		var actual = Backbone.app.actual;
		if ( Backbone.app.isActive == true ){
			$("#audio").trigger('pause');
			Backbone.app.isActive = false;
		}else{
			if ( actual == -1){
				Backbone.app.actual = 0;
				console.log(Backbone.app.listSongs[0]);
				dura = Backbone.app.listSongs[0].get("length");
				res = dura.split(":");
				seg = (parseInt(res[0]) * 60) + parseInt(res[1]);
				state.css("animation", seg + "s state infinite linear");
				circle.css("animation", "1s circle infinite");
				$("#audio").trigger('play');
			}else{
				$("#audio").trigger('play');
			}
			Backbone.app.isActive = true;
		}

	},

	prev: function(even){
		even.preventDefault();
		var cancion = Backbone.app.actual;
		var array = _.toArray(Backbone.app.songs.models);
		if ( cancion == 0 && Backbone.app.isActive == true ){
			this.model.set("src", array[array.length - 1].get("src"));
			cancion = Backbone.app.totalSongs;
		}else{
			this.model.set("src", array[cancion - 1].get("src"));
		}
		Backbone.app.actual = cancion - 1;
		$("#audio").attr('autoplay', 'autoplay');
	},

	next: function(even){
		even.preventDefault();
		var cancion = Backbone.app.actual;
		var array = _.toArray(Backbone.app.songs.models);
		if ( cancion == (Backbone.app.totalSongs - 1) && Backbone.app.isActive == true ){
			this.model.set("src", array[0].get("src"));
			cancion = 0;
		}else{
			this.model.set("src", array[cancion + 1].get("src"));
		}
		Backbone.app.actual = cancion + 1;
		$("#audio").attr('autoplay', 'autoplay');
	},

	mas: function(even){
		even.preventDefault();
		alert("mas");
		var volume = $("#audio").trigger("volume") + 0.2;
    if(volume > 1){
        volume = 1;
    }
    $("#audio").trigger("volume",volume);
	},

	menos: function(even){
		even.preventDefault();
		var volume = $("#audio").trigger("volume") - 0.2;
    if(volume < 0){
        volume = 0;
    }
    $("#audio").trigger("volume",volume);
	}
});
