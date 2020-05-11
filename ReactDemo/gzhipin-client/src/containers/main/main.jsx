/*
主界面组件
 */
import React, {Component} from 'react'
import {Switch,Route,Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import BossInfo from '../boss_info/boss_info'
import DashenInfo from '../dashen_info/dashen_info'
import Boss from '../boss/boss'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from "../../components/nav-footer/nav-footer";
import Chat from '../chat/chat'

import {getRedirectTo} from '../../utils'
import {getUser} from "../../redux/actions";

class Main extends Component{
    navList=[
        {
            path:'/boss',
            component:Boss,
            title:'大神列表',
            icon:'dashen',
            text:'大神',
        },
        {
            path:'/dashen',
            component:Dashen,
            title:'BOSS列表',
            icon:'boss',
            text:'老板',
        },
        {
            path:'/message',
            component:Message,
            title:'消息列表',
            icon:'message',
            text:'消息',
        },
        {
            path:'/personal',
            component:Personal,
            title:'个人中心',
            icon:'personal',
            text:'个人',
        }
    ]
    /*
    1.实现自动登录
        1.componentDidMount()
            1)登录过(cookie中有userid),但还没有登录(redux管理的user没有_id),发请求获取对应的user
        2.render()
            2)如果cookie中没有userid,直接重定向到login界面
            3)判断redux管理的user有没有_id,如果没有,暂时不做显示
            4)判断redux管理的user有没有_id,如果有,说明当前已经登录,显示对应的界面
            5)如果请求根路径, 根据user的type和header来计算一个重定向的路由路径,并自动重定向
    2.如果已经登录,如果请求根路径:
        根据user的type和header来计算一个重定向的路由路径,并自动重定向

     */
    componentDidMount() {
        //登录过(cookie中有userid),但还没有登录(redux管理的user没有_id),发请求获取对应的user
        const userid =Cookies.get('userid')
        const {_id}=this.props.user
        if(userid && !_id){
            this.props.getUser()
        }

    }



    render(){
        //读取cookie中的userid
        const userid = Cookies.get('userid')
        //如果没有,自动重定向到登录界面
        if(!userid){
            return <Redirect to='/login'></Redirect>
        }

        //如果有,读取redux中的user状态
        const {user,unReadCount}=this.props
        // debugger
        //如果user没有_id,返回null(不做任何显示)
        if(!user._id){
            // this.props.getUser()
            return null
        }else{
            //如果有_id,显示对应的界面
           // 如果请求根路径, 根据user的type和header来计算一个重定向的路由路径,并自动重定向
            let path= this.props.location.pathname
            if(path==='/'){
              path = getRedirectTo(user.type,user.header)
                return <Redirect to={path}/>
            }
        }
        const {navList}=this
        const path= this.props.location.pathname
        const currentNav=navList.find(nav=>nav.path===path)
        if(currentNav){
            if(user.type==='boss'){
                navList[0].hide=true
            }else{
                navList[1].hide=true
            }
        }

        return (
            <div>
                {currentNav?<NavBar className='sticky-header'>{currentNav.title}</NavBar>:null}
               <Switch>
                   {
                       navList.map(nav=><Route path={nav.path} component={nav.component}/>)
                   }
                   <Route path='/chat/:userid' component={Chat}/>
                   <Route path='/bossinfo' component={BossInfo}/>
                   <Route path='/dasheninfo' component={DashenInfo}/>
                   <Route component={NotFound}/>
               </Switch>
                {currentNav?<NavFooter navList={navList} unReadCount={unReadCount}/>:null}
            </div>
        )
    }
}


export default connect(
    state=>({user:state.user,unReadCount:state.chat.unReadCount}),
    {getUser}
)(Main)
