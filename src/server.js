require("dotenv").config();

const Hapi = require("@hapi/hapi");
// albums
const album = require("./api/albums");
const AlbumsService = require("./services/postgres/AlbumsService");
const AlbumValidator = require("./validator/albums");
// songs
const song = require("./api/songs");
const SongsService = require("./services/postgres/SongsService");
const SongValidator = require("./validator/songs");

const init = async () => {
  const albumService = new AlbumsService();
  const songService = new SongsService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: album,
      options: {
        service: albumService,
        validator: AlbumValidator,
      },
    },
    {
      plugin: song,
      options: {
        service: songService,
        validator: SongValidator,
      },
    },
  ]);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
