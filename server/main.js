import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { LinksCollection } from "/imports/api/links";

async function insertLink({ title, url, user }) {
  await LinksCollection.insertAsync({
    title,
    url,
    userId: user._id,
    createdAt: new Date(),
  });
}

const SEED_USERNAME = "paavan";
const SEED_PASSWORD = "1234";

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  // If the Links collection is empty, add some data.
  if ((await LinksCollection.find().countAsync()) === 0) {
    await insertLink({
      title: "Do the Tutorial",
      url: "https://www.meteor.com/tutorials/react/creating-an-app",
      user,
    });

    await insertLink({
      title: "Follow the Guide",
      url: "https://guide.meteor.com",
      user,
    });

    await insertLink({
      title: "Read the Docs",
      url: "https://docs.meteor.com",
      user,
    });

    await insertLink({
      title: "Discussions",
      url: "https://forums.meteor.com",
      user,
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });

  LinksCollection.allow({
    insert(userId, doc) {
      return true;
    },
    update(userId, doc, fields, modifier) {
      return true;
    },
    remove(userId, doc) {
      return true;
    },
  });
});
