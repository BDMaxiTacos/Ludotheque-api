const express = require('express');
const Users = require('../../sources/Users');
const User = require('../../class/User');
const Editor = require('../../class/Editor');
const Editors = require('../../sources/Editors');

const router = express.Router();

// AJOUT D'UN UTILISATEUR PAR JSON
router.post('/add', async (request, response) => {
  const user = new User();
  user.fromJSON(request.body);

  const MongoResult = await user.create();
  let status = 200;

  switch (MongoResult.error) {
    case 'NOT_UNIQUE_OBJECT':
      status = 400;
      break;
    case false:
    default:
      break;
  }

  response.status(status).json({
    user: user.toJSON(),
    error: !(status === 200),
  });
});

// MODIFICATION D'UN UTILISATEUR PAR JSON
router.put('/update', async (request, response) => {
  const user = new User();
  user.fromJSON(request.body);

  // console.log(user.toJSON());
  const MongoResult = await user.update();

  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    user: await user.toJSON(),
    error: !(status === 200),
  });
});

// SUPPRESSION D'UN UTILISATEUR PAR JSON (UNIQUEMENT ID)
router.delete('/remove', async (request, response) => {
  const user = new User();
  const MongoResult = user.fromJSON(request.body);

  await user.remove();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    user: await user.toJSON(),
    error: !(status === 200),
  });
});

router.post('/find', async (request, response) => {
  const user = new User();
  user.fromJSON(request.body);

  const MongoResult = await Users.find(user.id);

  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    user: MongoResult.user,
    error: !(status === 200),
  });
});

// OBTENTION DE LA LISTE DES UTILISATEURS
router.get('/', async (request, response) => {
  const MongoResult = await Users.findAll();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    users: MongoResult.users,
    error: !(status === 200),
  });
});

// SUPPRESSION DE LA LISTE DES UTILISATEURS - RÉINITIALISATION DE LA BASE
router.get('/flush', async (request, response) => {
  const MongoResult = await Users.flush();
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
