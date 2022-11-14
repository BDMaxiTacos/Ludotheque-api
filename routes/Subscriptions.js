const express = require('express');
const Subscriptions = require('../sources/Subscriptions');
const Subscription = require('../class/Subscription');

const router = express.Router();

router.post('/add', async (request, response) => {
  const subscription = new Subscription();
  subscription.fromJSON(request.body);

  const MongoResult = await subscription.create();
  let status = 200;

  switch (MongoResult.error) {
    case false:
      break;
    default:
      break;
  }

  response.status(status).json({
    subscription: subscription.toJSON(),
    error: !(status === 200),
  });
});

router.put('/update', async (request, response) => {
  const subscription = new Subscription();
  subscription.fromJSON(request.body);

  const MongoResult = await subscription.update();
  let status = 200;

  switch (MongoResult.error) {
    case false:
      break;
    default:
      break;
  }

  response.status(status).json({
    subscription: subscription.toJSON(),
    error: !(status === 200),
  });
});

router.delete('/remove', async (request, response) => {
  const subscription = new Subscription();
  subscription.fromJSON(request.body);

  const MongoResult = await subscription.remove();
  let status = 200;

  switch (MongoResult.error) {
    case false:
      break;
    default:
      break;
  }

  response.status(status).json({
    subscription: subscription.toJSON(),
    error: !(status === 200),
  });
});

router.post('/find', async (request, response) => {
  const subscription = new Subscription();
  subscription.fromJSON(request.body);

  const MongoResult = await Subscriptions.find(subscription.id);
  let status = 200;

  switch (MongoResult.error) {
    case false:
      break;
    default:
      break;
  }

  response.status(status).json({
    subscription: MongoResult.subscription,
    error: !(status === 200),
  });
});

router.get('/', async (request, response) => {
  const MongoResult = await Subscriptions.findAll();
  let status = 200;

  switch (MongoResult.error) {
    case false:
      break;
    default:
      break;
  }

  response.status(status).json({
    subscriptions: MongoResult.subscriptions,
    error: !(status === 200),
  });
});

module.exports = router;
