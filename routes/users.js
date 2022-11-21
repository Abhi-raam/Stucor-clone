var express = require('express');
var router = express.Router();
var helpers = require('../helpers/news-helpers')
var cseHelper = require('../helpers/cse-helpers')
var civilHelper = require('../helpers/civil-helpers');
var eceHelper = require('../helpers/ece-helpers')
const { CivilSem01 } = require('../config/collections');

/* GET users listing. */
router.get('/', function (req, res, next) {
  let category = [
    {
      cat_name: "AU-NEWS",
      cat_img: "stucor-au_news.png",
      cat_page: "/au-news"
    },
    {
      cat_name: "NOTES/QP",
      cat_img: "stucor-notes.png",
      cat_page: "/choose_regulation"
    },
    {
      cat_name: "RESULTS",
      cat_img: "stucor-result.png",
      cat_page: "/result"
    },
  ]

  
  helpers.getAllNews().then((news) => {
    console.log(news);
    res.render('user/user-index', { category, news });
  })
});

router.get('/au-news/:name/:newsDescription/:code',(req,res)=>{
  newsName = req.params.name
  newsDescription = req.params.newsDescription
  newsCode = req.params.code
  console.log(newsDescription);
  console.log(newsName);
  helpers.getAllNews().then((news)=>{
    res.render('user/AU-news/au-news-details',{newsName,newsDescription,newsCode,news})
  })
})
router.get('/au-news', (req, res, next) => {
  helpers.getAllNews().then((news) => {
    // console.log(news);
    res.render('user/au-news', { news })
  })

})


router.get('/choose_regulation', (req, res, next) => {
  helpers.getAllRegulation().then((regulation)=>{
    //console.log(regulation);
    res.render('user/choose_regulation', { regulation })  })
})



router.get('/regulation_13',(req,res)=>{
  res.render('user/regulations/reg-2013',{})
})
router.get('/regulation_13/choose_sem_cse',(req,res)=>{
  res.render('user/regulations/regulation-13/cse/choose-cse-sem',{})
})


router.get('/reg_13/cse_sem01',(req,res)=>{
  cseHelper.viewCseSem01().then((csesem01)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem01',{csesem01})
  })  
})
router.get('/reg_13/cse-sem01notes/:code/:name',(req,res)=>{ 
  subCode = req.params.code
  subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem01notes',{subCode,subName,news})
  })
})

router.get('/reg_13/cse_sem02',(req,res)=>{
  cseHelper.viewCseSem02().then((csesem02)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem02',{csesem02})
  })
})
router.get('/reg_13/cse-sem02notes/:code/:name',(req,res)=>{
  subCode = req.params.code
  subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem02notes',{subCode,subName,news})
  })
})


router.get('/reg_13/cse_sem03',(req,res)=>{
  cseHelper.viewCseSem03().then((csesem03)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem03',{csesem03})
  })
})
router.get('/reg_13/cse-sem03notes/:code/:name',(req,res)=>{
  subCode = req.params.code
  subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem03notes',{subCode,subName,news})
  })
})

router.get('/reg_13/cse_sem04',(req,res)=>{
  cseHelper.viewCseSem04().then((csesem04)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem04',{csesem04})
  })
})
router.get('/reg_13/cse-sem04notes/:code/:name',(req,res)=>{
  subCode = req.params.code
  subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem04notes',{subCode,subName,news})
  })
})
router.get('/reg_13/cse_sem05',(req,res)=>{
  cseHelper.viewCseSem05().then((csesem05)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem05',{csesem05})
  })
})
router.get('/reg_13/cse-sem05notes/:code/:name',(req,res)=>{
  subCode = req.params.code
  subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem05notes',{subCode,subName,news})
  })
})
router.get('/reg_13/cse_sem06',(req,res)=>{
  cseHelper.viewCseSem06().then((csesem06)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem06',{csesem06})
  })
})

router.get('/reg_13/cse-sem06notes/:code/:name',(req,res)=>{
  subCode = req.params.code
  subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem06notes',{subCode,subName,news})

  })
})

