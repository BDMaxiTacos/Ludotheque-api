const express = require('express');
const Loans = require('../../sources/Loans');
const Loan = require('../../class/Loan');

const router = express.Router();

router.post('/add', async (request, response) => {
  const loan = new Loan();
  await loan.fromJSON(request.body, true);

  // console.log(loan.toJSON());

  const MongoResult = await loan.create();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    loan: await loan.toJSON(true),
    error: !(status === 200),
  });
});

router.put('/update', async (request, response) => {
  const loan = new Loan();
  await loan.fromJSON(request.body);

  const MongoResult = await loan.update();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(200).json({
    loan: loan.toJSON(true),
    error: !(status === 200),
  });
});

router.delete('/remove', async (request, response) => {
  const loan = new Loan();
  await loan.fromJSON(request.body);

  const MongoResult = await loan.remove();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    loan: loan.toJSON(),
    error: !(status === 200),
  });
});

router.post('/find', async (request, response) => {
  const loan = new Loan();
  await loan.fromJSON(request.body);

  const MongoResult = await Loans.find(loan.id);

  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    loan: MongoResult.loan,
    error: !(status === 200),
  });
});

router.get('/', async (request, response) => {
  const MongoResult = await Loans.findAll();
  let status = 200;

  switch (MongoResult.error) {
    case false:
    default:
      break;
  }

  response.status(status).json({
    loans: MongoResult.loans,
    error: !(status === 200),
  });
});

router.get('/flush', async (request, response) => {
  const MongoResult = await Loans.flush();
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
