/*
注册登录组件
 */
import React, {Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button

} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'

import Logo from '../../components/logo/logo'
class Login extends Component{
    state={
        username:'',
        password:'',
    }
    //改变输入框内容
    handleChange=(name,val)=>{
        this.setState({
            [name]:val
        })
    }
    //点击登录
    handleClick=()=>{
        this.props.login(this.state)
        // this.props.history.replace('/')
    }
    //点击,跳转注册页面
    toRegister=()=>{
        this.props.history.replace('/register')

    }
    render(){
        const {msg,redirectTo}=this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {msg?<div className='error-msg'>{msg}</div>:null}
                        <InputItem placeholder='请输入用户名' onChange={val=>this.handleChange('username',val)}>用户名:</InputItem>
                        <WhiteSpace />
                        <InputItem  type="password" onChange={val=>this.handleChange('password',val)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.handleClick}>登录</Button>
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {login}
)(Login)
