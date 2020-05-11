/*
包含多个action creator
异步action
同步action
 */
//引入客户端io
import io from 'socket.io-client'
import {ReqLogin,ReqRegister,ReqUpdateUser,ReqUser,ReqUserList,ReqIsRead,ReqMsgList} from '../api'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG,RECEIVE_MSG_LIST,READ_MSG} from './action-types'


function initIo(dispatch,userid){
    if(!io.socket){
        //连接服务器,得到代表连接的socket对象
        io.socket = io('ws://localhost:4000')
        //绑定receiveMsg的监听,来接收服务器发送的消息
        io.socket.on('receiveMsg',function (chatMsg) {
            console.log("浏览器端接收到消息:",chatMsg)
            //只有当chatMsg是与当前用户相关的消息,才去分发同步action保存消息
            if(userid===chatMsg.from||userid===chatMsg.to){
                dispatch(receive_msg({chatMsg,userid}))
            }
        })
    }
}

//异步发送消息
export const sendMsg=({from,to,content})=>{
    return dispatch=>{
        console.log("data",{from,to,content})
        io.socket.emit('sendMsg',{from,to,content})
        console.log("浏览器向服务器端发送消息:",{from,to,content})
    }
}

async function getMsgList(dispatch,userid){
    initIo(dispatch,userid)
    const response=await ReqMsgList()
    const result=response.data
    if(result.code===0){
        const {users,chatMsgs}=result.data
        dispatch(receive_msg_list({users,chatMsgs,userid}))

    }
}
//验证成功
const auth_success=(user)=>({type:AUTH_SUCCESS,data:user})
//失败
const error_msg=(msg)=>({type:ERROR_MSG,data:msg})
//接收用户
const receive_user=(user)=>({type:RECEIVE_USER,data:user})
//重置用户
export const reset_user=(msg)=>({type:RESET_USER,data:msg})
//获取用户列表
const receive_user_list=(userList)=>({type:RECEIVE_USER_LIST,data:userList})
//获取消息列表
const receive_msg_list=({users,chatMsgs,userid})=>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,userid}})
//获取单个消息
const receive_msg=({chatMsg,userid})=>({type:RECEIVE_MSG,data:{chatMsg,userid}})
//更新未读的消息数量
const read_msg=({count,from,to})=>({type:READ_MSG,data:{count,from,to}})
//异步登录action
export const login=(user)=>{
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
            getMsgList(dispatch,result.data._id)
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
            getMsgList(dispatch,result.data._id)
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
        if(result.code===0){
            dispatch(receive_user(result.data))
        }else{
            dispatch(reset_user(result.msg))
        }
    }

}

//获取用户信息

export const getUser=()=>{
    return async dispatch=>{
        const response=await ReqUser()
        const result=response.data
        if(result.code===0){
            getMsgList(dispatch,result.data._id)
            dispatch(receive_user(result.data))
        }else{
            dispatch(reset_user(result.msg))
        }

    }
}

//异步获取用户列表
 export const getUserList=(type)=>{
    return async dispatch=>{
        const response =await ReqUserList(type)
        const result=response.data
        if(result.code===0){
            dispatch(receive_user_list(result.data))
        }
    }
}

//异步更新消息的未读数量
export const readMsg=(from,to)=>{
    return async dispatch=>{
        const response =await ReqIsRead(from)
        const result=response.data
        if(result.code===0){
            const count=result.data
            dispatch(read_msg({count,from,to}))
        }
    }
}



