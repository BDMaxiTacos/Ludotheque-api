const User = require('../class/User');
const { UserSchema } = require('../schema/UserSchema');

async function findAll() {
  return new Promise((resolve) => {
    UserSchema.find({})
      .then(async (response) => {
        const users = [];
        for (let user of response) {
          const usrObj = new User();
          await usrObj.fromJSON(user, true);

          users.push(await usrObj.toJSON(true));
        }

        resolve({
          error: false,
          users,
        });
      });
  });
}

async function find(ObjectId = null, callfrom = null) {
  return new Promise((resolve) => {
    UserSchema.findById(ObjectId).then(async (response) => {
      if (response) {
        const user = new User();
        await user.fromJSON(response, true, callfrom);
        resolve({
          user,
          error: false,
        });
      } else {
        resolve({
          user: null,
          error: true,
        });
      }
    });
  });
}

async function findCircular(ObjectId = null) {
  return new Promise((resolve) => {
    UserSchema.findById(ObjectId).then(async (response) => {
      if (response) {
        const user = new User();
        await user.fromJSONCircular(response, true);
        resolve({
          user,
          error: false,
        });
      } else {
        resolve({
          user: null,
          error: true,
        });
      }
    });
  });
}

async function flush() {
  return new Promise((resolve) => {
    UserSchema.deleteMany({})
      .then((response) => {
        // console.log(response);
        resolve({
          error: false,
          result: response,
        });
      });
  });
}

module.exports = {
  findAll,
  find,
  findCircular,
  flush,
};
