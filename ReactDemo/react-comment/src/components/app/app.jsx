import React, {Component} from 'react'
import PubSub from 'pubsub-js'
import CommentAdd from "../comment_add/comment_add";
import CommentList from "../comment_list/comment_list";
import './app.css'

export default class App extends Component{
    state={
        comments:[
            {username:'Tom',content:'哈哈哈'},
            {username:'Jack',content: '呵呵呵'}
        ]
    }
    AddComment=(comment)=>{
        let {comments}=this.state
        comments.unshift(comment)
        this.setState({comments})

    }
    componentDidMount(){
        //订阅消息
        PubSub.subscribe('deleteComment',(msg,index)=>{
            this.DelComment(index)
        })

    }
    DelComment=(index)=>{
        let {comments}=this.state
        comments.splice(index,1)
        this.setState({comments})
    }
    render(){
        const {comments}=this.state
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>请发表对React的评论</div>
                 <div className='panel-body'>
                    <CommentAdd AddComment={this.AddComment}/>
                    <CommentList comments={comments}/>

                 </div>

            </div>
        )
    }
}
