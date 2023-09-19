const STATUS_OK = 200;
const STATUS_CREATED = 201;

const regexLink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const { NODE_ENV } = process.env;
const { SECRET_JWT } = process.env;
const { MONGODB_URL = 'mongodb://127.0.0.1/mestodb' } = process.env;

module.exports = {
  STATUS_OK,
  STATUS_CREATED,
  regexLink,
  NODE_ENV,
  SECRET_JWT,
  MONGODB_URL,
};
