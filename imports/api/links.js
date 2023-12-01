import { Mongo } from 'meteor/mongo';

export const LinksCollection = new Mongo.Collection('links');
console.log("metero db", LinksCollection)


