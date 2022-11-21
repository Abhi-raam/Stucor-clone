var db = require("../config/connection");
var collection = require("../config/collections");
const { response } = require("../app");
const { Collection } = require("mongodb");
const { CivilSem01 } = require("../config/collections");
var objectID = require("mongodb").ObjectId;


module.exports = {

    addEceSem01 : (ecesem01,callback)=>{
        db.get().collection(collection.EceSem01).insertOne(ecesem01).then((data)=>{
            callback(ecesem01.Subject_code)
        })
    },
    viewEceSem01 : async(callback)=>{
        let ecesem01 = await db.get().collection(collection.EceSem01).find().toArray()
            callback(ecesem01)
    },
    deleteEceSem01 : (semId,callback)=>{
        db.get().collection(collection.EceSem01).remove({_id:objectID(semId)})
        callback(response)
    }

}