router.get('/reg_13/cse_sem07',(req,res)=>{
  cseHelper.viewCseSem07().then((csesem07)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem07',{csesem07})
  })
})
router.get('/reg_13/cse-sem07notes/:code/:name',(req,res)=>{
  subCode = req.params.code
  subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem07notes',{subCode,subName,news})

  })
})

router.get('/reg_13/cse_sem08',(req,res)=>{
  cseHelper.viewCseSem08().then((csesem08)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem08',{csesem08})
  })
})
router.get('/reg_13/cse-sem08notes/:code/:name',(req,res)=>{
  subCode = req.params.code
  subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/cse/cse-sem08notes',{subCode,subName,news})

  })
})



// CIVIL NOTES
router.get('/regulation_13/choose_sem_civil',(req,res)=>{
  res.render('user/regulations/regulation-13/civil/choose-civil-sem',{})
})

router.get('/reg_13/civil_sem01',(req,res)=>{
  civilHelper.viewCivilSem01().then((civilsem01)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem01',{civilsem01})
  })
})
router.get('/reg_13/civil-sem01notes/:code/:name',(req,res)=>{ 
  subCode = req.params.code
  subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem01notes',{subCode,subName,news})
  })
})

router.get('/reg_13/civil_sem02',(req,res)=>{
  civilHelper.viewCivilSem02().then((civilsem02)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem02',{civilsem02})
  })
})
router.get('/reg_13/civil-sem02notes/:code/:name',(req,res)=>{
  let subCode = req.params.code
  let subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem02notes',{subCode,subName,news})
  })
})

router.get('/reg_13/civil_sem03',(req,res)=>{
  civilHelper.viewCivilSem03().then((civilsem03)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem03',{civilsem03})
  })
})
router.get('/reg_13/civil-sem03notes/:code/:name',(req,res)=>{
  let subCode = req.params.code
  let subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem03notes',{subCode,subName,news})
  })
})


router.get('/reg_13/civil_sem04',(req,res)=>{
  civilHelper.viewCivilSem04().then((civilsem04)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem04',{civilsem04})
  })
})
router.get('/reg_13/civil-sem04notes/:code/:name',(req,res)=>{
  let subCode = req.params.code
  let subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem04notes',{subCode,subName,news})
  })
})

router.get('/reg_13/civil_sem05',(req,res)=>{
  civilHelper.viewCivilSem05().then((civilsem05)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem05',{civilsem05})
  })
})
router.get('/reg_13/civil-sem05notes/:code/:name',(req,res)=>{
  let subCode = req.params.code
  let subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem05notes',{subCode,subName,news})
  })
})

router.get('/reg_13/civil_sem06',(req,res)=>{
  civilHelper.viewCivilSem06().then((civilsem06)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem06',{civilsem06})
  })
})
router.get('/reg_13/civil-sem06notes/:code/:name',(req,res)=>{
  let subCode = req.params.code
  let subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem06notes',{subCode,subName,news})
  })
})

router.get('/reg_13/civil_sem07',(req,res)=>{
  civilHelper.viewCivilSem07().then((civilsem07)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem07',{civilsem07})
  })
})
router.get('/reg_13/civil-sem07notes/:code/:name',(req,res)=>{
  let subCode = req.params.code
  let subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem07notes',{subCode,subName,news})
  })
})

router.get('/reg_13/civil_sem08',(req,res)=>{
  civilHelper.viewCivilSem08((civilsem08)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem08',{civilsem08})
  })
})
router.get('/reg_13/civil-sem08notes/:code/:name',(req,res)=>{
  let subCode = req.params.code
  let subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/civil/civil-sem08notes',{subCode,subName,news})
  })
})



