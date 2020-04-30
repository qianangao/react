import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'

export default class CommentItem extends Component{
    static propTypes={
        comment:PropTypes.object.isRequired,
        index:PropTypes.number.isRequired
    }
    handleClick=()=>{
        const {comment,DelComment,index}=this.props
        if(window.confirm(`确定要删除${comment.username}的评论吗?`)){
            //发布消息
            PubSub.publish('deleteComment',index)

        }
    }
    render(){
        const {comment}=this.props
        return (
            <div className='content-item'>
                <h3>{comment.username}说:</h3>
                <p>{comment.content}</p>
                <button onClick={this.handleClick}>删除</button>
            </div>
        )
    }
}
