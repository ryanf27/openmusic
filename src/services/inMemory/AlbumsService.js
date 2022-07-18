const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class AlbumsService {
  constructor() {
    this._albums = [];
  }

  addAlbum({ name, year }) {
    const index = this._albums.findIndex((album) => album.name === name);
    // eslint-disable-next-line operator-linebreak
    const albumId =
      index === -1 ? `album-${nanoid(16)}` : this._albums[index].id;
    const newAlbum = { albumId, name, year };
    this._albums.push(newAlbum);

    const isSuccess = this._albums.filter((album) => album.id === albumId) > 0;
    if (!isSuccess) {
      throw new InvariantError("fail to add new album");
    }
    return albumId;
  }

  getAlbumById(id) {
    const album = this._albums.filter((a) => a.id === id)[0];
    if (!album) {
      throw new NotFoundError("error");
    }

    return id;
  }

  editAlbumById(id, { name, year }) {
    const index = this._albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundError("error");
    }
    this._albums[index] = {
      ...this._albums[index],
      name,
      year,
    };
  }

  deleteAlbumById(id) {
    const index = this._albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundError("error");
    }

    this._albums.splice(index, 1);
  }
}

module.exports = AlbumsService;
