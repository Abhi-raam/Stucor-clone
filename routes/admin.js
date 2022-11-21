var db = require("../config/connection");
var express = require("express");
var cseHelper = require('../helpers/cse-helpers')
var civilHelper = require('../helpers/civil-helpers')
var eceHelper = require('../helpers/ece-helpers')
var fs = require('fs')
const { Cse13_Sem02, Cse13_Sem01, CseSem01 } = require("../config/collections");
// const { getAllCseSem_01, getAllCseSem_02 } = require("../helpers/news-helpers");
var router = express.Router();
var helpers = require("../helpers/news-helpers");
const { response } = require("express");
const { question } = require("readline-sync");
const { fstat } = require("fs");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("admin/admin-index", { admin: true });
});

router.get("/view-news", (req, res, next) => {
  helpers.getAllNews().then((news) => {
    // console.log(news);
    res.render("admin/view-news", { admin: true, news });
  });
});

router.post('/edit-news/:id/:code',(req,res)=>{
  // console.log(req.params.code);
  code = req.params.code
  
  fs.unlink('./public/news/'+code+'.pdf',()=>{})
  helpers.updateNews(req.params.id,req.body).then(()=>{
    res.redirect('/admin/view-news')
    if(req.files.NEWS_FILE){
      let file = req.files.NEWS_FILE
      file.mv('./public/news/'+req.body.NEWS_CODE+'.pdf')

    }
  })
})

router.get('/edit-news/:id',async(req,res)=>{
  let news = await helpers.getNewsDetails(req.params.id)
  console.log(news);
  res.render('admin/edit-news',{admin:true,news})
})

router.get("/add-news", (req, res, next) => {
  res.render("admin/add-news", { admin: true });
});

router.post("/add-news", (req, res, next) => {
  helpers.addNews(req.body, (newsCode) => {
    let file = req.files.NEWS_FILE
    // console.log(req.body.NEWS_CODE);
    // let description = req.body.NEWS_DESCRIPTION
    // console.log(description);
    file.mv('./public/news/'+newsCode+'.pdf',(err,data)=>{
      if(!err){
        res.render("admin/add-news", { admin: true });
      }
      else{
        console.log(err);
      }
    })
  });
});

router.get("/delete-news/:id/:code", (req, res) => {
  let newsId = req.params.id;
  let newsCode = req.params.code
  helpers.deleteNews(newsId).then((response) => {
    fs.unlink('./public/news/'+newsCode+'.pdf',()=>{
      console.log('Deleted file is : '+newsCode+'.pdf');
    })
    res.redirect("/admin/view-news");
  });
});

router.get("/view-regulation", (req, res, next) => {
  helpers.getAllRegulation().then((regulation) => {
    // console.log(regulation);
    res.render("admin/regulation/view-regulation", { admin: true, regulation });
  });
});

router.get("/add-regulation", (req, res, next) => {
  res.render("admin/regulation/add-regulation", { admin: true });
});

router.post("/add-regulation", (req, res, next) => {
  // console.log(req.body);
  helpers.addRegulation(req.body, (result) => {
    res.render("admin/regulation/add-regulation", { admin: true });
  });
});

router.get("/delete-regulations/:id", (req, res) => {
  let RegId = req.params.id;
  helpers.deleteRegulation(RegId).then((response) => {
    res.redirect("/admin/view-regulation");
  });
});

router.get("/reg-13-notes", (req, res) => {
  res.render("admin/notes/reg-13/reg-13-notes", { admin: true });
});

router.get("/reg-17-notes", (req, res) => {
  res.render("admin/notes/reg-17/reg-17-notes", { admin: true });
});

//                          <------------CSE------------>
//<----cse sem 01---->
router.get("/cse/sem-01", (req, res, next) => {
  cseHelper.viewCseSem01().then((csesem01) => {
    res.render("admin/notes/reg-13/cse/sem-01/sem-01-notes",{admin: true,csesem01});
  });
});

router.get("/cse/add/sem-01-notes", (req, res) => {
  res.render("admin/notes/reg-13/cse/sem-01/add-sem-01-cse", { admin: true });
});

