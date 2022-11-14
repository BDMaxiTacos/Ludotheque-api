const express = require('express');
const Games = require('../../sources/Games');
const Game = require('../../class/Game');
const Editor = require('../../class/Editor');
const Editors = require('../../sources/Editors');

const router = express.Router();

router.post('/add', async (request, response) => {
  const game = new Game();
  await game.fromJSON(request.body);

  const MongoResult = await game.create();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    game: game.toJSON(true),
    error: !(status === 200),
  });
});

router.put('/update', async (request, response) => {
  const game = new Game();
  await game.fromJSON(request.body);

  const MongoResult = await game.update();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(200).json({
    game: game.toJSON(true),
    error: !(status === 200),
  });
});

router.delete('/remove', async (request, response) => {
  const game = new Game();
  await game.fromJSON(request.body);

  const MongoResult = await game.remove();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    game: game.toJSON(),
    error: !(status === 200),
  });
});

router.post('/find', async (request, response) => {
  const game = new Game();
  await game.fromJSON(request.body);

  const MongoResult = await Games.find(game.id);

  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    game: MongoResult.game,
    error: !(status === 200),
  });
});

router.get('/', async (request, response) => {
  const MongoResult = await Games.findAll();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    games: MongoResult.games,
    error: !(status === 200),
  });
});

router.get('/flush', async (request, response) => {
  const MongoResult = await Games.flush();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(200).json({
    error: !(status === 200),
    result: MongoResult.result,
  });
});

module.exports = router;
