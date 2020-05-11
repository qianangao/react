import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from "antd-mobile";
import {withRouter} from 'react-router-dom'

const Item=TabBar.Item
class NavFooter extends Component{
    static propTypes={
        navList:PropTypes.array.isRequired,
        unReadCount:PropTypes.number.isRequired
    }
    render(){
        let {navList,unReadCount}=this.props
        navList=navList.filter(nav=>!nav.hide)
        const path=this.props.location.pathname
        return (
            <TabBar>
                {navList.map((nav)=>(
                    <Item
                        key={nav.path}
                        badge={nav.path==='/message'?unReadCount:0}
                        title={nav.text}
                        icon={{uri:require(`./images/${nav.icon}.svg`)}}
                        selectedIcon={{uri:require(`./images/${nav.icon}_active.svg`)}}
                        selected={path===nav.path}
                        onPress={()=>{this.props.history.replace(nav.path)}}></Item>
                ))
                }
            </TabBar>
        )
    }
}

//向外暴露withRouter()包装产生的组件
//内部会向组件中传入一些路由组件特有的属性:history/location/math
export default withRouter(NavFooter)