router.post("/cse/add/sem-01-notes", (req, res) => {
  // console.log(req.body)
  cseHelper.addCseSem01(req.body, (code) => {
    let notes = req.files.Notes;
    let question = req.files.Questions;
    notes.mv('./public/notes/reg-13/cse/sem01/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/cse/sem-01/add-sem-01-cse", { admin: true });
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/cse/sem01/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/cse/sem-01/add-sem-01-cse", { admin: true });
      }
      else{
        console.log(err);
      }
    })
  });
});
//  delete sem01 notes
router.get("/delete-cse-sem01/:id/:subcode", (req, res) => {
  let semId = req.params.id;
  let subCode = req.params.subcode
  cseHelper.deleteCseSem01(semId).then((response) => {
    fs.unlink('./public/notes/reg-13/cse/sem01/'+subCode+'-note.pdf',()=>{
      console.log('Deleted file : '+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/cse/sem01/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file : '+subCode+'-qp.pdf');
    })
    res.redirect("/admin/cse/sem-01");
  });
});

//<----cse sem 02---->
router.get("/cse/sem-02", (req, res) => {
  //view cse sem02 notes
  cseHelper.viewCseSem02().then((csesem02) => {
    res.render("admin/notes/reg-13/cse/sem-02/sem-02-notes", {
      admin: true,
      csesem02,
    });
  });
});

router.get("/cse/add/sem-02-notes", (req, res) => {
  res.render("admin/notes/reg-13/cse/sem-02/add-sem-02-cse", { admin: true });
});

router.post("/cse/add/sem-02-notes", (req, res) => {
  //add cse sem02 notes
  // console.log(req.body);
  cseHelper.addCseSem02(req.body, (code) => {
    let notes = req.files.Notes
    let question = req.files.Questions
    notes.mv('./public/notes/reg-13/cse/sem02/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/cse/sem-02/add-sem-02-cse",{admin: true,})
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/cse/sem02/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/cse/sem-02/add-sem-02-cse",{admin: true,})
      }
      else{
        console.log(err);
      }
    })
  });
});

// delete sem02 notes
router.get("/delete-cse-sem02/:id/:subcode", (req, res) => {
  let semId = req.params.id;
  let subCode = req.params.subcode
  cseHelper.deleteCseSem02(semId).then((response) => {
    fs.unlink('./public/notes/reg-13/cse/sem02/'+subCode+'-note.pdf',()=>{
      console.log('Deleted file :'+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/cse/sem02/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file :'+subCode+'-qp.pdf');
    })
    res.redirect("/admin/cse/sem-02");
  });
});

//<-----------cse sem 03--------->
router.get("/cse/sem-03", (req, res) => {
  //view notes
  cseHelper.viewCseSem03().then((csesem03) => {
    res.render("admin/notes/reg-13/cse/sem-03/sem-03-notes", {
      admin: true,
      csesem03,
    });
  });
});

router.get("/cse/add/sem-03-notes", (req, res) => {
  res.render("admin/notes/reg-13/cse/sem-03/add-sem-03-cse", { admin: true });
});

router.post("/cse/add/sem-03-notes", (req, res) => {
  cseHelper.addCseSem03(req.body, (code) => {
    let note = req.files.Notes
    let question = req.files.Questions
    note.mv('./public/notes/reg-13/cse/sem03/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/cse/sem-03/add-sem-03-cse", { admin: true });
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/cse/sem03/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/cse/sem-03/add-sem-03-cse", { admin: true });
      }
      else{
        console.log(err);
      }
    })
  });
});
//delete cse sem03
router.get("/delete-cse-sem03/:id/:subcode", (req, res) => {
  let semId = req.params.id;
  let subCode = req.params.subcode
  cseHelper.deleteCseSem03(semId).then((response) => {
    fs.unlink('./public/notes/reg-13/cse/sem03/'+subCode+'-note.pdf',()=>{
      console.log("Deleted file : "+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/cse/sem03/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file is : '+subCode+'-qp.pdf');
    })
    res.redirect("/admin/cse/sem-03");
  });
});

// <-------cse sem 04------->
router.get("/cse/sem-04", (req, res) => {
  //view notes
  cseHelper.viewCseSem04().then((csesem04)=>{
    res.render("admin/notes/reg-13/cse/sem-04/sem-04-notes",{admin : true,csesem04});
  })
})

router.get('/cse/add/sem-04-notes',(req,res)=>{
  res.render('admin/notes/reg-13/cse/sem-04/add-sem-04-cse',{admin:true})
})

router.post('/cse/add/sem-04-notes',(req,res)=>{
  cseHelper.addCseSem04(req.body,(code)=>{
    let note = req.files.Notes
    let question = req.files.Questions
    note.mv('./public/notes/reg-13/cse/sem04/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/cse/sem-04/add-sem-04-cse", { admin: true });
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/cse/sem04/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/cse/sem-04/add-sem-04-cse", { admin: true });
      }
      else{
        console.log(err);
      }
    }) 
  })
})

