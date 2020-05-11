import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,List,InputItem,Grid,Icon} from 'antd-mobile'
// import QueueAnim from 'rc-queue-anim'
import {sendMsg,readMsg} from '../../redux/actions'

const Item=List.Item
class Chat extends Component{
    state={
        content:'',
        isShow:false
    }
    componentWillMount() {
        const emojis=['😃','😀','😄','😁','😃','😀','😄','😁','😃','😀','😄','😁','😃','😀','😄','😁',
            '😃','😀','😄','😁','😃','😀','😄','😁','😃','😀','😄','😁','😃','😀','😄','😁','😃','😀',
            '😄','😁','😃','😀','😄','😁','😃','😀','😄','😁','😃','😀','😄','😁'
            ,'😃','😀','😄','😁','😃','😀','😄','😁','😃','😀','😄','😁','😃','😀','😄','😁']
        this.emojis=emojis.map(item=>({text:item}))
    }
    componentDidMount() {
        //初始显示列表
        window.scrollTo(0,document.body.scrollHeight)

    }
    componentDidUpdate() {
        ////更新显示列表
        window.scrollTo(0,document.body.scrollHeight)
    }
    componentWillUnmount() {
        const to = this.props.user._id
        const from=this.props.match.params.userid
        //发请求更新消息的未读状态
        this.props.readMsg(from,to)
    }

    toggleShow=()=>{
        const isShow=!this.state.isShow
        this.setState({isShow})
        if(isShow){
            setTimeout(()=>{
                window.dispatchEvent(new Event('resize'))
            },0)
        }
    }

    handleSend=()=>{
        const from = this.props.user._id
        const to=this.props.match.params.userid
        const content=this.state.content.trim()
        if(content){
            this.props.sendMsg({from,to,content})
        }
        this.setState({content:'',isShow:false})

    }
    render(){
        const {user}=this.props
        const {users,chatMsgs}=this.props.chat
        //计算当前聊天的chatid
        const meId=user._id
        if(!users[meId]){
            return null
        }
        const targetId=this.props.match.params.userid
        const chatId=[meId,targetId].sort().join('_')
        //对chatMsgs进行过滤
        const msgs=chatMsgs.filter(msg=>msg.chat_id===chatId)
        const targetHeader=users[targetId].header
        const targetIcon=targetHeader?require(`../../assets/img/${targetHeader}.jpg`):null
        return (
            <div id='chat-page'>
                <NavBar
                    className='sticky-header'
                    icon={<Icon type="left"/>}
                    onLeftClick={()=>this.props.history.goBack()}>{users[targetId].username}</NavBar>
                <List style={{marginTop:50,marginBottom:50}}>
                    {/*<QueueAnim type={['right','left']} delay={100}>*/}
                        {
                            msgs.map(msg=>{
                                if(msg.to===meId){
                                    return (
                                        <Item thumb={targetIcon}>{msg.content}</Item>
                                    )
                                }else{
                                    return (<Item className='chat-me' extra='我'>{msg.content}</Item>)
                                }
                            })
                        }
                    {/*</QueueAnim>*/}

                </List>
                <div className='am-tab-bar'>
                <InputItem
                    onChange={val=>this.setState({content:val})}
                    onFocus={()=>this.setState({isShow:false})}
                    value={this.state.content}
                    placeholder='请输入'
                    extra={
                        <span>
                            <span style={{marginRight:5}} onClick={this.toggleShow}>😃</span>
                            <span onClick={this.handleSend}>发送</span>
                        </span>}
                       />
                    {this.state.isShow?(
                        <Grid
                            data={this.emojis}
                            columnNum={8}
                            isCarousel={true}
                            carouselMaxRow={4}
                            onClick={(item)=>{this.setState({content:this.state.content+item.text})}}
                        />
                    ):null}

                </div>

            </div>
        )
    }
}

export default connect(
    state=>({user:state.user,chat:state.chat}),
    {sendMsg,readMsg}
)(Chat)
