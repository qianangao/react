/*
消息主界面路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Badge, List} from 'antd-mobile'

const Item=List.Item
const Brief=Item.Brief

//对chatMsgs按chat_id进行分组,并得到每个组的LastMsg组成的数组
function getLastMsgs(chatMsgs,userid){
    //1.找出每个聊天的LastMsg,并用一个对象容器来保存{chat_id:LastMsg}
    const lastMsgObjs={}
    chatMsgs.forEach(msg=>{
        //对Msg进行个体的统计
         if(msg.to===userid&&!msg.read){
             msg.unReadCount=1
         }else{
             msg.unReadCount=0
         }
        //得到msg的聊天标识id
        const chatId=msg.chat_id
        //获取已保存的的当前组件的LastMsg
        const lastMsg=lastMsgObjs[chatId]
        if(!lastMsg){
            lastMsgObjs[chatId]=msg
        }else{
            const unReadCount=lastMsg.unReadCount+msg.unReadCount
            if(lastMsg.create_time<msg.create_time){
                lastMsgObjs[chatId]=msg
            }
            lastMsgObjs[chatId].unReadCount=unReadCount
        }
    })
    //2.得到所有LastMsg的数组
    const lastMsgs=Object.values(lastMsgObjs)
    //3.对数组进行排序(按create_time降序)
    lastMsgs.sort(function(m1,m2){
        return m2.create_time-m1.create_time
    })
    return lastMsgs

}
class Message extends Component{
    render(){
        const {user}=this.props
        const {users,chatMsgs}=this.props.chat

        const lastMsgs=getLastMsgs(chatMsgs,user._id)
        return (
           <List style={{marginBottom:50,marginTop:50}}>
               {
                   lastMsgs.map(msg=>{
                       //得到目标用户Id
                        const targetUserId=msg.to===user._id?msg.from:msg.to
                       //得到目标用户信息
                        const targetUser=users[targetUserId]
                       return (
                           <Item
                               key={msg._id}
                               arrow="horizontal"
                               extra={<Badge text={msg.unReadCount}/>}
                               thumb={require(`../../assets/img/${targetUser.header}.jpg`)}
                               onClick={()=>this.props.history.push(`/chat/${targetUserId}`)}>
                               {msg.content}
                               <Brief>{targetUser.username}</Brief>
                           </Item>
                       )
                   })
               }
           </List>
        )
    }
}

export default connect(
    state=>({user:state.user,chat:state.chat}),
    {}
)(Message)