router.get('/delete-cse-sem04/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  cseHelper.deleteCseSem04(semId).then((response) => {
    fs.unlink('./public/notes/reg-13/cse/sem04/'+subCode+'-note.pdf',()=>{
      console.log("Deleted file : "+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/cse/sem04/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file is : '+subCode+'-qp.pdf');
    })
    res.redirect("/admin/cse/sem-04");
  });
});

// <----------cse sem 05---------->
router.get('/cse/sem-05',(req,res)=>{
  cseHelper.viewCseSem05().then((csesem05)=>{
    res.render('admin/notes/reg-13/cse/sem-05/sem-05-notes',{admin : true,csesem05})
  })
})

router.get('/cse/add/sem-05-notes',(req,res)=>{
  res.render('admin/notes/reg-13/cse/sem-05/add-sem-05-cse',{admin:true})
})

router.post('/cse/add/sem-05-notes',(req,res)=>{
  cseHelper.addCseSem05(req.body,(code)=>{
    let note = req.files.Notes
    let question = req.files.Questions
    note.mv('./public/notes/reg-13/cse/sem05/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render('admin/notes/reg-13/cse/sem-05/add-sem-05-cse',{admin:true})

      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/cse/sem05/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render('admin/notes/reg-13/cse/sem-05/add-sem-05-cse',{admin : true})
      }
      else{
        console.log(err);
      }
    })
  })
})

router.get('/delete-cse-sem05/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  cseHelper.deleteCseSem05(semId).then((response)=>{
    fs.unlink('./public/notes/reg-13/cse/sem05/'+subCode+'-note.pdf',()=>{
      console.log("Deleted file : "+subCode+'-note.pdf');

    })
    fs.unlink('./public/notes/reg-13/cse/sem05/'+subCode+'-qp.pdf',()=>{
      console.log("Deleted file : "+subCode+'-qp.pdf');
    })
    res.redirect('/admin/cse/sem-05')
  })
})

// <----------cse sem 06---------->
router.get('/cse/sem-06',(req,res)=>{
  cseHelper.viewCseSem06().then((csesem06)=>{
    res.render('admin/notes/reg-13/cse/sem-06/sem-06-notes',{admin : true,csesem06})
  })
})

router.get('/cse/add/sem-06-notes',(req,res)=>{
  res.render('admin/notes/reg-13/cse/sem-06/add-sem-06-cse',{admin:true})
})

router.post('/cse/add/sem-06-notes',(req,res)=>{
  cseHelper.addCseSem06(req.body,(code)=>{
    let note = req.files.Notes
    let question = req.files.Questions
    note.mv('./public/notes/reg-13/cse/sem06/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render('admin/notes/reg-13/cse/sem-06/add-sem-06-cse',{admin: true})
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/cse/sem06/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render('admin/notes/reg-13/cse/sem-06/add-sem-06-cse',{admin: true})
      }
      else{
        console.log(err);
      }
    })
  })
})

