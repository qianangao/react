/*
Boss主界面路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd-mobile'

class NotFound extends Component{
    render(){
        return (
            <div>
                <h2>抱歉,找不到页面!</h2>
               <Button type="primary" onClick={()=>this.props.history.replace('/')}>返回</Button>
            </div>
        )
    }
}

export default connect(
    state=>({}),
    {}
)(NotFound)
