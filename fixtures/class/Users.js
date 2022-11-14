const { faker } = require('@faker-js/faker');
const User = require('../../class/User');

async function createUsers(LIMIT = 100) {
  for (let i = 0; i < LIMIT; i += 1) {
    let user = new User();

    user.firstname = faker.name.firstName();
    user.lastname = faker.name.lastName();
    // user.username = `${user.firstname[0].toString().toLowerCase()}${user.lastname.toString().toLowerCase()}`;
    // user.password = user.username;
    user.address = faker.address.streetAddress();
    user.cityCode = faker.address.zipCode();
    user.city = faker.address.city();
    user.mail = faker.internet.email();
    user.phone = faker.phone.phoneNumber('+33 # ## ## ## ##');
    user.subscriptionDate = faker.date.recent(365);
    user.subscriptionType = null;
    user.created = new Date();
    user.birthday = faker.date.between('2000-01-01T00:00:00.000Z', '2010-01-01T00:00:00.000Z');
    user.image = faker.image.abstract();
    user.roles = ['ROLE_USER'];

    await user.create();
  }
}

module.exports = {
  createUsers,
};
