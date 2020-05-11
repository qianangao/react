import React, {Component} from 'react'
import {WingBlank, WhiteSpace ,Card} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Header=Card.Header
const Body=Card.Body
class UserList extends Component{
    static propTypes={
        userList:PropTypes.array.isRequired
    }
    render(){
        const {userList}=this.props
        return (
            <WingBlank style={{marginBottom:50,marginTop:45}}>
                {
                    userList.map(user=>(
                        <div key={user._id}>
                            <WhiteSpace />
                            <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                                <Header
                                    extra={user.username}
                                    thumb={require(`../../assets/img/${user.header}.jpg`)}
                                    thumbStyle={{width:30}}/>
                                <Body>
                                    {user.company?<div>公司:{user.company}</div>:null}
                                    {user.company?<div>月薪:{user.salary}</div>:null}
                                    <div>描述:{user.info}</div>
                                </Body>
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>

        )
    }
}

export default withRouter(UserList)
