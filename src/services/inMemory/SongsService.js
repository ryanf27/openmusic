const { nanoid } = require("nanoid");

class SongsService {
  constructor() {
    this._songs = [];
  }

  // add new song to database
  addSong({ title, year, performer, genre, duration, albumId }) {
    const id = `song-${nanoid(16)}`;
    const newSong = { id, title, year, performer, genre, duration, albumId };
    this._songs.push(newSong);

    const isSuccess = this._songs.filter((song) => song.id === id).length > 0;
    if (!isSuccess) {
      throw new Error("fail adding new song");
    }
    return id;
  }

  //   get all songs from database
  getSongs() {
    return this._songs;
  }

  //   get song by id
  getSongById(id) {
    const song = this._songs.filter((s) => s.id === id)[0];

    if (!song) {
      throw new Error("song not found");
    }
    return song;
  }

  //   edit song by id
  editSongbyId(id, albumId, { title, year, performer, genre, duration }) {
    const index = this._songs.findIndex((song) => song.id === id);
    if (index === -1) {
      throw new Error("Song not found");
    }
    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      performer,
      genre,
      duration,
      albumId,
    };
  }

  // delete song
  deleteSongById(id) {
    const index = this._songs.findIndex((song) => song.id === id);

    if (!index) {
      throw new Error("Song not Found");
    }

    this._songs.splice(index, 1);
  }
}

module.exports = SongsService;
