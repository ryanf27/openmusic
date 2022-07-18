/* eslint-disable camelcase */
const mapDBToModelId = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
});

const mapDBToModel = ({ id, title, performer }) => ({ id, title, performer });
module.exports = { mapDBToModel, mapDBToModelId };
