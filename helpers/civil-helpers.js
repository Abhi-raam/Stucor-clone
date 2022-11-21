var db = require("../config/connection");
var collection = require("../config/collections");
const { response } = require("../app");
const { Collection } = require("mongodb");
const { CivilSem01 } = require("../config/collections");
var objectID = require("mongodb").ObjectId;


module.exports = {

    addCivilSem01 : (civilsem01,callback)=>{
        db.get().collection(collection.CivilSem01).insertOne(civilsem01).then((data)=>{
            callback(civilsem01.Subject_code)
        })
    },
    viewCivilSem01 : ()=>{
        return new Promise(async(resolve,reject)=>{
            let civilsem01 = await db.get().collection(collection.CivilSem01).find().toArray()
            resolve(civilsem01)
        })
    },
    deleteCivilSem01 : (semId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CivilSem01).remove({_id:objectID(semId)}).then((response)=>{
                resolve(response)
            })
        })
    },

    addCivilSem02 : (civilsem02,callback)=>{
        db.get().collection(collection.CivilSem02).insertOne(civilsem02).then((data)=>{
            callback(civilsem02.Subject_code)
        })
    },
    viewCivilSem02 : ()=>{
        return new Promise(async(resolve,reject)=>{
            let civilsem02 = await db.get().collection(collection.CivilSem02).find().toArray()
            resolve(civilsem02)
        })
    },
    deleteCivilSem02:(semId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CivilSem02).remove({_id:objectID(semId)}).then((response)=>{
                resolve(response)
            })
        })
    },

    addCivilSem03 : (civilsem03)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CivilSem03).insertOne(civilsem03).then((data)=>{
                resolve(civilsem03.Subject_code)
            })
        })
    },
    viewCivilSem03 : ()=>{
        return new Promise(async(resolve,reject)=>{
            let civisem03 = await db.get().collection(collection.CivilSem03).find().toArray()
            resolve(civisem03)
        })
    },
    deleteCivilSem03 : (semId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CivilSem03).remove({_id:objectID(semId)}).then((response)=>{
                resolve(response)
            })
        })
    },

    addCivilSem04 :(civilsem04)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CivilSem04).insertOne(civilsem04).then((data)=>{
                resolve(civilsem04.Subject_code)
            })
        })
    },
    viewCivilSem04 : ()=>{
        return new Promise(async(resolve,reject)=>{
            let civilsem04 = await db.get().collection(collection.CivilSem04).find().toArray()
            resolve(civilsem04)
        })
    },
    deleteCivilSem04 : (semId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CivilSem04).remove({_id:objectID(semId)}).then((response)=>{
                resolve(response)
            })
        })
    },

    addCivilSem05 : (civilsem05,callback)=>{
        db.get().collection(collection.CivilSem05).insertOne(civilsem05).then((data)=>{
            callback(civilsem05.Subject_code)
        })
    },
    viewCivilSem05 : ()=>{
        return new Promise((resolve,reject)=>{
            let civilsem05 = db.get().collection(collection.CivilSem05).find().toArray()
            resolve(civilsem05)
        })
    },
    deleteCivilSem05 : (semId,callback)=>{
        db.get().collection(collection.CivilSem05).remove({_id:objectID(semId)}).then((response)=>{
            callback(response)
        })
    },
    
    addCivilSem06 : (civilsem06,callback)=>{
        db.get().collection(collection.CivilSem06).insertOne(civilsem06).then((data)=>{
            callback(civilsem06.Subject_code)
        })
    },
    viewCivilSem06 : ()=>{
        return new Promise((resolve,reject)=>{
            let civilsem06 = db.get().collection(collection.CivilSem06).find().toArray()
            resolve(civilsem06)
        })
    },
    deleteCivilSem06 : (semId,callback)=>{
        db.get().collection(collection.CivilSem06).remove({_id:objectID(semId)}).then((response)=>{
            callback(response)
        })
    },
    addCivilSem07 : (civilsem07)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CivilSem07).insertOne(civilsem07).then((data)=>{
                resolve(civilsem07.Subject_code)
            })
        })
    },
    viewCivilSem07 : ()=>{
        return new Promise(async(resolve,reject)=>{
            let civilsem07 = await db.get().collection(collection.CivilSem07).find().toArray()
            resolve(civilsem07)
        })
    },
    deleteCivilSem07 : (semId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CivilSem07).remove({_id:objectID(semId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    addCivilSem08 : (civilsem08,callback)=>{
        db.get().collection(collection.CivilSem08).insertOne(civilsem08).then((data)=>{
            callback(civilsem08.Subject_code)
        })
    },
    viewCivilSem08 : async (callback)=>{
        let civilsem08 = await db.get().collection(collection.CivilSem08).find().toArray()
        callback(civilsem08)
    },
    deleteCivilSem08 : (semId,callback)=>{
        db.get().collection(collection.CivilSem08).remove({_id:objectID(semId)})
        callback(response)
    }


}