router.get('/delete-cse-sem06/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  cseHelper.deleteCseSem06(semId).then((response)=>{
    fs.unlink('./public/notes/reg-13/cse/sem06/'+subCode+'-note.pdf',()=>{
      console.log("Deleted file : "+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/cse/sem06/'+subCode+'-qp.pdf',()=>{
      console.log("Deleted file : "+subCode+'-qp.pdf');
    })
    res.redirect('/admin/cse/sem-06')
  })
})
// <----------cse sem 07---------->
router.get('/cse/sem-07',(req,res)=>{
  cseHelper.viewCseSem07().then((csesem07)=>{
    res.render('admin/notes/reg-13/cse/sem-07/sem-07-notes',{admin : true,csesem07})
  })
})

router.get('/cse/add/sem-07-notes',(req,res)=>{
  res.render('admin/notes/reg-13/cse/sem-07/add-sem-07-cse',{admin:true})
})

router.post('/cse/add/sem-07-notes',(req,res)=>{
  cseHelper.addCseSem07(req.body,(code)=>{
    let note = req.files.Notes
    let question = req.files.Questions
    note.mv('./public/notes/reg-13/cse/sem07/'+code+'-note.pdf',(err,data)=>{
      if(!err){
        res.render('admin/notes/reg-13/cse/sem-07/add-sem-07-cse',{admin :true})
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/cse/sem07/'+code+'-qp.pdf',(err,data)=>{
      if(!err){
        res.render('admin/notes/reg-13/cse/sem-07/add-sem-07-cse',{admin :true})
      }
      else{
        console.log(err);
      }
    })
  })
})
router.get('/delete-cse-sem07/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  cseHelper.deleteCseSem07(semId).then((response)=>{
    fs.unlink('./public/notes/reg-13/cse/sem07/'+subCode+'-note.pdf',()=>{
      console.log("Deleted file : "+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/cse/sem07/'+subCode+'-qp.pdf',()=>{
      console.log("Deleted file : "+subCode+'-qp.pdf');
    })
    res.redirect('/admin/cse/sem-07')
  })
})


// <----------cse sem 08---------->
router.get('/cse/sem-08',(req,res)=>{
  cseHelper.viewCseSem08().then((csesem08)=>{
    res.render('admin/notes/reg-13/cse/sem-08/sem-08-notes',{admin : true,csesem08})
  })
})

router.get('/cse/add/sem-08-notes',(req,res)=>{
  res.render('admin/notes/reg-13/cse/sem-08/add-sem-08-cse',{admin:true})
})

router.post('/cse/add/sem-08-notes',(req,res)=>{
  cseHelper.addCsesem08(req.body,(code)=>{
    let note = req.files.Notes
    let question = req.files.Questions
    note.mv('./public/notes/reg-13/cse/sem08/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render('admin/notes/reg-13/cse/sem-08/add-sem-08-cse',{admin: true})
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/cse/sem08/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render('admin/notes/reg-13/cse/sem-08/add-sem-08-cse',{admin: true})
      }
      else{
        console.log(err);
      }
    })
  })
})
router.get('/delete-cse-sem08/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  cseHelper.deleteCseSem08(semId).then((response)=>{
    fs.unlink('./public/notes/reg-13/cse/sem08/'+subCode+'-note.pdf',()=>{
      console.log("Deleted file : "+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/cse/sem08/'+subCode+'-qp.pdf',()=>{
      console.log("Deleted file : "+subCode+'-qp.pdf');
    })
    res.redirect('/admin/cse/sem-08')
  })
})

//               <----------CIVIL---------->
// <----------civil sem 01---------->
router.get('/civil/sem-01',(req,res)=>{
  civilHelper.viewCivilSem01().then((civilsem01)=>{
    res.render('admin/notes/reg-13/civil/sem-01/sem-01-notes',{admin : true,civilsem01})
  })
})

router.get('/civil/add/sem-01-notes',(req,res)=>{
  res.render('admin/notes/reg-13/civil/sem-01/add-sem-01-civil',{admin:true})
})

