/*
包含n个reducer函数:根据老的state和指定的action返回一个新的state
 */

import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    READ_MSG} from "./action-types";
import {getRedirectTo} from "../utils";
const initUser={
    username:'',
    type:'',
    msg:'',
    redirectTo:''
}
//获取用户列表
const initUserList=[]
function userList(state=initUserList,action){
    switch(action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state

    }
}

//获取用户信息
function user(state=initUser,action){
    switch(action.type){
        case AUTH_SUCCESS:
            const {type,header}=action.data
            return {...action.data,redirectTo:getRedirectTo(type,header)}
        case ERROR_MSG:
            return {...state,msg:action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser,msg:action.data}
        default:
            return state
    }

}

const initMsg={
    users:{},
    chatMsgs:[],
    unReadCount:0

}
// 获取消息列表
 function chat(state=initMsg,action) {
    switch(action.type){
        case RECEIVE_MSG_LIST:
            const {users,chatMsgs,userid}=action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal,msg)=>preTotal+(!msg.read&&msg.to===userid?1:0),0)
            }
        case RECEIVE_MSG:
            const {chatMsg}=action.data
            return {
                users:state.users,
                chatMsgs: [...state.chatMsgs,chatMsg],
                unReadCount: state.unReadCount+(!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
            }
        case READ_MSG:
            const {count,from,to}=action.data
            return {
                users:state.users,
                chatMsgs: state.chatMsgs.map(msg=>{
                    if(msg.from===from&&msg.to===to&&!msg.read){
                        return {...msg,read:true}
                    }else{
                        return msg
                    }
                }),
                unReadCount: state.unReadCount-count
            }

        default:
            return state
    }

 }

export default combineReducers({user,userList,chat})

