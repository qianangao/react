/*
包含了n个接口请求的的函数的模块
 */
import ajax from './ajax'
//注册
export const ReqRegister=(user)=>ajax('/register',user,'post')
//登录
export const ReqLogin=({username,password})=>ajax('/login',{username,password},'post')
//更新用户信息
export const ReqUpdateUser=(user)=>ajax('/update',user,'post')

//获取用户信息
export const ReqUser=()=>ajax('/user')

//获取用户列表
export const ReqUserList=(type)=>ajax('/userList',{type})

//获取所有消息列表
export const ReqMsgList=()=>ajax('/msgList')

//判断消息是否已读
export const ReqIsRead=(from)=>ajax('/readmsg',{from},'POST')
