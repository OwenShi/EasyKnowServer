var express = require('express');
var router = express.Router();
var URL = require('url');
var Dbconfig = require('../db/DBconfig')
var Usersql = require('../db/usersql')
/* GET users listing. */
var mysql =  require('mysql')
var pool = mysql.createPool(Dbconfig.mysql)
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var responseJSON = function (res, ret) {
  if(typeof ret === 'undefined') {
    res.json({     code:'-200',     msg: '操作失败'
    });
  } else {
    res.json(ret);
  }};

router.get('/queryinfo',function(req,res,next){
  var param = req.query || req.params;
  pool.getConnection(function (err, conn) {
    conn.query(Usersql.QUERY,[param.ID],function (err, result) {
      if (result){
        console.log(result)
      }
      conn.release()
      responseJSON(res, result)


      
    })
  })
})

router.post('/queryAllTable',function (req,res,next) {
  try {
    console.log('xx',arguments)
    var param = req.request.body
    console.log('this',this)
  }catch(e){
    console.log(e);
  }

  pool.getConnection(function (err,conn) {
    conn.query(Usersql.QUERYAll,function (err, result) {
      if (result){
        var resultJSON = {
          success:true,
          data:result
        }
      }
      conn.release()
      res.send(resultJSON)
    })
  })
})

router.post('/submitConfig',function (req,res,next) {
  var param = req.body
  console.log('pp',param)
  var resultJSON = {
    data:'xxx',
    msg:'heng',
    success:true
  }
  res.send(resultJSON)
})
module.exports = router;
