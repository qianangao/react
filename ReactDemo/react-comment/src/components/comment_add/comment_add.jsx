import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './comment_add.css'
export default class CommentAdd extends Component{
    state={
        username:'',
        content:''
    }
    static propTypes={
        AddComment:PropTypes.func.isRequired
    }
    handleNameChange=(event)=>{
        const username=event.target.value
        this.setState({username})

    }
    handleContentChange=(event)=>{
        const content=event.target.value
        this.setState({content})
    }
    handleClick=(event)=>{
        event.preventDefault()
        const comment=this.state
        console.log(comment)
        this.props.AddComment(comment)
        this.setState({
            username:'',
            content:''})

    }
    render(){
        const {username,content}=this.state
        return (
            <div className="left-content">
                <form action="">
                    <div className='form-group'>
                        <label htmlFor="username">用户名</label>
                        <input type="text" className='form-control' id='username' placeholder='用户名' value={username} onChange={this.handleNameChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="content">评论内容</label>
                        <input type="textarea"  className='form-control' id='content' placeholder='评论内容' value={content} onChange={this.handleContentChange}/>
                    </div>
                    <div>
                        <button onClick={this.handleClick}>提交</button>
                    </div>
                </form>
            </div>
        )
    }
}
