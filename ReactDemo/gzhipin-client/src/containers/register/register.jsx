/*
注册路由组件
 */
import React, {Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio, Button

} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'
const Item=List.Item
class Register extends Component{
    state={
        username:'',
        password:'',
        password2:'',
        type:'dashen'  //  用户类型:dashen/laoban
    }
    //改变输入框内容
    handleChange=(name,val)=>{
        this.setState({
            [name]:val
        })
    }
    //点击注册
    handleClick=()=>{
        console.log(this.state)
        this.props.register(this.state)
    }
    //点击已有账户,跳转登录页面
    toLogin=()=>{
        this.props.history.replace('/login')

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
                        <InputItem  placeholder='请输入密码' type="password" onChange={val=>this.handleChange('password',val)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />
                        <InputItem  placeholder='请输入确认密码' type="password"  onChange={val=>this.handleChange('password2',val)}>确认密码:</InputItem>
                        <WhiteSpace/>
                        <Item>
                            <span>用户类型:</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.type==='laoban'} onChange={val=>this.handleChange('type','laoban')}>老板</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.type==='dashen'} onChange={val=>this.handleChange('type','dashen')}>大神</Radio>
                        </Item>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.handleClick}>注册</Button>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {register}
    )(Register)
