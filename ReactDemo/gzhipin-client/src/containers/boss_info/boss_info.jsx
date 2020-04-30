/*
Boss信息完善路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Button, InputItem,TextareaItem, NavBar} from "antd-mobile";
import Avatar_Select from "../avatar_select/avatar_select";
import {update} from '../../redux/actions'

class BossInfo extends Component{
    state={
        header:'',
        position:'',
        company:'',
        salary:'',
        info:''
    }
    handleChange(name,val){
        this.setState({
            [name]:val
        })
    }
    setHeader=(header)=>{
        this.setState({header})
    }
    saveHandle=()=>{
        this.props.update(this.state)
    }
    render(){
        const {header,type}=this.props.user
        console.log(header,type)
        if(header){
           const path=type==='dashen'?'/dashen':'/boss'
           return  <Redirect to={path}></Redirect>
        }
        return (
            <div>
                <NavBar>Boss信息完善</NavBar>
                <Avatar_Select setHeader={this.setHeader}/>
                <InputItem  placeholder='请输入招聘职位' onChange={val=>this.handleChange('position',val)}>招聘职位:</InputItem>
                <InputItem  placeholder='请输入公司名称' onChange={val=>this.handleChange('company',val)}>公司名称:</InputItem>
                <InputItem  placeholder='请输入职位薪资' onChange={val=>this.handleChange('salary',val)}>职位薪资:</InputItem>
                <TextareaItem title='职位要求' rows={3} onChange={val=>this.handleChange('info',val)}/>
                <Button type={"primary"} onClick={this.saveHandle}>保&nbsp;&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {update})
(BossInfo)
