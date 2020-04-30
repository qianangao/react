var express = require('express');
var router = express.Router();
const md5=require('blueimp-md5')
const filter={password:0,__v:0}

const {UserModel}=require('../db/modules')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//注册路由
router.post('/register',function (req,res) {
  const {username,password,type}=req.body
  UserModel.findOne({username},function (err,user) {
    if(user){
      res.send({code:1,msg:'该用户已经存在'})
    } else{
      new UserModel({username,type,password:md5(password)}).save(function (err,user) {
        res.cookie('userid',user._id,{maxAge:1000*60*60*24})
        const data={username,type,_id:user._id}
        res.send({code:0,data})
      })
    }

  })


})
//登录路由
router.post('/login',function (req,res) {
  const {username,password}=req.body
  UserModel.findOne({username,password:md5(password)},filter,function (err,user) {
    if(user){
      res.cookie('userid',user._id,{maxAge:1000*60*60*24})
      res.send({code:0,data:user})
    }else{
      res.send({code:1,msg:'用户名或密码不正确'})
    }

  })
})

//更新用户信息
router.post('/update',function (req,res) {
  const userid=req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:'请先登录'})
  }
  // 得到提交的用户数据
  const user=req.body
  UserModel.findByIdAndUpdate({_id:userid},user,function (error,oldUser) {
    if(!oldUser){
      res.clearCookie('userid')
      res.send({code:1,msg:'请先登录'})
    }else{
      const {_id,username,type}=oldUser
      const data=Object.assign(user,{_id,username,type})
      res.send({code:0,data})
    }

  })

})

module.exports = router;
