var db = require("../config/connection");
var collection = require("../config/collections");
const { response } = require("../app");
const { Collection, ObjectId } = require("mongodb");
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
    },
    addEceSem02 : (ecesem02)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.EceSem02).insertOne(ecesem02).then((data)=>{
                resolve(ecesem02.Subject_code)
            })
        })
    },
    viewEceSem02 : ()=>{
        return new Promise(async(resolve,reject)=>{
            let ecesem02 = await db.get().collection(collection.EceSem02).find().toArray()
                resolve(ecesem02)
        })
    },
    deleteEceSem02 :(semId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.EceSem02).remove({_id:objectID(semId)})
        resolve(response)
    })
    },
    addEceSem03 : (ecesem03,callback)=>{
        db.get().collection(collection.EceSem03).insertOne(ecesem03).then((data)=>{
            callback(ecesem03.Subject_code)
        })
    },
    viewEceSem03 :async (callback)=>{
        let ecesem03 = await db.get().collection(collection.EceSem03).find().toArray()
        callback(ecesem03)
    },
    deleteEceSem03 :(semId,callback)=>{
        db.get().collection(collection.EceSem03).remove({_id:objectID(semId)})
        callback(true)
    },
    addEceSem04 : (ecesem04,callback)=>{
        db.get().collection(collection.EceSem04).insertOne(ecesem04).then((data)=>{
            callback(ecesem04.Subject_code)
        })
    },
    viewEceSem04 : async(callback)=>{
        let ecesem04 = await db.get().collection(collection.EceSem04).find().toArray()
        callback(ecesem04)
    },
    deleteEceSem04 : (semId,callback)=>{
        db.get().collection(collection.EceSem04).remove({_id:objectID(semId)})
        callback(true)
    },
    addEceSem05 :(ecesem05)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.EceSem05).insertOne(ecesem05)
            resolve(ecesem05.Subject_code)
        })
    },
    viewEceSem05 :()=>{
        return new Promise(async(resolve,reject)=>{
            let ecesem05 = await db.get().collection(collection.EceSem05).find().toArray()
            resolve(ecesem05)
        })
    },
    deleteEceSem05 : (semId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.EceSem05).remove({_id:objectID(semId)})
            resolve(response)
        })
    },
    addEceSem06 : (ecesem06,callback)=>{
        db.get().collection(collection.EceSem06).insertOne(ecesem06).then((data)=>{
            callback(ecesem06.Subject_code)
        })
    },
    viewEceSem06 : async(callback)=>{
        let ecesem06 = await db.get().collection(collection.EceSem06).find().toArray()
        callback(ecesem06)
    },
    deleteEceSem06 : (semId,callback)=>{
        db.get().collection(collection.EceSem06).remove({_id:objectID(semId)})
        callback(true)
    },
    addEceSem07 : (ecesem07)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.EceSem07).insertOne(ecesem07)
            resolve(ecesem07.Subject_code)
        })
    },
    viewEceSem07 : ()=>{
        return new Promise(async(resolve,reject)=>{
            let ecesem07 = await db.get().collection(collection.EceSem07).find().toArray()
            resolve(ecesem07)
        })
    },
    deleteEceSem07 :(semId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.EceSem07).remove({_id:ObjectId(semId)})
            resolve(true)
        })
    },
    addEceSem08 :(ecesem08,callback)=>{
        db.get().collection(collection.EceSem08).insertOne(ecesem08)
        callback(ecesem08.Subject_code)
    },
    viewEceSem08 : async(callback)=>{
        let ecesem08 = await db.get().collection(collection.EceSem08).find().toArray()
        callback(ecesem08)
    },
    deleteEceSem08 : (semId,callback)=>{
        db.get().collection(collection.EceSem08).remove({_id:objectID(semId)})
        callback(true)
    }

}