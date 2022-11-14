const express = require('express');
const Games = require('../sources/Games');
const Game = require('../class/Game');

const router = express.Router();

/*
  AJOUT D'UN JEU PAR JSON
  Pour ce faire, il suffit d'envoyer un JSON contenant l'ensemble des données du jeu
 */
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

/*
  MODIFICATION D'UN JEU PAR JSON
  Les données nécessaires pour modifier un jeu sont les suivantes :
  - Identifiant (id) du jeu
  - L'ensemble des données du jeu à modifier
 */
router.put('/update', async (request, response) => {
  const game = new Game();
  await game.fromJSON(request.body);

  // console.log(game.toJSON());

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

/*
  SUPPRESSION D'UN JEU PAR JSON
  Pour supprimer un jeu, la seule donnée nécessaire à fournir est l'identifiant du jeu
 */
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

/*
  OBTENTION D'UN JEU SPECIFIQUE
  Pour ce faire vous devez fournir un JSON contenant l'identifiant du jeu
 */
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

/*
  OBTENIR L'ENSEMBLE DES JEUX
 */
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

module.exports = router;
