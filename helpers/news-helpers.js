var db = require("../config/connection");
var collection = require("../config/collections");
var objectID = require("mongodb").ObjectId;
const { resolvePath } = require("react-router-dom");
const { Regulation, CseSem01, CseSem03 } = require("../config/collections");
const { response } = require("express");
module.exports = {
  addNews: (news, callback) => {
    //console.log(news);
    db.get()
      .collection("news")
      .insertOne(news)
      .then((data) => {
        // console.log(news);
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

  deleteCseSem01: (semId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.CseSem01)
        .remove({ _id: objectID(semId) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  deleteCseSem02: (semId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.CseSem02)
        .remove({ _id: objectID(semId) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  deleteCseSem03: (semId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.CseSem03)
        .remove({ _id: objectID(semId) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  deleteCseSem04: (semId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.CseSem04)
        .remove({ _id: objectID(semId) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  deleteCseSem05: (semId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.CseSem05)
        .remove({ _id: objectID(semId) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  deleteCseSem06:(semId)=>{
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.CseSem06).remove({_id:objectID(semId)}).then((response)=>{
        resolve(response)
      })
    })
  },

  addCseSem01: (csesem01, callback) => {
    // console.log(csesem01);
    db.get()
      .collection("csesem01")
      .insertOne(csesem01)
      .then((data) => {
        // console.log(csesem01);
        // console.log(csesem01.Subject_code);
        callback(csesem01.Subject_code);
      });
  },

  viewCseSem01: () => {
    return new Promise(async (reslove, reject) => {
      let csesem01 = await db
        .get()
        .collection(collection.CseSem01)
        .find()
        .toArray();
      reslove(csesem01);
    });
  },
  
  addCseSem02: (csesem02, callback) => {
    db.get()
      .collection("csesem02")
      .insertOne(csesem02)
      .then((data) => {
        callback(csesem02.Subject_code);
      });
  },

  viewCseSem02: () => {
    return new Promise(async (resolve, reject) => {
      let csesem02 = await db
        .get()
        .collection(collection.CseSem02)
        .find()
        .toArray();
      resolve(csesem02);
    });
  },

  addCseSem03: (csesem03, callback) => {
    db.get()
      .collection(collection.CseSem03)
      .insertOne(csesem03)
      .then((data) => {
        callback(csesem03.Subject_code);
      });
  },

  viewCseSem03: () => {
    return new Promise(async (resolve, reject) => {
      let csesem03 = await db
        .get()
        .collection(collection.CseSem03)
        .find()
        .toArray();
      resolve(csesem03);
    });
  },

  addCseSem04: (csesem04, callback) => {
    db.get().collection(collection.CseSem04).insertOne(csesem04).then((data) => {
      callback(csesem04.Subject_code)
      });
  },
  viewCseSem04: () => {
    return new Promise(async (resolve, reject) => {
      let csesem04 = await db.get().collection(collection.CseSem04).find().toArray();
        resolve(csesem04);
    });
  },

  addCseSem05:(csesem05,callback)=>{
    db.get().collection(collection.CseSem05).insertOne(csesem05).then((data)=>{
      callback(csesem05.Subject_code)
    })
  },
  viewCseSem05: ()=>{
    return new Promise (async(resolve,reject)=>{
      let csesem05 = await db.get().collection(collection.CseSem05).find().toArray()
      resolve(csesem05)
    })
  },

  addCseSem06 :(csesem06,callback)=>{
    db.get().collection(collection.CseSem06).insertOne(csesem06).then((data)=>{
      callback(csesem06.Subject_code)
    })
  },
  viewCseSem06:()=>{
    return new Promise(async(resolve,reject)=>{
      let csesem06 = await db.get().collection(collection.CseSem06).find().toArray()
      resolve(csesem06)
    })
  },




};
