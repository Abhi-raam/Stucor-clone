var db = require("../config/connection");
var collection = require("../config/collections");
const { response } = require("../app");
const { Collection, ObjectId } = require("mongodb");
const { CivilSem01 } = require("../config/collections");
var objectID = require("mongodb").ObjectId;

module.exports = {
    addMechSem01 : (mechsem01,callback)=>{
        db.get().collection(collection.MechSem01).insertOne(mechsem01)
        callback(mechsem01.Subject_code)
    },
    viewMechSem01 : async(callback)=>{
        let mechsem01 = await db.get().collection(collection.MechSem01).find().toArray()
        callback(mechsem01)
    },
    deleteMechSem01 : (semId,callback)=>{
        db.get().collection(collection.MechSem01).remove({_id:objectID(semId)})
        callback(true)
    },

    addMechSem02 : (mechsem02)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.MechSem02).insertOne(mechsem02)
            resolve(mechsem02.Subject_code)
        })
    },
    viewMechSem02 : ()=>{
        return new Promise(async(resolve,reject)=>{
            let mechsem02 = await db.get().collection(collection.MechSem02).find().toArray()
            resolve(mechsem02)
        })
    },
    deleteMechSem02 : (semId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.MechSem02).remove({_id:objectID(semId)})
            resolve(true)
        })
    },

    addMechSem03 : (mechsem03,callback)=>{
        db.get().collection(collection.MechSem03).insertOne(mechsem03)
        callback(mechsem03.Subject_code)
    },
    viewMechSem03 : async(callback)=>{
        let mechsem03 = await db.get().collection(collection.MechSem03).find().toArray()
        callback(mechsem03)
    },
    deleteMechSem03 : (semId,callback)=>{
        db.get().collection(collection.MechSem03).remove({_id:objectID(semId)})
        callback(true)
    },

    addMechSem04 : (mechsem04,callback)=>{
        db.get().collection(collection.MechSem04).insertOne(mechsem04)
        callback(mechsem04.Subject_code)
    },
    viewMechSem04 : async(callback)=>{
        let mechsem04 = await db.get().collection(collection.MechSem04).find().toArray()
        callback(mechsem04)
    },
    deleteMechSem04 : (semId,callback)=>{
        db.get().collection(collection.MechSem04).remove({_id:objectID(semId)})
        callback(true)
    },

    addMechSem05 : (mechsem05,callback)=>{
        db.get().collection(collection.MechSem05).insertOne(mechsem05)
        callback(mechsem05.Subject_code)
    },
    viewMechSem05 : async(callback)=>{
        let mechsem05 = await db.get().collection(collection.MechSem05).find().toArray()
        callback(mechsem05)
    },
    deleteMechSem05 : (semId,callback)=>{
        db.get().collection(collection.MechSem05).remove({_id:objectID(semId)})
        callback(true)
    },

    addMechSem06 : (mechsem06,callback)=>{
        db.get().collection(collection.MechSem06).insertOne(mechsem06)
        callback(mechsem06.Subject_code)
    },
    viewMechSem06 : async(callback)=>{
        let mechsem06 = await db.get().collection(collection.MechSem06).find().toArray()
        callback(mechsem06)
    },
    deleteMechSem06 : (semId,callback)=>{
        db.get().collection(collection.MechSem06).remove({_id:objectID(semId)})
        callback(true)
    },

    addMechSem07 : (mechsem07,callback)=>{
        db.get().collection(collection.MechSem07).insertOne(mechsem07)
        callback(mechsem07.Subject_code)
    },
    viewMechSem07 : async(callback)=>{
        let mechsem07 = await db.get().collection(collection.MechSem07).find().toArray()
        callback(mechsem07)
    },
    deleteMechSem07 : (semId,callback)=>{
        db.get().collection(collection.MechSem07).remove({_id:objectID(semId)})
        callback(true)
    },

    addMechSem08 : (mechsem08,callback)=>{
        db.get().collection(collection.MechSem08).insertOne(mechsem08)
        callback(mechsem08.Subject_code)
    },
    viewMechSem08 : async(callback)=>{
        let mechsem08 = await db.get().collection(collection.MechSem08).find().toArray()
        callback(mechsem08)
    },
    deleteMechSem08 : (semId,callback)=>{
        db.get().collection(collection.MechSem08).remove({_id:objectID(semId)})
        callback(true)
    },

}