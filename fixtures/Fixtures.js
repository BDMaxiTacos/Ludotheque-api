const express = require('express');

const UsersFixtures = require('./class/Users');
const Users = require('../sources/Users');

const EditorsFixtures = require('./class/Editors');
const Editors = require('../sources/Editors');

const CategoriesFixtures = require('./class/Categories');
const Categories = require('../sources/Categories');

const GamesFixtures = require('./class/Games');
const Games = require('../sources/Games');

const LoansFixtures = require('./class/Loans');
const Loans = require('../sources/Loans');

const router = express.Router();

router.get('/loadAll/:limit', async (request, response) => {
  const limit = parseInt(request.params.limit, 10);

  await Users.flush();
  await UsersFixtures.createUsers(limit);

  await Editors.flush();
  await EditorsFixtures.createEditors(limit);

  await Categories.flush();
  await CategoriesFixtures.createCategories(limit);

  await Games.flush();
  await GamesFixtures.createGames(limit);

  await Loans.flush();
  await LoansFixtures.createLoans(limit);

  response.status(200).send(true);
});

router.get('/loadAll', async (request, response) => {
  await Users.flush();
  await UsersFixtures.createUsers();

  await Editors.flush();
  await EditorsFixtures.createEditors();

  await Categories.flush();
  await CategoriesFixtures.createCategories();

  await Games.flush();
  await GamesFixtures.createGames();

  await Loans.flush();
  await LoansFixtures.createLoans();

  response.status(200).send(true);
});

router.get('/loadUsers', async (request, response) => {
  await Users.flush();
  await UsersFixtures.createUsers();
  response.status(200).json(await Users.findAll());
});

router.get('/loadEditors', async (request, response) => {
  await Editors.flush();
  await EditorsFixtures.createEditors();
  response.status(200).json(await Editors.findAll());
});

router.get('/loadCategories', async (request, response) => {
  await Categories.flush();
  await CategoriesFixtures.createCategories();
  response.status(200).json(await Categories.findAll());
});

router.get('/loadGames', async (request, response) => {
  await Games.flush();
  await GamesFixtures.createGames();
  response.status(200).json(await Games.findAll());
});

router.get('/loadLoans', async (request, response) => {
  await Loans.flush();
  await LoansFixtures.createLoans();
  response.status(200).json(await Loans.findAll());
});

module.exports = router;
