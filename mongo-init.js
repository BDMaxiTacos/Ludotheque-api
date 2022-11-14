db.createCollection('default');

db.createUser({
  user: 'ludoapi',
  pwd: '2JOypQS87KSuJO5P8Y2trNh8tTR6VHvp',
  roles: [
    {
      role: 'dbOwner',
      db: 'LUDOAPI',
    },
  ],
});
