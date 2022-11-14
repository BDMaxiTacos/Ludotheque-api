const express = require('express');
const Users = require('../sources/Users');
const User = require('../class/User');

const router = express.Router();
const Nodemailer = require('../modules/Nodemailer');

/*
  AJOUT D'UN UTILISATEUR PAR JSON
  Dans ce cas, l'ensemble des données du JSON sont prises en compte
 */
router.post('/add', async (request, response) => {
  const user = new User();
  await user.fromJSON(request.body);

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

  if (status === 200) {
    // await Nodemailer.sendMail('REGISTER', await user.toJSON());
  }

  response.status(status).json({
    user: await user.toJSON(),
    error: !(status === 200),
  });
});

/*
  MODIFICATION D'UN UTILISATEUR PAR JSON
  Dans ce cas, l'ensemble du JSON est pris en compte. Il est nécessaire que celui-ci comprenne :
  - L'identifiant de l'utilisateur
  - L'ensemble de ses données
 */
router.put('/update', async (request, response) => {
  const user = new User();
  await user.fromJSON(request.body);

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

/*
  SUPPRESSION D'UN UTILISATEUR PAR JSON
  Dans ce cas, seul l'identifiant (id) est pris en compte pour la suppression
 */
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

/*
  OBTENTION D'UN UTILISATEUR SPECIFIQUE
  Pour ce faire, vous devez fournir l'identifiant d'un utilisateur dans un JSON
 */
router.post('/find', async (request, response) => {
  const user = new User();
  await user.fromJSON(request.body);

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

/*
  OBTENTION DE LA LISTE DES UTILISATEURS
 */
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

module.exports = router;
