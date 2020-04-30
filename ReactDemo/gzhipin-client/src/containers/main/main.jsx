/*
主界面组件
 */
import React, {Component} from 'react'
import {Switch,Route,Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import BossInfo from '../boss_info/boss_info'
import DashenInfo from '../dashen_info/dashen_info'

class Main extends Component{
    render(){
        const {user}=this.props
        if(!user._id){
            return <Redirect to='/login'></Redirect>
        }
        return (
            <div>
               <Switch>
                   <Route path='/bossinfo' component={BossInfo}/>
                   <Route path='/dasheninfo' component={DashenInfo}/>
               </Switch>
            </div>
        )
    }
}


export default connect(
    state=>({user:state.user})
)(Main)
