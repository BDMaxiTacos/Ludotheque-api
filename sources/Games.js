const Game = require('../class/Game');
const { GameSchema } = require('../schema/GameSchema');

async function findAll() {
  return new Promise((resolve) => {
    GameSchema.find({}).then(async (response) => {
      const games = [];
      for (const game of response) {
        const gameObj = new Game();
        await gameObj.fromJSON(game);

        games.push(gameObj);
      }

      resolve({
        error: false,
        games,
      });
    });
  });
}

async function find(ObjectId = null) {
  return new Promise((resolve) => {
    GameSchema.findById(ObjectId).then(async (response) => {
      if (response) {
        const game = new Game();
        await game.fromJSON(response);
        // console.log(game);
        resolve({
          error: false,
          game,
        });
      } else {
        resolve({
          error: true,
          game: null,
        });
      }
    });
  });
}

async function flush() {
  return new Promise((resolve) => {
    GameSchema.deleteMany({}).then((response) => {
      // console.log(response);
      resolve({
        error: false,
        result: response,
      });
    });
  });
}

module.exports = {
  findAll,
  find,
  flush,
};
