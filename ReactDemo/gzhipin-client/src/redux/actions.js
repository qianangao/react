/*
包含多个action creator
异步action
同步action
 */

import {ReqLogin,ReqRegister,ReqUpdateUser} from '../api'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './action-types'

//验证成功
export const auth_success=(user)=>({type:AUTH_SUCCESS,data:user})
//失败
export const error_msg=(msg)=>({type:ERROR_MSG,data:msg})
//接收用户
export const receive_user=(user)=>({type:RECEIVE_USER,data:user})
//重置用户
export const reset_user=(msg)=>({type:RESET_USER,data:msg})

//异步登录action
export const login=(user)=>{
    console.log(user)
    const {username,password}=user
    if(!username){
        return error_msg('用户名不能为空!')
    } else if(!password){
        return error_msg('密码不能为空!')
    }
    return async dispatch=>{
       const response= await ReqLogin(user)
        const result=response.data
        if(result.code===0){
            dispatch(auth_success(result.data))
        }else{
            dispatch(error_msg(result.msg))
        }
    }
}

//异步注册action
export const register=(user)=>{
    console.log(user)
    const {username,password,password2,type}=user
    if(!username){
        return error_msg('用户名不能为空!')
    } else if(!password){
        return error_msg('密码不能为空!')
    }else if(password!==password2){
        return error_msg('两次密码必须保持一致!')
    }
    return async dispatch=>{
        const response= await ReqRegister({username,password,type})
        const result=response.data
        console.log(result)
        if(result.code===0){
            dispatch(auth_success(result.data))
        }else{
            dispatch(error_msg(result.msg))
        }
    }
}

//更新用户信息异步action
export const update=(user)=>{
    return async dispatch=>{
        const response= await ReqUpdateUser(user)
        const result=response.data
        if(result.code==0){
            dispatch(receive_user(result.data))
        }else{
            dispatch(reset_user(result.msg))
        }

    }

}