// ECE NOTES
router.get('/regulation_13/choose_sem_ece',(req,res)=>{
  res.render('user/regulations/regulation-13/ece/choose-ece-sem',{})
})
router.get('/reg_13/ece_sem01',(req,res)=>{
  eceHelper.viewEceSem01((ecesem01)=>{
    res.render('user/regulations/regulation-13/ece/ece-sem01',{ecesem01})
  })
})
router.get('/reg_13/ece-sem01notes/:code/:name',(req,res)=>{ 
  subCode = req.params.code
  subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/ece/ece-sem01notes',{subCode,subName,news})
  })
})


router.get('/reg_13/ece_sem02',(req,res)=>{
  eceHelper.viewEceSem02().then((ecesem02)=>{
    res.render('user/regulations/regulation-13/ece/ece-sem02',{ecesem02})
  })
})
router.get('/reg_13/ece-sem02notes/:code/:name',(req,res)=>{ 
  subCode = req.params.code
  subName = req.params.name
  helpers.getAllNews().then((news)=>{
    res.render('user/regulations/regulation-13/ece/ece-sem02notes',{subCode,subName,news})
  })
})

router.get('/reg_13/ece_sem03',(req,res)=>{
  res.render('user/regulations/regulation-13/ece/ece-sem03',{})
})
router.get('/reg_13/ece_sem04',(req,res)=>{
  res.render('user/regulations/regulation-13/ece/ece-sem04',{})
})
router.get('/reg_13/ece_sem05',(req,res)=>{
  res.render('user/regulations/regulation-13/ece/ece-sem05',{})
})
router.get('/reg_13/ece_sem06',(req,res)=>{
  res.render('user/regulations/regulation-13/ece/ece-sem06',{})
})
router.get('/reg_13/ece_sem07',(req,res)=>{
  res.render('user/regulations/regulation-13/ece/ece-sem07',{})
})
router.get('/reg_13/ece_sem08',(req,res)=>{
  res.render('user/regulations/regulation-13/ece/ece-sem08',{})
})




// MECH NOTES
router.get('/regulation_13/choose_sem_mech',(req,res)=>{
  res.render('user/regulations/regulation-13/mech/choose-mech-sem',{})
})
router.get('/reg_13/mech_sem01',(req,res)=>{
  res.render('user/regulations/regulation-13/mech/mech-sem01',{})
})
router.get('/reg_13/mech_sem02',(req,res)=>{
  res.render('user/regulations/regulation-13/mech/mech-sem02',{})
})
router.get('/reg_13/mech_sem03',(req,res)=>{
  res.render('user/regulations/regulation-13/mech/mech-sem03',{})
})
router.get('/reg_13/mech_sem04',(req,res)=>{
  res.render('user/regulations/regulation-13/mech/mech-sem04',{})
})
router.get('/reg_13/mech_sem05',(req,res)=>{
  res.render('user/regulations/regulation-13/mech/mech-sem05',{})
})
router.get('/reg_13/mech_sem06',(req,res)=>{
  res.render('user/regulations/regulation-13/mech/mech-sem06',{})
})
router.get('/reg_13/mech_sem07',(req,res)=>{
  res.render('user/regulations/regulation-13/mech/mech-sem07',{})
})
router.get('/reg_13/mech_sem08',(req,res)=>{
  res.render('user/regulations/regulation-13/mech/mech-sem08',{})
})




router.get('/regulation_17',(req,res)=>{
  res.render('user/regulations/reg-2017',{})
})
router.get('/regulation_17/choose_sem_cse',(req,res)=>{
  res.render('user/regulations/regulation-17/cse/choose-cse-sem',{})
})

router.get('/reg-17/choose_sem_cse',(req,res)=>{
  res.render('user/regulations/regulation-17/civil/choose-cse-sem',{})
})





router.get('/regulation_21',(req,res)=>{
  res.render('user/regulations/reg-2021',{})
})
router.get('/regulation_21/choose_sem_cse',(req,res)=>{
  res.render('user/regulations/regulation-21/cse/choose-cse-sem',{})
})

router.get('/result', (req, res, next) => {
  res.render('user/result', { })
})




module.exports = router; 
