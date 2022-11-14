const Mongoose = require('mongoose');
const MongoDBConfig = require('../config/mongoose.json');

const FULL_ADDR = `mongodb://${MongoDBConfig.USERNAME}:${MongoDBConfig.PASSWORD}@${MongoDBConfig.HOST}:${MongoDBConfig.PORT}/${MongoDBConfig.DATABASE}`;

Mongoose.connect(FULL_ADDR, { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log('[MONGOOSE] ERROR DURING CONNECT', error);
  } else {
    console.log('[MONGOOSE] Connected to database');
  }
});

module.exports = { Mongoose };
