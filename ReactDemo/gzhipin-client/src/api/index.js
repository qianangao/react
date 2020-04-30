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
