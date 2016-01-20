var Backbone    = require('backbone'),
		Songs       = require('../collections/songs'),
		Albums      = require('../collections/albums'),
		Song        = require('../models/song'),
		Album       = require('../models/album'),
	  Playing     = require('../views/play'),
	  SongView    = require('../views/songs'),
		AlbumView   = require('../views/albums'),
		Action      = require('../views/action'),
		$           = require('jquery');

module.exports = Backbone.Router.extend({

	routes: {
		"": "index",
		"album/:name": "album"
	},

	initialize: function () {
		this.listSongs = [];
		this.isActive = false;
		this.actual = -1;
		this.totalSongs = 0;
		this.audio = "";
		this.state = $(".state");
		this.circle = $(".circle");
		this.audioMp3 = "";
		this.current = {};
		this.jsonData = {};
		this.songs = new Songs();
		this.albums = new Albums();
		this.playList = new SongView({ collection: this.songs });
		this.albumList = new AlbumView({ collection: this.albums });
		this.play = new Playing({ model: new Album() });
		this.actionPlay = new Action({ model: new Song() });

		Backbone.history.start();
	},

	index: function () {
		this.fetchData();
	},

	album: function (name) {
		if (Object.keys(this.jsonData).length === 0){

			var self = this;
			this.fetchData().done(function (){
				self.addSongs(name);
				self.listSongs = self.jsonData[name].songs;
			});
		}else{
			this.addSongs(name);
			this.listSongs = this.jsonData[name].songs;
		}
	},

	fetchData: function () {
		var self = this;
		return $.getJSON('data.json').then(function (data){

			self.jsonData = data;

			for (var name in data){

				if (data.hasOwnProperty(name)){
					self.addAlbum(name, data[name]);
				}
			}
		});
	},

  addSongs: function (name) {
    this.songs.reset();
    this.current.album = this.jsonData[name];
    this.current.album.songs.forEach(this.addSong, this);
  },

  addSong: function (song) {
    var album = this.current.album;
    this.songs.add(new Song({
      album_cover: album.cover,
      album_name: album.name,
      author: album.author,
      name: song.name,
      length: song.length,
      src: song.src
    }));
  },

  addAlbum: function (name, album) {
    this.albums.add(new Album({
      name: name,
      author: album.author,
      cover: album.cover,
      year: album.year,
      songs: album.songs
    }));
  },

	obtenerActual: function (album){
		var actua = -1;
	}

});
