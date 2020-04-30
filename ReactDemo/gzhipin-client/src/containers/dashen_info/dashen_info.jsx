/*
大神信息完善路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar,InputItem,Button} from "antd-mobile";
import Avatar_Select from "../avatar_select/avatar_select";
import {update} from '../../redux/actions'

class DashenInfo extends Component{
    state={
        header:'',
        position:'',
        info:''
    }
    setHeader=(header)=>{
        this.setState({header})
    }
    handleChange=(name,val)=>{
        this.setState({[name]:val})
    }
    handleClick=()=>{
       this.props.update(this.state)
    }
    render(){
        const {header,type}=this.props.user
        if(header){
            const path=type==='dashen'?'/dashen':'/boss'
            return  <Redirect to={path}></Redirect>
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <Avatar_Select setHeader={this.setHeader}/>
                <InputItem  placeholder='请输入求职岗位' onChange={val=>this.handleChange('position',val)}>求职岗位:</InputItem>
                <InputItem  placeholder='请输入个人介绍' onChange={val=>this.handleChange('info',val)}>个人介绍:</InputItem>
                <Button type={"primary"} onClick={this.handleClick}>保&nbsp;&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {update})
(DashenInfo)
