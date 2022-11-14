const express = require('express');
const Categories = require('../sources/Categories');
const Category = require('../class/Category');

const router = express.Router();

router.post('/add', async (request, response) => {
  const category = new Category();
  category.fromJSON(request.body);

  const MongoResult = await category.create();
  let status = 200;

  switch (MongoResult.error) {
    case false:
      break;
    default:
      break;
  }

  response.status(status).json({
    category: category.toJSON(),
    error: !(status === 200),
  });
});

router.put('/update', async (request, response) => {
  const category = new Category();
  category.fromJSON(request.body);

  const MongoResult = await category.update();
  let status = 200;

  switch (MongoResult.error) {
    case false:
      break;
    default:
      break;
  }

  response.status(status).json({
    category: category.toJSON(),
    error: !(status === 200),
  });
});

router.delete('/remove', async (request, response) => {
  const category = new Category();
  category.fromJSON(request.body);

  const MongoResult = await category.remove();
  let status = 200;

  switch (MongoResult.error) {
    case false:
      break;
    default:
      break;
  }

  response.status(status).json({
    category: category.toJSON(),
    error: !(status === 200),
  });
});

router.post('/find', async (request, response) => {
  const category = new Category();
  category.fromJSON(request.body);

  const MongoResult = await Categories.find(category.id);
  let status = 200;

  switch (MongoResult.error) {
    case false:
      break;
    default:
      break;
  }

  response.status(status).json({
    category: MongoResult.category,
    error: !(status === 200),
  });
});

router.get('/', async (request, response) => {
  const MongoResult = await Categories.findAll();
  let status = 200;

  switch (MongoResult.error) {
    case false:
      break;
    default:
      break;
  }

  response.status(status).json({
    categories: MongoResult.categories,
    error: !(status === 200),
  });
});

module.exports = router;
