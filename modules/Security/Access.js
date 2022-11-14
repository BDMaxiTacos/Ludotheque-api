const { app } = require('../Express');
const PassportJS = require('passport');

const AccessList = require('./AccessList.json');

/*
  TABLES DE ROUTAGES
 */
// const UsersTestAPI = require('../../tests/class/UsersTest');
//
// const UsersAPI = require('../../routes/Users');

/*
  ROUTES DE PRODUCTION
 */

/* GESTION DES UTILISATEURS */
// app.use('/users/', PassportJS.authenticate('jwt', { session: false }), UsersAPI);

/*
  ROUTES DE TESTS
 */

/* GESTION DES UTILISATEURS */

// Object.keys(AccessList).forEach((key) => {
//   app.use(key, PassportJS.authenticate('jwt', { session: false }), require(AccessList[key].router));
// });
