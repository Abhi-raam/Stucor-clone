const mongoClient = require('mongodb').MongoClient

const state = {
    db:null
}

//connect database to server
module.exports.connect=function(done){
    const url = 'mongodb://localhost:27017'
    const dbname = 'stucor'
    
    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db = data.db(dbname)
        done()
    })
    
}
 //use data from database
module.exports.get = function(){
    return state.db
}