router.post('/civil/add/sem-01-notes',(req,res)=>{
  civilHelper.addCivilSem01(req.body,(code)=>{
    let notes = req.files.Notes;
    let question = req.files.Questions;
    notes.mv('./public/notes/reg-13/civil/sem01/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-01/add-sem-01-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/civil/sem01/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-01/add-sem-01-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
  })
})

router.get('/delete-civil-sem01/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  civilHelper.deleteCivilSem01(semId).then((response)=>{
    fs.unlink('./public/notes/reg-13/civil/sem01/'+subCode+'-note.pdf',()=>{
      console.log('Deleted file : '+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/civil/sem01/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file : '+subCode+'-qp.pdf');
    })
    res.redirect("/admin/civil/sem-01");
  })
})


// <----------civil sem 02---------->
router.get('/civil/sem-02',(req,res)=>{
  civilHelper.viewCivilSem02().then((civilsem02)=>{
    res.render('admin/notes/reg-13/civil/sem-02/sem-02-notes',{admin : true,civilsem02})
  })
})

router.get('/civil/add/sem-02-notes',(req,res)=>{
  res.render('admin/notes/reg-13/civil/sem-02/add-sem-02-civil',{admin:true})
})

router.post('/civil/add/sem-02-notes',(req,res)=>{
  civilHelper.addCivilSem02(req.body,(code)=>{
    let notes = req.files.Notes;
    let question = req.files.Questions;
    notes.mv('./public/notes/reg-13/civil/sem02/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-02/add-sem-02-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/civil/sem02/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-02/add-sem-02-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
  })
})
router.get('/delete-civil-sem02/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  civilHelper.deleteCivilSem02(semId).then((response)=>{
    fs.unlink('./public/notes/reg-13/civil/sem02/'+subCode+'-note.pdf',()=>{
      console.log('Deleted file : '+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/civil/sem02/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file : '+subCode+'-qp.pdf');
    })
    res.redirect("/admin/civil/sem-02");
  })
})

// <----------civil sem 03---------->
router.get('/civil/sem-03',(req,res)=>{
  civilHelper.viewCivilSem03().then((civilsem03)=>{
    res.render('admin/notes/reg-13/civil/sem-03/sem-03-notes',{admin : true,civilsem03})
  })
})

router.get('/civil/add/sem-03-notes',(req,res)=>{
  res.render('admin/notes/reg-13/civil/sem-03/add-sem-03-civil',{admin:true})
})

router.post('/civil/add/sem-03-notes',(req,res)=>{
  civilHelper.addCivilSem03(req.body).then((code)=>{
    let notes = req.files.Notes;
    let question = req.files.Questions;
    
    notes.mv('./public/notes/reg-13/civil/sem03/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-03/add-sem-03-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/civil/sem03/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-03/add-sem-03-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
  })
})

router.get('/delete-civil-sem03/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  civilHelper.deleteCivilSem03(semId).then((response)=>{
    fs.unlink('./public/notes/reg-13/civil/sem03/'+subCode+'-note.pdf',()=>{
      console.log('Deleted file : '+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/civil/sem03/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file : '+subCode+'-qp.pdf');
    })
    res.redirect("/admin/civil/sem-03");
  })
})

// <----------civil sem 04---------->
router.get('/civil/sem-04',(req,res)=>{
  civilHelper.viewCivilSem04().then((civilsem04)=>{
    res.render('admin/notes/reg-13/civil/sem-04/sem-04-notes',{admin : true,civilsem04})
  })
})

router.get('/civil/add/sem-04-notes',(req,res)=>{
  res.render('admin/notes/reg-13/civil/sem-04/add-sem-04-civil',{admin:true})
})
router.post('/civil/add/sem-04-notes',(req,res)=>{
  civilHelper.addCivilSem04(req.body).then((code)=>{
    let notes = req.files.Notes;
    let question = req.files.Questions;
    notes.mv('./public/notes/reg-13/civil/sem04/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-04/add-sem-04-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/civil/sem04/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-04/add-sem-04-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
  })
})
router.get('/delete-civil-sem04/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  civilHelper.deleteCivilSem04(semId).then((response)=>{
    console.log('this is the response ====>'+response);
    fs.unlink('./public/notes/reg-13/civil/sem04/'+subCode+'-note.pdf',()=>{
      console.log('Deleted file : '+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/civil/sem04/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file : '+subCode+'-qp.pdf');
    })
    res.redirect("/admin/civil/sem-04");
  })
})

