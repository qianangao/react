import React, {Component} from 'react'
import {List,Grid} from'antd-mobile'
import PropTypes from 'prop-types'

export default class Avatar_Select extends Component{
    constructor(props){
        super(props)
        this.data=[]
        for(let i=0;i<20;i++){
            this.data.push({
                text:i+1,
                icon:require(`../../assets/img/${i+1}.jpg`)
            })
        }
    }

    static propTypes={
        setHeader:PropTypes.func.isRequired
    }

    state={
        icon:null
    }

    handleClick=({text,icon})=>{
        this.setState({icon})
        this.props.setHeader(text)
    }

    render(){
        const {icon}=this.state
        const listInfo=!icon?'请选择头像': (<div>请选择头像:<img src={icon} style={{width:'50px'}} alt="头像"/></div>)
        return (
            <div>
                <List renderHeader={()=>listInfo}></List>
                <Grid data={this.data} columnNum={5} onClick={this.handleClick}></Grid>
            </div>
        )
    }
}
