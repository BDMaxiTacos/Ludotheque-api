const express = require('express');
const Editors = require('../sources/Editors');
const Editor = require('../class/Editor');

const router = express.Router();

/*
  AJOUT D'UN EDITEUR PAR JSON
  Pour ce faire, il suffit de lui fournir l'ensemble des données composant un éditeur
 */
router.post('/add', async (request, response) => {
  const editor = new Editor();
  editor.fromJSON(request.body);

  const MongoResult = await editor.create();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    editor: editor.toJSON(),
    error: !(status === 200),
  });
});

/*
  MODIFICATION D'UN EDITEUR PAR JSON
  Pour utiliser la modification d'un utilisateur, vous devez fournir les éléments suivants :
  - Identifiant (id) de l'éditeur
  - Données de l'éditeur
 */
router.put('/update', async (request, response) => {
  const editor = new Editor();
  editor.fromJSON(request.body);

  // console.log(editor.toJSON());

  const MongoResult = await editor.update();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    editor: editor.toJSON(),
    error: !(status === 200),
  });
});

/*
  SUPPRESSION D'UN EDITEUR PAR JSON
  Pour supprimer un éditeur, la seule donnée que vous devez fournir est l'identifiant.
 */
router.delete('/remove', async (request, response) => {
  const editor = new Editor();
  editor.fromJSON(request.body);

  const MongoResult = await editor.remove();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    editor: editor.toJSON(),
    error: !(status === 200),
  });
});

/*
  OBTENTION D'UN EDITEUR
  Cette route permet l'obtention d'un éditeur spécifique. Il faut lui fournir un JSON contenant :
  - L'identifiant (id) de l'éditeur
 */
router.post('/find', async (request, response) => {
  const editor = new Editor();
  editor.fromJSON(request.body);

  const MongoResult = await Editors.find(editor.id);

  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    editor: MongoResult.editor,
    error: !(status === 200),
  });
});

/*
  OBTENTION DE LA LISTE DES EDITEURS
 */
router.get('/', async (request, response) => {
  const MongoResult = await Editors.findAll();

  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    editors: MongoResult.editors,
    error: !(status === 200),
  });
});

module.exports = router;