// <----------civil sem 05---------->
router.get('/civil/sem-05',(req,res)=>{
  civilHelper.viewCivilSem05().then((civilsem05)=>{
    res.render('admin/notes/reg-13/civil/sem-05/sem-05-notes',{admin : true,civilsem05})
  })
})

router.get('/civil/add/sem-05-notes',(req,res)=>{
  res.render('admin/notes/reg-13/civil/sem-05/add-sem-05-civil',{admin:true})
})
router.post('/civil/add/sem-05-notes',(req,res)=>{
  civilHelper.addCivilSem05(req.body,(code)=>{
    let notes = req.files.Notes;
    let question = req.files.Questions;
    notes.mv('./public/notes/reg-13/civil/sem05/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-05/add-sem-05-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/civil/sem05/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-05/add-sem-05-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
  })
})
router.get('/delete-civil-sem05/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  civilHelper.deleteCivilSem05(semId,(response)=>{
    fs.unlink('./public/notes/reg-13/civil/sem05/'+subCode+'-note.pdf',()=>{
      console.log('Deleted file : '+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/civil/sem05/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file : '+subCode+'-qp.pdf');
    })
    res.redirect("/admin/civil/sem-05");
  })
})

// <----------civil sem 06---------->
router.get('/civil/sem-06',(req,res)=>{
  civilHelper.viewCivilSem06().then((civilsem06)=>{
    res.render('admin/notes/reg-13/civil/sem-06/sem-06-notes',{admin : true,civilsem06})
  })
})

router.get('/civil/add/sem-06-notes',(req,res)=>{
  res.render('admin/notes/reg-13/civil/sem-06/add-sem-06-civil',{admin:true})
})
router.post('/civil/add/sem-06-notes',(req,res)=>{
  civilHelper.addCivilSem06(req.body,(code)=>{
    let notes = req.files.Notes;
    let question = req.files.Questions;
    notes.mv('./public/notes/reg-13/civil/sem06/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-06/add-sem-06-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/civil/sem06/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-06/add-sem-06-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
  })
})
router.get('/delete-civil-sem06/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  civilHelper.deleteCivilSem06(semId,(response)=>{
    fs.unlink('./public/notes/reg-13/civil/sem06/'+subCode+'-note.pdf',()=>{
      console.log('Deleted file : '+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/civil/sem06/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file : '+subCode+'-qp.pdf');
    })
    res.redirect("/admin/civil/sem-06");
  })
})
// <----------civil sem 07---------->
router.get('/civil/sem-07',(req,res)=>{
  civilHelper.viewCivilSem07().then((civilsem07)=>{
    res.render('admin/notes/reg-13/civil/sem-07/sem-07-notes',{admin : true,civilsem07})
  })
})

router.get('/civil/add/sem-07-notes',(req,res)=>{
  res.render('admin/notes/reg-13/civil/sem-07/add-sem-07-civil',{admin:true})
})

router.post('/civil/add/sem-07-notes',(req,res)=>{
  civilHelper.addCivilSem07(req.body).then((code)=>{
    let notes = req.files.Notes;
    let question = req.files.Questions;
    notes.mv('./public/notes/reg-13/civil/sem07/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-07/add-sem-07-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/civil/sem07/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-07/add-sem-07-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    }) 
   })
})
router.get('/delete-civil-sem07/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  civilHelper.deleteCivilSem07(semId).then((response)=>{
    fs.unlink('./public/notes/reg-13/civil/sem07/'+subCode+'-note.pdf',()=>{
      console.log('Deleted file : '+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/civil/sem07/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file : '+subCode+'-qp.pdf');
    })
    res.redirect("/admin/civil/sem-07");
  })
})

