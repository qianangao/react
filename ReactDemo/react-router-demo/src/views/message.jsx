import React, {Component} from 'react'

export default class Message extends Component{
    state={
        messages:['news001','news001','news001']
    }
    render(){
        return (
           <ul>
               {this.state.messages.map((m,index)=><li key={index}>{m}</li>)}
           </ul>
        )
    }
}
