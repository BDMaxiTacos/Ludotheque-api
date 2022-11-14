const { app } = require('../Express');
const AccessList = require('./AccessList.json');
const JWT = require('jsonwebtoken');
const JWTConfig = require('../../config/jwt.json');

const Users = require('../../sources/Users');

app.use(async (request, response, next) => {
  // eslint-disable-next-line max-len
  const allowedRoles = AccessList[request.path] !== undefined ? AccessList[request.path].roles : undefined;

  if (allowedRoles === undefined) {
    console.log('[CHECK ACCESS] NO RULES DEFINED FOR THIS ROUTE');
    next();
  } else {
    console.log('[CHECK ACCESS] SOME RULES DEFINED FOR THIS ROUTE');
    // console.log(allowedRoles);

    const TOKEN = request.query.token;
    if (TOKEN === undefined) {
      console.log('[CHECK ACCESS] RULES DEFINED BUT NO TOKEN PROVIDED');
      response.status(401).send(false);
    } else {
      console.log('[CHECK ACCESS] RULES DEFINED - CHECKING TOKEN');

      const { user } = JWT.verify(TOKEN, JWTConfig.PRIVATE_KEY);
      const userObject = await Users.find(user._id);

      if (userObject === null) response.status(401).send('UNAUTHORIZED');

      let authorized = false;

      allowedRoles.forEach((role) => {
        if (userObject.roles.includes(role)) {
          authorized = true;
        }
      });

      console.log('[CHECK ACCESS] TOKEN RESULT :', authorized);

      if (authorized) next();
      else response.status(403).send('UNAUTHORIZED');
    }
  }
});