// <----------civil sem 08---------->
router.get('/civil/sem-08',(req,res)=>{
  civilHelper.viewCivilSem08((civilsem08)=>{
    res.render('admin/notes/reg-13/civil/sem-08/sem-08-notes',{admin : true,civilsem08})
  })
})

router.get('/civil/add/sem-08-notes',(req,res)=>{
  res.render('admin/notes/reg-13/civil/sem-08/add-sem-08-civil',{admin:true})
})
router.post('/civil/add/sem-08-notes',(req,res)=>{
  civilHelper.addCivilSem08(req.body,(code)=>{
    let notes = req.files.Notes;
    let question = req.files.Questions;
    notes.mv('./public/notes/reg-13/civil/sem08/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-08/add-sem-08-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/civil/sem08/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render("admin/notes/reg-13/civil/sem-08/add-sem-08-civil", { admin: true });
      }
      else{
        console.log(err);
      }
    })
  })
})
router.get('/delete-civil-sem08/:id/:subcode',(req,res)=>{
  let semId = req.params.id
  let subCode = req.params.subcode
  civilHelper.deleteCivilSem08(semId,(response)=>{
    fs.unlink('./public/notes/reg-13/civil/sem08/'+subCode+'-note.pdf',()=>{
      console.log('Deleted file : '+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/civil/sem08/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file : '+subCode+'-qp.pdf');
    })
    res.redirect("/admin/civil/sem-08");
  })
})

//               <----------ECE---------->
// <----------ece sem 01---------->
router.get('/ece/sem-01',(req,res)=>{
  eceHelper.viewEceSem01((ecesem01)=>{
    res.render('admin/notes/reg-13/ece/sem-01/sem-01-notes',{admin : true,ecesem01})
  })
})

router.get('/ece/add/sem-01-notes',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-01/add-sem-01-ece',{admin:true})
})
router.post('/ece/add/sem-01-notes',(req,res)=>{
  eceHelper.addEceSem01(req.body,(code)=>{
    let notes = req.files.Notes;
    let question = req.files.Questions;
    notes.mv('./public/notes/reg-13/ece/sem01/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render('admin/notes/reg-13/ece/sem-01/add-sem-01-ece',{admin:true})
      }else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/ece/sem01/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render('admin/notes/reg-13/ece/sem-01/add-sem-01-ece',{admin:true})
      }else{
        console.log(err);
      }
    })
  })
})
router.get("/delete-ece-sem01/:id/:subcode", (req, res) => {
  let semId = req.params.id;
  let subCode = req.params.subcode
  eceHelper.deleteEceSem01(semId,(response)=>{
    fs.unlink('./public/notes/reg-13/ece/sem01/'+subCode+'-note.pdf',()=>{
      console.log('Deleted file : '+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/ece/sem01/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file : '+subCode+'-qp.pdf');
    })
    res.redirect('/admin/ece/sem-01')
  })
});

// <----------ece sem 02---------->
router.get('/ece/sem-02',(req,res)=>{
  eceHelper.viewEceSem02().then((ecesem02)=>{
    res.render('admin/notes/reg-13/ece/sem-02/sem-02-notes',{admin : true,ecesem02})
  })
})

router.get('/ece/add/sem-02-notes',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-02/add-sem-02-ece',{admin:true})
})

router.post('/ece/add/sem-02-notes',(req,res)=>{
  eceHelper.addEceSem02(req.body).then((code)=>{
    let notes = req.files.Notes;
    let question = req.files.Questions;
    notes.mv('./public/notes/reg-13/ece/sem02/'+code+'-note.pdf',(err,done)=>{
      if(!err){
        res.render('admin/notes/reg-13/ece/sem-02/add-sem-02-ece',{admin:true})
      }else{
        console.log(err);
      }
    })
    question.mv('./public/notes/reg-13/ece/sem02/'+code+'-qp.pdf',(err,done)=>{
      if(!err){
        res.render('admin/notes/reg-13/ece/sem-02/add-sem-02-ece',{admin:true})
      }else{
        console.log(err);
      }
    })
  })
})
router.get("/delete-ece-sem02/:id/:subcode", (req, res) => {
  let semId = req.params.id;
  let subCode = req.params.subcode
  eceHelper.deleteEceSem02(semId).then((response)=>{
    fs.unlink('./public/notes/reg-13/ece/sem02/'+subCode+'-note.pdf',()=>{
      console.log('Deleted file : '+subCode+'-note.pdf');
    })
    fs.unlink('./public/notes/reg-13/ece/sem02/'+subCode+'-qp.pdf',()=>{
      console.log('Deleted file : '+subCode+'-qp.pdf');
    })
    res.redirect('/admin/ece/sem-02')
  })
})


