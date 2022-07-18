/* eslint-disable operator-linebreak */
const ClientError = require("../../exceptions/ClientError");

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler(request, h) {
    try {
      await this._validator.validateSongPayload(request.payload);
      const songId = await this._service.addSong(request.payload);
      const response = h.response({
        status: "success",
        message: "Success adding new song",
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // server error
      const response = h.response({
        status: "Fail",
        message: "server error",
      });
      response.code(500);
      return response;
    }
  }

  async getSongsHandler() {
    const songs = await this._service.getSongs();
    return {
      status: "success",
      data: { songs },
    };
  }

  async getSongByIdHandler(request, h) {
    try {
      const id = request.params;
      const song = await this._service.getSongById(id);
      return {
        status: "success",
        data: {
          song,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // server error
      const response = h.response({
        status: "fail",
        message: "server error",
      });
      response.code(500);
      return response;
    }
  }

  async putSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.editSongById(id, request.payload);
      return {
        status: "success",
        message: "Success editing song",
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  async deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteSongById(id);
      return {
        status: "success",
        message: "Succes delete song",
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = SongsHandler;
