var express = require('express');
var router = express.Router();
const md5=require('blueimp-md5')
const filter={password:0,__v:0}

const {UserModel,ChatModel}=require('../db/modules')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//1.注册路由
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
//2.登录路由
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

//3.更新用户信息
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

//4.获取用户信息
router.get('/user',function (req,res) {
  const userid=req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:'请先登录'})
  }
  UserModel.findOne({_id:userid},filter,function (err,user) {
    return res.send({code:0,data:user})

  })

})

//5.获取用户列表(根据用户类型)
router.get('/userList',function (req,res) {
  const {type}=req.query
  UserModel.find({type},filter,function (err,users) {
    return res.send({code:0,data:users})
  })

})

//6.获取当前用户的聊天消息列表
router.get('/msglist',function (req,res) {
  const userid =req.cookies.userid
  UserModel.find(function(err,userDocs) {
    // const users={}
    // userDocs.forEach(doc=>{
    //   users[doc._id]={username:doc.username,header:doc.header}
    // })
    const users=userDocs.reduce((users,user)=>{
      users[user._id]={username:user.username,header:user.header}
      return users
    },{})
    /*
    查询userid相关的所有聊天信息
      参数1:查询条件
      参数2:过滤条件
      参数3:回调函数

     */
    ChatModel.find({'$or':[{from:userid},{to:userid}]},filter,function (err,chatMsgs) {

      res.send({code:0,data:{users,chatMsgs}})

    })
  })
})

//7.修改指定消息为已读
router.post('/readmsg',function (req,res) {
  //得到请求中的from和to
  const from=req.body.from
  const to=req.cookies.userid
//更新数据库中的chat数量
  ChatModel.update({from,to,read:false},{read:true},{multi:true},function (err,doc) {
    console.log('/readmsg',doc)
    res.send({code:0,data:doc.nModified}) //更新的数量
  })

})

module.exports = router;