// <----------ece sem 03---------->
router.get('/ece/sem-03',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-03/sem-03-notes',{admin : true})
})

router.get('/ece/add/sem-03-notes',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-03/add-sem-03-ece',{admin:true})
})

// <----------civil sem 04---------->
router.get('/ece/sem-04',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-04/sem-04-notes',{admin : true})
})

router.get('/ece/add/sem-04-notes',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-04/add-sem-04-ece',{admin:true})
})

// <----------ece sem 05---------->
router.get('/ece/sem-05',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-05/sem-05-notes',{admin : true})
})

router.get('/ece/add/sem-05-notes',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-05/add-sem-05-ece',{admin:true})
})

// <----------ece sem 06---------->
router.get('/ece/sem-06',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-06/sem-06-notes',{admin : true})
})

router.get('/ece/add/sem-06-notes',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-06/add-sem-06-ece',{admin:true})
})

// <----------ece sem 07---------->
router.get('/ece/sem-07',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-07/sem-07-notes',{admin : true})
})

router.get('/ece/add/sem-07-notes',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-07/add-sem-07-ece',{admin:true})
})

// <----------ece sem 08---------->
router.get('/ece/sem-08',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-08/sem-08-notes',{admin : true})
})

router.get('/ece/add/sem-08-notes',(req,res)=>{
  res.render('admin/notes/reg-13/ece/sem-08/add-sem-08-ece',{admin:true})
})


//               <----------MECH---------->
// <----------mech sem 01---------->
router.get('/mech/sem-01',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-01/sem-01-notes',{admin : true})
})

router.get('/mech/add/sem-01-notes',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-01/add-sem-01-mech',{admin:true})
})

// <----------civil sem 02---------->
router.get('/mech/sem-02',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-02/sem-02-notes',{admin : true})
})

router.get('/mech/add/sem-02-notes',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-02/add-sem-02-mech',{admin:true})
})

// <----------mech sem 03---------->
router.get('/mech/sem-03',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-03/sem-03-notes',{admin : true})
})

router.get('/mech/add/sem-03-notes',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-03/add-sem-03-mech',{admin:true})
})

// <----------mech sem 04---------->
router.get('/mech/sem-04',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-04/sem-04-notes',{admin : true})
})

router.get('/mech/add/sem-04-notes',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-04/add-sem-04-mech',{admin:true})
})

// <----------mech sem 05---------->
router.get('/mech/sem-05',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-05/sem-05-notes',{admin : true})
})

router.get('/mech/add/sem-05-notes',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-05/add-sem-05-mech',{admin:true})
})

// <----------mech sem 06---------->
router.get('/mech/sem-06',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-06/sem-06-notes',{admin : true})
})

router.get('/mech/add/sem-06-notes',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-06/add-sem-06-mech',{admin:true})
})

// <----------mech sem 07---------->
router.get('/mech/sem-07',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-07/sem-07-notes',{admin : true})
})

router.get('/mech/add/sem-07-notes',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-07/add-sem-07-civil',{admin:true})
})

// <----------mech sem 08---------->
router.get('/mech/sem-08',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-08/sem-08-notes',{admin : true})
})

router.get('/mech/add/sem-08-notes',(req,res)=>{
  res.render('admin/notes/reg-13/mech/sem-08/add-sem-08-mech',{admin:true})
})



module.exports = router;
