const express = require('express');
const Editors = require('../../sources/Editors');
const Editor = require('../../class/Editor');

const router = express.Router();

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

router.put('/update', async (request, response) => {
  const editor = new Editor();
  editor.fromJSON(request.body);

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

router.delete('/remove', async (request, response) => {
  const editor = new Editor();
  editor.fromJSON(request.body);

  const MongoResult = await editor.remove();
  let status = 200;

  switch (MongoResult.error) {
    case false:
      break;
    default:
      break;
  }

  response.status(status).json({
    editor: editor.toJSON(),
    error: !(status === 200),
  });
});

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

router.get('/flush', async (request, response) => {
  const MongoResult = await Editors.flush();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json(MongoResult);
});

module.exports = router;
