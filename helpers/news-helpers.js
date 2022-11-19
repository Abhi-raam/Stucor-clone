var db = require("../config/connection");
var collection = require("../config/collections");
var objectID = require("mongodb").ObjectId;
const { resolvePath } = require("react-router-dom");
const { Regulation, CseSem01, CseSem03 } = require("../config/collections");
const { response } = require("express");
module.exports = {
  addNews: (news, callback) => {
    db.get()
      .collection("news")
      .insertOne(news)
      .then((data) => {
        callback(news.NEWS_CODE);
      });
  },

  getAllNews: () => {
    return new Promise(async (reslove, reject) => {
      let news = await db
        .get()
        .collection(collection.AUnews)
        .find()
        .sort({ NEWS_DATE: -1 })
        .toArray();
      reslove(news);
    });
  },

  deleteNews: (newsId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.AUnews)
        .remove({ _id: objectID(newsId) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  addRegulation: (regulation, callback) => {
    db.get()
      .collection("regulation")
      .insertOne(regulation)
      .then((data) => {
        callback(true);
      });
  },

  getAllRegulation: () => {
    return new Promise(async (resolve, reject) => {
      let regulation = await db
        .get()
        .collection(collection.Regulation)
        .find()
        .toArray();
      resolve(regulation);
    });
  },

  deleteRegulation: (RegId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.Regulation)
        .remove({ _id: objectID(RegId) })
        .then((response) => {
          resolve(response);
        });
    });
  },
 
};
