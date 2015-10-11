IvMusic.Router = Backbone.Router.extend({

	routes: {
		"": "index",
		"album/:name": "album"
	},

	initialize: function () {
		this.listSongs = [];
		this.current = {};
		this.jsonData = {};
		this.songs = new IvMusic.Collections.Songs();
		this.albums = new IvMusic.Collections.Albums();
		this.playList = new IvMusic.Views.Songs({ collection: this.songs });
		this.albumList = new IvMusic.Views.Albums({ collection: this.albums });
		this.play = new IvMusic.Views.Playing({ model: new IvMusic.Models.Album() });
		this.actionPlay = new IvMusic.Views.Action({ model: new IvMusic.Models.Song() });

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
    this.songs.add(new IvMusic.Models.Song({
      album_cover: album.cover,
      album_name: album.name,
      author: album.author,
      name: song.name,
      length: song.length,
      src: song.src
    }));
  },

  addAlbum: function (name, album) {
    this.albums.add(new IvMusic.Models.Album({
      name: name,
      author: album.author,
      cover: album.cover,
      year: album.year,
      songs: album.songs
    }));
  }
});
