import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './comment_list.css'
import CommentItem from "../comment_item/comment_item";
export default class CommentList extends Component{
    static propTypes={
        comments:PropTypes.array.isRequired,
    }
    render(){
        const {comments,DelComment}=this.props
        const display=comments.length===0?'block':'none'
        return (
            <div className='right-content'>
                <h2>评论内容</h2>
                <h2 style={{display}}>暂无评论,点击左侧添加评论!</h2>
                {comments.map((comment,index)=><CommentItem comment={comment} key={index} index={index}></CommentItem>)}
            </div>
        )
    }
}
