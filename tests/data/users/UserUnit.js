function User1() {
  return {
    firstname: 'Romain',
    lastname: 'MUNIER',
    // username: 'romainmunier',
    password: 'toor',
    address: '5 RUE DE LA CHARMOTTE, 90170 ANJOUTEY',
    phone: '+33 7 68 46 73 64',
    mail: 'romain.munier90@outlook.fr',
    subscriptionDate: new Date(),
    subscriptionType: 'USER',
    birthday: new Date(),
    image: '#',
    roles: ['ROLE_USER'],
    comment: '###',
  };
}

module.exports = {
  User1,
};
