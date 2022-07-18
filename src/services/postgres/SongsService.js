const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const { mapDBToModel, mapDBToModelId } = require("../../utils");
// error handling
const InvarianError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title, year, genre, performer, duration, albumId = "" }) {
    const id = `song-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO songs VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id",
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvarianError("fail adding new song");
    }

    return result.rows[0].id;
  }

  async getSongs() {
    const result = await this._pool.query(
      // eslint-disable-next-line comma-dangle
      "SELECT id, title, performer FROM songs"
    );
    return result.rows.map(mapDBToModel);
  }

  async getSongById(id) {
    const query = {
      text: "SELECT * FROM songs WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("song not found");
    }
    return result.rows.map(mapDBToModelId)[0];
  }

  async editSongById(id, { title, year, genre, performer, duration, albumId }) {
    const query = {
      text: "UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, albumId = $6 WHERE id = $7 RETURNING id",
      values: [title, year, genre, performer, duration, albumId, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("id not found");
    }
  }

  async deleteSongById(id) {
    const query = {
      text: "DELETE FROM songs WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowsCount) {
      throw new NotFoundError("id not found");
    }
  }
}

module.exports = SongsService;
