const Subscription = require('../class/Subscription');
const { SubscriptionSchema } = require('../schema/SubscriptionSchema');

async function findAll() {
  return new Promise((resolve) => {
    SubscriptionSchema.find({}).then(async (response) => {
      const subscriptions = [];
      for (const subscription of response) {
        const subObj = new Subscription();
        await subObj.fromJSON(subscription);

        subscriptions.push(subObj);
      }

      resolve({
        error: false,
        subscriptions,
      });
    });
  });
}

async function find(ObjectId = null) {
  return new Promise((resolve) => {
    SubscriptionSchema.findById(ObjectId).then(async (response) => {
      if (response) {
        const subscription = new Subscription();
        await subscription.fromJSON(response);
        resolve({
          error: false,
          subscription,
        });
      } else {
        resolve({
          error: true,
          subscription: null,
        });
      }
    }).catch((e) => {
      console.error(e);
    });
  });
}

async function flush() {
  return new Promise((resolve) => {
    SubscriptionSchema.deleteMany({}).then((response) => {
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
  flush,
};
