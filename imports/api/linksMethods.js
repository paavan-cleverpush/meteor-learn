import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { LinksCollection } from "./links";

Meteor.methods({
  "links.insert"({ title, url }) {
    check(title, String);
    check(url, String);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    LinksCollection.insert({
      title,
      url,
      userId: this.userId,
      createdAt: new Date(),
    });
  },

  "links.remove"(_id) {
    check(_id, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    LinksCollection.remove({ _id });
  },

  "links.update"({ _id, title, url }) {
    check(_id, String);
    check(title, String);
    check(url, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    LinksCollection.update(_id, {
      $set: { title, url },
    });
  },
});
